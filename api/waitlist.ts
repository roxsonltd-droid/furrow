import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitFurrowWaitlist } from '../server/waitlist.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	if (req.method === 'OPTIONS') {
		res.status(204).end();
		return;
	}

	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
	const fullName = typeof body.full_name === 'string' ? body.full_name : typeof body.name === 'string' ? body.name : '';
	const email = typeof body.email === 'string' ? body.email : '';
	const interest = typeof body.interest === 'string' ? body.interest : 'all';

	const result = await submitFurrowWaitlist({ fullName, email, interest });
	if (!result.ok) {
		res.status(400).json({ error: result.error });
		return;
	}

	res.status(200).json({
		ok: true,
		mailDelivery: result.mailDelivery,
		message:
			result.mailDelivery === 'sent'
				? 'Thank you — we received your request.'
				: 'Recorded — email delivery not configured on server.',
	});
}
