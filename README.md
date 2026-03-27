# J&J Management Solutions — landing site

A **Next.js 15** (App Router) marketing site with **React 19**, **Framer Motion**, and **Tailwind CSS v4**. It is designed to feel modern and interactive—scroll-linked navigation, staged section reveals, and motion on hero, cards, and CTAs—while staying fast and deployable as static output where appropriate.

## Stack

| Piece | Role |
|-------|------|
| Next.js 15 | App Router, metadata/SEO, `next/image`, fonts |
| React 19 | UI |
| Framer Motion | Hero ambience, `whileInView` / staggered reveals, hover micro-interactions |
| Tailwind CSS v4 | Layout, tokens via `@theme` in `app/globals.css` |

## Run locally

Requires **Node.js 20.3+** (or current LTS).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & production

```bash
npm run build
npm start
```

## Deploy

Deploy to [Vercel](https://vercel.com/) (native Next.js support), or any host that runs Node for `next start`. For static export only, you would add `output: "export"` in `next.config.ts`—not required for a standard Node deployment.

Update `metadataBase` and URLs in [`app/layout.tsx`](app/layout.tsx) when your domain is live.

## Content & links

- Copy and sections live under [`components/landing/`](components/landing/).
- **Scheduling, email, phone, area, response copy:** [`lib/constants.ts`](lib/constants.ts) — update `SCHEDULER_URL`, `CONTACT_MAILTO`, `PHONE_TEL` / `PHONE_DISPLAY` (use a real `tel:` link), `SERVICE_AREA`, and `RESPONSE_TIME` before going live.

### Product inquiry form (Option B on the contact section)

The **“Get a product built for your business”** form posts to [`app/api/contact/route.ts`](app/api/contact/route.ts), which forwards to **[Web3Forms](https://web3forms.com/)** using a server-side key.

1. Create a free access key at [web3forms.com](https://web3forms.com).
2. Add to `.env.local` (and your host’s environment):

```bash
WEB3FORMS_ACCESS_KEY=your_key_here
```

3. Restart `next dev` or redeploy. Submissions go to the inbox you set in Web3Forms.

If `WEB3FORMS_ACCESS_KEY` is unset, the API returns `503` and the UI explains that the form is not connected yet—**Book a call** and **Email us** still work.

## Portfolio / case studies

The home page includes a **Work** section (`#portfolio`) linking to full case-study routes:

| Route | Mock focus |
|-------|------------|
| `/work/red-dirt-roofing` | Local trades / lead website |
| `/work/summit-family-dental` | Booking & intake flow |
| `/work/bricktown-bistro` | Restaurant site + reservations |
| `/work/prairie-hvac-ads` | Ad campaign structure & reporting |

**To add a sample:** (1) append an entry to `projects` in [`lib/portfolio-data.ts`](lib/portfolio-data.ts), (2) add a preview component under [`components/portfolio/previews/`](components/portfolio/previews/), (3) register the slug in `PreviewBySlug` and `mockUrls` inside [`components/portfolio/CaseStudyView.tsx`](components/portfolio/CaseStudyView.tsx).

## Assets

Place brand images in [`public/`](public/) (`logo.png`, `team-john.png`, `team-jacob.png`).

## Lint

```bash
npm run lint
```
