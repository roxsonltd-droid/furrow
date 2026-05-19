const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inboxTo(): string {
	return (
		process.env.FURROW_INBOX_EMAIL?.trim() ||
		process.env.FIELDLOT_INBOX_EMAIL?.trim() ||
		process.env.MAIL_TO?.trim() ||
		''
	);
}

function fromAddress(): string | null {
	const v =
		process.env.RESEND_FROM?.trim() ||
		process.env.MAIL_FROM?.trim() ||
		'';
	return v || null;
}

async function sendViaResend(opts: {
	to: string;
	from: string;
	subject: string;
	html: string;
	text?: string;
	replyTo?: string;
}): Promise<'sent' | 'skipped'> {
	const key = process.env.RESEND_API_KEY?.trim();
	if (!key) return 'skipped';

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${key}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: opts.from,
			to: [opts.to],
			subject: opts.subject,
			html: opts.html,
			text: opts.text,
			reply_to: opts.replyTo ? [opts.replyTo] : undefined,
		}),
	});

	if (!res.ok) {
		const data = (await res.json().catch(() => ({}))) as { message?: string };
		throw new Error(typeof data.message === 'string' ? data.message : res.statusText);
	}
	return 'sent';
}

export async function submitFurrowWaitlist(input: {
	fullName: string;
	email: string;
	interest?: string;
}): Promise<{ ok: true; mailDelivery: 'sent' | 'skipped' } | { ok: false; error: string }> {
	const email = input.email.trim();
	const fullName = (input.fullName.trim() || email.split('@')[0] || 'Subscriber').slice(0, 120);
	const interest = (input.interest?.trim() || 'all').slice(0, 64);

	if (!EMAIL_RE.test(email)) {
		return { ok: false, error: 'Invalid email' };
	}

	const to = inboxTo();
	const from = fromAddress();
	if (!to || !from) {
		return { ok: true, mailDelivery: 'skipped' };
	}

	const subject = `[Furrow] Waitlist · ${fullName}`;
	const text = [`Furrow waitlist (AI agent)`, `Name: ${fullName}`, `Email: ${email}`, `Interest: ${interest}`].join('\n');
	const html = `<p><strong>Furrow waitlist</strong> (via AI agent)</p><p>Name: ${fullName}</p><p>Email: ${email}</p><p>Interest: ${interest}</p>`;

	try {
		const sent = await sendViaResend({ to, from, subject, html, text, replyTo: email });
		return { ok: true, mailDelivery: sent };
	} catch (e) {
		const msg = e instanceof Error ? e.message : 'Email failed';
		return { ok: false, error: msg };
	}
}
