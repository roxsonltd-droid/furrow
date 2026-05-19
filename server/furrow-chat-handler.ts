import { executeFurrowAgentTool, FURROW_AGENT_TOOLS, type AgentActionRecord } from './furrow-agent-tools.js';
import { buildFurrowKnowledgeContext, getKnowledgeChunkIds } from './furrow-knowledge.js';
import {
	isAnyLlmConfigured,
	openAIMessageContentToString,
	resolveTextChatUpstream,
	type TextChatUpstream,
} from './llm-upstream.js';

export type FurrowChatTurn = { role: 'user' | 'assistant'; content: string };

type ToolCall = { id: string; type: string; function: { name: string; arguments: string } };
type ChatMessage = {
	role: string;
	content?: string | null;
	tool_calls?: ToolCall[];
	tool_call_id?: string;
};

const MAX_MESSAGES = 12;
/** Hobby Vercel ~10s — keep agent loops low unless FURROW_AGENT_TOOLS=1 on Pro */
const MAX_AGENT_STEPS = 2;
const LLM_FETCH_TIMEOUT_MS = 9_000;

const SYSTEM_EN = `You are "Furrow Analyst" — AI agent for Furrow Markets (global agricultural market intelligence, Nexus Group).

Tools:
• search_knowledge — platform facts (pricing tiers, regions, launch 2026, disclaimer)
• get_market_signals — delayed CBOT/Baltic snapshot (Yahoo, unofficial); cite as delayed
• submit_waitlist — early access ONLY when user gave full name + email and wants to join

Rules:
- Reply in English unless the user writes in Russian — then reply in Russian.
- Bloomberg/Reuters tone: concise, factual, numbers when relevant.
- For prices use get_market_signals; always note data is delayed/unofficial, not investment advice.
- Before submit_waitlist, confirm name and email with the user.
- After using a tool, summarize what you did.
- No markdown code fences.`;

const SYSTEM_RU = `Вы — «Furrow Analyst», AI-агент Furrow Markets (глобальная агрорыночная аналитика, Nexus Group).

Инструменты:
• search_knowledge — факты о платформе (тарифы, регионы, запуск 2026, дисклеймер)
• get_market_signals — отложенный снимок CBOT/Baltic (Yahoo); указывайте задержку
• submit_waitlist — ранний доступ ТОЛЬКО если пользователь дал имя + email и хочет подписаться

Правила:
- Отвечайте на русском, если пользователь пишет по-русски; иначе на английском.
- Стиль Bloomberg/Reuters: кратко, по делу.
- Для цен используйте get_market_signals; данные отложенные, не инвестсовет.
- Перед submit_waitlist подтвердите имя и email.
- После инструмента кратко резюмируйте действие.
- Без markdown code fences.`;

function truncate(s: string, max: number): string {
	return s.length <= max ? s : `${s.slice(0, max)}…`;
}

async function callChat(
	upstream: TextChatUpstream,
	messages: ChatMessage[],
	opts: { tools?: boolean },
): Promise<ChatMessage> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), LLM_FETCH_TIMEOUT_MS);
	let res: Response;
	try {
		res = await fetch(upstream.completionUrl, {
			method: 'POST',
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...(upstream.bearer ? { Authorization: `Bearer ${upstream.bearer}` } : {}),
			},
			body: JSON.stringify({
				model: upstream.model,
				temperature: 0.45,
				max_tokens: 600,
				messages,
				...(opts.tools && upstream.supportsTools
					? { tools: FURROW_AGENT_TOOLS, tool_choice: 'auto' }
					: {}),
			}),
		});
	} catch (e) {
		if (e instanceof Error && e.name === 'AbortError') {
			throw new Error('LLM request timed out');
		}
		throw e;
	} finally {
		clearTimeout(timer);
	}

	const data = (await res.json().catch(() => ({}))) as {
		error?: { message?: string };
		choices?: { message?: ChatMessage }[];
	};
	if (!res.ok) throw new Error(data.error?.message || res.statusText);
	const message = data.choices?.[0]?.message;
	if (!message) throw new Error('Empty model response');
	return message;
}

