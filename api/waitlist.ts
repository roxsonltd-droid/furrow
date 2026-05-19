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
	const fullName =
		typeof body.full_name === 'string'
			? body.full_name
			: typeof body.name === 'string'
				? body.name
				: '';
	const email = typeof body.email === 'string' ? body.email : '';
	const interest = typeof body.interest === 'string' ? body.interest : 'all';
	const lang = body.lang === 'ru' ? 'ru' : 'en';
	const source = typeof body.source === 'string' ? body.source : 'website';

	const result = await submitFurrowWaitlist({ fullName, email, interest, lang, source });
	if (result.ok === false) {
		res.status(400).json({ error: result.error });
		return;
	}

	const en = lang === 'en';
	res.status(200).json({
		ok: true,
		mailDelivery: result.mailDelivery,
		welcomeSent: result.welcomeSent,
		message:
			result.welcomeSent
				? en
					? 'Registered! Check your inbox for confirmation.'
					: 'Готово! Проверьте почту для подтверждения.'
				: result.mailDelivery === 'sent'
					? en
						? 'You are on the list. We will contact you before launch.'
						: 'Вы в списке. Напишем перед запуском.'
					: en
						? 'Registered (email delivery pending server config).'
						: 'Зарегистрировано (имейл ожидает настройки сервера).',
	});
}
