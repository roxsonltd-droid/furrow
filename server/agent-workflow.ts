import { MemoryAgent } from './agent-memory.js';
import { ToolsAgent } from './agent-tools.js';
import type { ChatMessage, AgentActionRecord, AgentToolContext } from './agent-types.js';
import { type TextChatUpstream, openAIMessageContentToString } from './llm-upstream.js';

const LLM_FETCH_TIMEOUT_MS = 9_000;
const MAX_AGENT_STEPS = 2;

export class WorkflowAgent {
	private memory: MemoryAgent;
	private tools: ToolsAgent;

	constructor() {
		this.memory = new MemoryAgent();
		this.tools = new ToolsAgent();
	}

	private async callChat(
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
						? { tools: this.tools.getToolsConfig(), tool_choice: 'auto' }
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

	public async run(
		upstream: TextChatUpstream,
		rawMessages: unknown[],
		lang: 'en' | 'ru',
		opts?: { clientIp?: string | null }
	): Promise<
		| { ok: true; reply: string; agentMode: boolean; actions?: AgentActionRecord[]; knowledgeIds?: string[] }
		| { ok: false; status: number; error: string; hint?: string }
	> {
		const memResult = this.memory.prepareMemory(rawMessages, lang);
		if ('error' in memResult) {
			return { ok: false, status: 400, error: memResult.error };
		}
		const { chatMessages, knowledgeIds } = memResult;

		const actions: AgentActionRecord[] = [];
		const agentDisabled = process.env.FURROW_AGENT_DISABLED === '1';
		const agentToolsEnabled = process.env.FURROW_AGENT_TOOLS === '1';

		if (agentDisabled || !upstream.supportsTools || !agentToolsEnabled) {
			try {
				const message = await this.callChat(upstream, chatMessages, { tools: false });
				const reply = openAIMessageContentToString(message.content)?.trim();
				if (!reply) return { ok: false, status: 502, error: 'Empty reply' };
				return { ok: true, reply, agentMode: false, knowledgeIds };
			} catch (e) {
				return { ok: false, status: 502, error: e instanceof Error ? e.message : 'LLM error' };
			}
		}

		const toolCtx: AgentToolContext = { lang, clientIp: opts?.clientIp ?? null };

		for (let step = 0; step < MAX_AGENT_STEPS; step++) {
			const message = await this.callChat(upstream, chatMessages, { tools: true });
			if (!message.tool_calls?.length) {
				const reply = openAIMessageContentToString(message.content)?.trim();
				if (!reply) return { ok: false, status: 502, error: 'Empty reply' };
				return { ok: true, reply, agentMode: true, actions, knowledgeIds };
			}

			chatMessages.push(message);
			for (const tc of message.tool_calls) {
				const { result, action } = await this.tools.executeTool(
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
}
