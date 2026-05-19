import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Public client config (no secrets). */
export default function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Cache-Control', 'public, max-age=60');

	if (req.method !== 'GET') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	const mailchimpUrl = (process.env.FURROW_MAILCHIMP_URL || '').trim();
	const mailchimpHidden = (process.env.FURROW_MAILCHIMP_HIDDEN || '').trim();

	res.status(200).json({
		mailchimpConfigured: Boolean(mailchimpUrl && mailchimpHidden),
		mailchimpUrl: mailchimpUrl || null,
		mailchimpHidden: mailchimpHidden || null,
		waitlistApi: true,
		signalsApi: true,
	});
}
