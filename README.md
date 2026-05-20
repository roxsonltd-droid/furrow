# Furrow Markets — pre-launch site

**FT/WSJ-style homepage** + EN/RU + waitlist + **delayed live ticker** + **AI Analyst**.

- **Launch guide (Bulgarian, $0):** [FURROW-LAUNCH-BG.md](./FURROW-LAUNCH-BG.md)

## Quick start (full stack)

Работиш от **корена на този repo** (където са `package.json` и `index.html`).

```bash
cp .env.example .env   # MISTRAL_API_KEY + RESEND_* for waitlist email
npm install
npm run dev
```

`npm run typecheck` — проверка на `api/*.ts` и `server/*.ts` (без emit).

> Ако работиш от монорепо, същият код често е под папка **`furrow-marketing/`** — `cd` там и изпълни същите команди от корена ѝ.

Open **http://127.0.0.1:3456** — EN/RU, live ticker, subscribe form, **AI Analyst** (bottom right).

**Furrow analysis archive:** [/archive](./archive.html) — only Furrow desk longreads (Egypt, Ukraine, tomato outlook, sample).

**Статичен индекс на статии:** [`/agridirect/`](./agridirect/) — опционален JSON/HTML изход за вътрешен sync (виж [agridirect/README.md](./agridirect/README.md)). Редакционният лонгрид архив остава на [`/archive`](./archive.html). Обновяване: `npm run sync:agridirect`.

> `npx serve .` only shows static HTML (no API, no live ticker, chat offline).

## APIs (самостоятелни — без връзка с други проекти)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/furrow-chat` | GET/POST | AI Analyst (Mistral/OpenAI) |
| `/api/furrow-signals` | GET/POST | Delayed CBOT + Baltic (Yahoo) |
| `/api/waitlist` | POST | Waitlist email via Resend |
| `/api/public-config` | GET | Mailchimp URLs + `waitlistResendConfigured` (без секрети) |

Чисти URL-и (Vercel `vercel.json`): `/register` → `register.html`; `/archive` → редакционен архив; `/agridirect` → статичен индекс на статии. Локално `npm run dev` обслужва `/register`, `/archive` и `/agridirect`.

**Agent tools:** `search_knowledge`, `get_market_signals`, `submit_waitlist`

## Deploy — GitHub **roxson** + Vercel

Furrow Markets се публикува като **самостоятелен** сайт от repo **roxson** на GitHub (не като подпроект в чужд корен на друг сайт).

### 1. Код в repo `roxson`

В GitHub repo **roxson** в **корена** трябва да са файловете (`index.html`, `api/`, `server/`, `scripts/`, …) — **без** вложена подпапка със същия сайт.

Ако копираш файлове от монорепо, вземи **съдържанието** на `furrow-marketing/` в корена на `roxson`, не цялата вложена папка като единствен подкаталог.

Локално (еднократно или при обновления):

```bash
# пример: клонирай roxson, копирай файловете в корена, push
git clone https://github.com/YOUR_USER/roxson.git
cd roxson
# (ако източникът е monorepo) cp -r ../path/to/furrow-marketing/* .   # без node_modules
git add .
git commit -m "Furrow pre-launch site"
git push
```

### 2. Vercel

1. [vercel.com](https://vercel.com) → **Add New Project**
2. **Import** Git repo → избери **roxson** (repo-то на Furrow)
3. **Root Directory** → остави **`.`** (корен на roxson)
4. **Environment Variables** → `MISTRAL_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `FURROW_INBOX_EMAIL`
5. Deploy

Всеки `git push` в **roxson** обновява live сайта.

### 3. Vercel проект за Furrow

Използвай **отделен** Vercel project само за този repo (`roxson`), за да не се смесват build-ове и env с несвързани приложения.

Не смесвай Furrow с други приложения в един и същ Vercel project.

## Waitlist

1. **Resend** — `RESEND_*` + `FURROW_INBOX_EMAIL`
2. **Mailchimp** (по избор) — `FURROW_MAILCHIMP_URL`, `FURROW_MAILCHIMP_HIDDEN`
