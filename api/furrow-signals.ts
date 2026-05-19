import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFurrowMarketSignals, refreshFurrowMarketSignals } from '../server/furrow-market-signals.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Cache-Control', 'public, max-age=300');

	if (req.method === 'OPTIONS') {
		res.status(204).end();
		return;
	}

	if (req.method === 'GET') {
		const force = req.query.force === '1';
		const body = await getFurrowMarketSignals({ force });
		res.status(200).json(body);
		return;
	}

	if (req.method === 'POST') {
		const body = await refreshFurrowMarketSignals();
		res.status(200).json(body);
		return;
	}

	res.status(405).json({ error: 'Method not allowed' });
}
