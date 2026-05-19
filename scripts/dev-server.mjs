/**
 * Static site + APIs for local dev.
 * Usage: npm run dev  (from furrow-marketing/)
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const port = Number(process.env.PORT || 3456);

function loadDotEnv() {
	for (const name of ['.env', '.env.local']) {
		const p = join(root, name);
		if (!existsSync(p)) continue;
		try {
			const raw = readFileSync(p, 'utf-8');
			for (const line of raw.split(/\r?\n/)) {
				const t = line.trim();
				if (!t || t.startsWith('#')) continue;
				const eq = t.indexOf('=');
				if (eq <= 0) continue;
				const key = t.slice(0, eq).trim();
				if (process.env[key] !== undefined) continue;
				let val = t.slice(eq + 1).trim();
				if (
					(val.startsWith('"') && val.endsWith('"')) ||
					(val.startsWith("'") && val.endsWith("'"))
				) {
					val = val.slice(1, -1);
				}
				process.env[key] = val;
			}
		} catch {
			/* ignore */
		}
	}
}
loadDotEnv();

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.webp': 'image/webp',
};

async function readBody(req) {
	const chunks = [];
	for await (const c of req) chunks.push(c);
	const raw = Buffer.concat(chunks).toString('utf8');
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function json(res, status, body) {
	res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
	res.end(JSON.stringify(body));
}

const server = createServer(async (req, res) => {
	const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
	const pathname = url.pathname;

	if (pathname === '/api/furrow-chat') {
		const { handleFurrowChatPost, isAnyLlmConfigured } = await import('../server/furrow-chat-handler.ts');

		if (req.method === 'GET') {
			json(res, 200, {
				ok: true,
				llmConfigured: isAnyLlmConfigured(),
				agentEnabled: process.env.FURROW_AGENT_DISABLED !== '1',
			});
			return;
		}

		if (req.method === 'POST') {
			const body = await readBody(req);
			const result = await handleFurrowChatPost(body, { clientIp: '127.0.0.1' });
			if (result.ok) {
				json(res, 200, {
					reply: result.reply,
					agentMode: result.agentMode,
					actions: result.actions,
					knowledgeIds: result.knowledgeIds,
				});
			} else {
				json(res, result.status, { error: result.error, hint: result.hint });
			}
			return;
		}

		res.writeHead(405);
		res.end();
		return;
	}

	if (pathname === '/api/furrow-signals') {
		const { getFurrowMarketSignals, refreshFurrowMarketSignals } = await import(
			'../server/furrow-market-signals.ts'
		);
		if (req.method === 'GET') {
			const force = url.searchParams.get('force') === '1';
			const body = await getFurrowMarketSignals({ force });
			json(res, 200, body);
			return;
		}
		if (req.method === 'POST') {
			const body = await refreshFurrowMarketSignals();
			json(res, 200, body);
			return;
		}
		res.writeHead(405);
		res.end();
		return;
	}

	if (pathname === '/api/public-config' && req.method === 'GET') {
		const mailchimpUrl = (process.env.FURROW_MAILCHIMP_URL || '').trim();
		const mailchimpHidden = (process.env.FURROW_MAILCHIMP_HIDDEN || '').trim();
		json(res, 200, {
			mailchimpConfigured: Boolean(mailchimpUrl && mailchimpHidden),
			mailchimpUrl: mailchimpUrl || null,
			mailchimpHidden: mailchimpHidden || null,
			waitlistApi: true,
			signalsApi: true,
		});
		return;
	}

	if (pathname === '/api/waitlist' && req.method === 'POST') {
		const { submitFurrowWaitlist } = await import('../server/waitlist.ts');
		const body = (await readBody(req)) || {};
		const fullName =
			typeof body.full_name === 'string'
				? body.full_name
				: typeof body.name === 'string'
					? body.name
					: '';
		const email = typeof body.email === 'string' ? body.email : '';
		const interest = typeof body.interest === 'string' ? body.interest : 'all';
		const result = await submitFurrowWaitlist({ fullName, email, interest });
		if (!result.ok) {
			json(res, 400, { error: result.error });
			return;
		}
		json(res, 200, {
			ok: true,
			mailDelivery: result.mailDelivery,
			message:
				result.mailDelivery === 'sent'
					? 'Thank you — we received your request.'
					: 'Recorded — configure RESEND_* for email delivery.',
		});
		return;
	}

	let filePath = join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''));
	if (pathname.endsWith('/')) filePath = join(filePath, 'index.html');

	try {
		const data = await readFile(filePath);
		const ext = extname(filePath);
		res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
		res.end(data);
	} catch {
		res.writeHead(404);
		res.end('Not found');
	}
});

server.listen(port, () => {
	console.log(`Furrow dev: http://127.0.0.1:${port}`);
	console.log('APIs: /api/furrow-chat, /api/furrow-signals, /api/waitlist, /api/public-config');
	console.log('Set MISTRAL_API_KEY in .env for AI; RESEND_* for waitlist email.');
});
