# Keystone Electrical Supply Corp. website

Homepage for Keystone (Quezon City importer and contractor serving Philippine electric co-ops).
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide. Static output, no backend.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # quote-form validation
npm run build && npm start
```

## Edit content

All company facts live in `lib/content.ts` (services, products, clients, timeline, contacts).
Every fact there comes from `Keystone - Company Profile.pdf` or `Presentation.docx`. Don't add claims without a source.

## Deploy

Every push to `main` deploys to production on Vercel, and every pull request gets a preview, via
`.github/workflows/deploy.yml` (GitHub Actions running the Vercel CLI). Live: https://keystone-brown-delta.vercel.app

One-time setup: repo variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (already set), plus a `VERCEL_TOKEN`
repo secret created at https://vercel.com/account/tokens:

```bash
gh secret set VERCEL_TOKEN --repo heroltolosa-123/keystone
```

Without the secret the workflow skips the deploy instead of failing. Manual deploy: `vercel deploy --prod`.
Once a production domain exists, add `metadataBase` in `app/layout.tsx` and a sitemap/robots.

## How the quote form works

No server. On submit it validates, then opens the visitor's email app with a pre-filled message to
keystonepower@gmail.com, with WhatsApp and copy-to-clipboard fallbacks. Nothing is sent until the visitor
presses Send. To receive submissions directly, add an API route plus an email provider (e.g. Resend).

## Replace before launch

- `public/images/keystone-logo.png` is a 249×140 JPEG pulled from the PDF. Swap in a vector logo.
- The two lineman photos come from the company profile. Confirm they are licensed for web use, or replace them with real Keystone project photos.
- Brand names (Klein, Fluke, Hastings…) are text only. Confirm each distributor relationship before showing logos.
- The 98% satisfaction figure in the profile is left out because it has no source.