export async function handleFurrowChatPost(
	rawBody: unknown,
	opts?: { clientIp?: string | null },
): Promise<
	| { ok: true; reply: string; agentMode: boolean; actions?: AgentActionRecord[]; knowledgeIds?: string[] }
	| { ok: false; status: number; error: string; hint?: string }
> {
	const upstream = resolveTextChatUpstream();
	if (!upstream) {
		return {
			ok: false,
			status: 503,
			error: 'LLM not configured',
			hint: 'Set MISTRAL_API_KEY (or OPENAI_API_KEY) in environment and redeploy.',
		};
	}

	if (!rawBody || typeof rawBody !== 'object') {
		return { ok: false, status: 400, error: 'Invalid JSON body' };
	}

	const body = rawBody as Record<string, unknown>;
	const messagesRaw = body.messages;
	if (!Array.isArray(messagesRaw)) {
		return { ok: false, status: 400, error: 'messages must be an array' };
	}

	const lang: 'en' | 'ru' =
		body.context && typeof body.context === 'object' && (body.context as { lang?: string }).lang === 'ru'
			? 'ru'
			: 'en';

	const cleaned: FurrowChatTurn[] = [];
	for (const m of messagesRaw.slice(-MAX_MESSAGES)) {
		if (!m || typeof m !== 'object') continue;
		const o = m as Record<string, unknown>;
		if ((o.role !== 'user' && o.role !== 'assistant') || typeof o.content !== 'string') continue;
		const content = o.content.trim();
		if (!content) continue;
		cleaned.push({ role: o.role, content: truncate(content, 2400) });
	}

	const last = cleaned[cleaned.length - 1];
	if (!last || last.role !== 'user') {
		return { ok: false, status: 400, error: 'Last message must be from user' };
	}

	const knowledgeBlock = buildFurrowKnowledgeContext(last.content);
	const knowledgeIds = getKnowledgeChunkIds(last.content);
	const system = `${lang === 'ru' ? SYSTEM_RU : SYSTEM_EN}\n\n=== KNOWLEDGE ===\n${knowledgeBlock}`;

	const chatMessages: ChatMessage[] = [
		{ role: 'system', content: system },
		...cleaned.map((m) => ({ role: m.role, content: m.content })),
	];

	const actions: AgentActionRecord[] = [];
	const agentDisabled = process.env.FURROW_AGENT_DISABLED === '1';
	/** Full tool loop (slow). Default off — knowledge is already in the system prompt. */
	const agentToolsEnabled = process.env.FURROW_AGENT_TOOLS === '1';

	if (agentDisabled || !upstream.supportsTools || !agentToolsEnabled) {
		try {
			const message = await callChat(upstream, chatMessages, { tools: false });
			const reply = openAIMessageContentToString(message.content)?.trim();
			if (!reply) return { ok: false, status: 502, error: 'Empty reply' };
			return { ok: true, reply, agentMode: false, knowledgeIds };
		} catch (e) {
			return { ok: false, status: 502, error: e instanceof Error ? e.message : 'LLM error' };
		}
	}

	const toolCtx = { lang, clientIp: opts?.clientIp ?? null };

	for (let step = 0; step < MAX_AGENT_STEPS; step++) {
		const message = await callChat(upstream, chatMessages, { tools: true });
		if (!message.tool_calls?.length) {
			const reply = openAIMessageContentToString(message.content)?.trim();
			if (!reply) return { ok: false, status: 502, error: 'Empty reply' };
			return { ok: true, reply, agentMode: true, actions, knowledgeIds };
		}

		chatMessages.push(message);
		for (const tc of message.tool_calls) {
			const { result, action } = await executeFurrowAgentTool(
				tc.function.name,
				tc.function.arguments,
				toolCtx,
			);
			actions.push(action);
			chatMessages.push({
				role: 'tool',
				tool_call_id: tc.id,
				content: result,
			});
		}
	}

	return { ok: false, status: 502, error: 'Agent step limit reached' };
}

export { isAnyLlmConfigured };
