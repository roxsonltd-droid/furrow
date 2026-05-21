import { buildFurrowKnowledgeContext, getKnowledgeChunkIds } from './furrow-knowledge.js';
import type { ChatMessage, FurrowChatTurn } from './agent-types.js';

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

export class MemoryAgent {
	private maxMessages: number;

	constructor(maxMessages: number = 12) {
		this.maxMessages = maxMessages;
	}

	private truncate(s: string, max: number): string {
		return s.length <= max ? s : `${s.slice(0, max)}…`;
	}

	public prepareMemory(rawMessages: unknown[], lang: 'en' | 'ru'): { 
		chatMessages: ChatMessage[], 
		knowledgeIds: string[] 
	} | { error: string } {
		const cleaned: FurrowChatTurn[] = [];
		for (const m of rawMessages.slice(-this.maxMessages)) {
			if (!m || typeof m !== 'object') continue;
			const o = m as Record<string, unknown>;
			if ((o.role !== 'user' && o.role !== 'assistant') || typeof o.content !== 'string') continue;
			const content = o.content.trim();
			if (!content) continue;
			cleaned.push({ role: o.role, content: this.truncate(content, 2400) });
		}

		const last = cleaned[cleaned.length - 1];
		if (!last || last.role !== 'user') {
			return { error: 'Last message must be from user' };
		}

		const knowledgeBlock = buildFurrowKnowledgeContext(last.content);
		const knowledgeIds = getKnowledgeChunkIds(last.content);
		const system = `${lang === 'ru' ? SYSTEM_RU : SYSTEM_EN}\n\n=== KNOWLEDGE ===\n${knowledgeBlock}`;

		const chatMessages: ChatMessage[] = [
			{ role: 'system', content: system },
			...cleaned.map((m) => ({ role: m.role, content: m.content })),
		];

		return { chatMessages, knowledgeIds };
	}
}
