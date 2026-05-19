import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleFurrowChatPost, isAnyLlmConfigured } from '../server/furrow-chat-handler.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	if (req.method === 'OPTIONS') {
		res.status(204).end();
		return;
	}

	if (req.method === 'GET') {
		res.status(200).json({
			ok: true,
			path: '/api/furrow-chat',
			llmConfigured: isAnyLlmConfigured(),
			agentEnabled: process.env.FURROW_AGENT_DISABLED !== '1',
		});
		return;
	}

	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	const clientIp =
		(typeof req.headers['x-forwarded-for'] === 'string'
			? req.headers['x-forwarded-for'].split(',')[0]?.trim()
			: null) || null;

	const result = await handleFurrowChatPost(req.body, { clientIp });
	if (result.ok) {
		res.status(200).json({
			reply: result.reply,
			agentMode: result.agentMode,
			actions: result.actions,
			knowledgeIds: result.knowledgeIds,
		});
		return;
	}

	res.status(result.status).json({ error: result.error, hint: result.hint });
}
