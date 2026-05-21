import { isAnyLlmConfigured, resolveTextChatUpstream } from './llm-upstream.js';
import { WorkflowAgent } from './agent-workflow.js';
import type { AgentActionRecord } from './agent-types.js';

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

	const workflow = new WorkflowAgent();
	return workflow.run(upstream, messagesRaw, lang, opts);
}

export { isAnyLlmConfigured };
