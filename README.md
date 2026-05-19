# Furrow Markets — pre-launch site

**FT/WSJ-style homepage** + EN/RU + waitlist + **delayed live ticker** + **AI Analyst**.

- **Launch guide (Bulgarian, $0):** [FURROW-LAUNCH-BG.md](./FURROW-LAUNCH-BG.md)

## Quick start (full stack)

```bash
cd furrow-marketing
cp .env.example .env   # MISTRAL_API_KEY + RESEND_* for waitlist email
npm install
npm run dev
```

Open **http://127.0.0.1:3456** — EN/RU, live ticker, subscribe form, **AI Analyst** (bottom right).

> `npx serve .` only shows static HTML (no API, no live ticker, chat offline).

## APIs (самостоятелни — без връзка с други проекти)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/furrow-chat` | GET/POST | AI Analyst (Mistral/OpenAI) |
| `/api/furrow-signals` | GET/POST | Delayed CBOT + Baltic (Yahoo) |
| `/api/waitlist` | POST | Waitlist email via Resend |
| `/api/public-config` | GET | Mailchimp URLs from env (optional) |

**Agent tools:** `search_knowledge`, `get_market_signals`, `submit_waitlist`

## Deploy — GitHub **roxson** + Vercel (не AgriNexus)

Този сайт е **отделен продукт**. Публикувай го от repo **roxson** на GitHub — не от `agrinexus-final`.

### 1. Код в repo `roxson`

В GitHub repo **roxson** в **корена** трябва да са файловете от тази папка (`index.html`, `api/`, `server/`, `scripts/`, …) — не под подпапка `furrow-marketing/`.

Локално (еднократно или при обновления):

```bash
# пример: клонирай roxson, копирай съдържанието, push
git clone https://github.com/YOUR_USER/roxson.git
cd roxson
# копирай всичко от furrow-marketing/* в този каталог (без node_modules)
git add .
git commit -m "Furrow pre-launch site"
git push
```

### 2. Vercel

1. [vercel.com](https://vercel.com) → **Add New Project**
2. **Import** Git repo → избери **roxson** (не agrinexus-final)
3. **Root Directory** → остави **`.`** (корен на roxson)
4. **Environment Variables** → `MISTRAL_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `FURROW_INBOX_EMAIL`
5. Deploy

Всеки `git push` в **roxson** обновява live сайта.

### 3. Отделен Vercel проект

- **roxson** → Furrow marketing (този сайт)
- **agrinexus-final** → AgriNexus (друг продукт, друг deploy)

Не смесвай двата в един Vercel project.

## Waitlist

1. **Resend** — `RESEND_*` + `FURROW_INBOX_EMAIL`
2. **Mailchimp** (по избор) — `FURROW_MAILCHIMP_URL`, `FURROW_MAILCHIMP_HIDDEN`
