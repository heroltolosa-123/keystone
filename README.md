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

Static-friendly; any Node host or Vercel works. `npm run build` must pass first.
Set a production domain, then add `metadataBase` in `app/layout.tsx` and a sitemap/robots.

## How the quote form works

No server. On submit it validates, then opens the visitor's email app with a pre-filled message to
keystonepower@gmail.com, with WhatsApp and copy-to-clipboard fallbacks. Nothing is sent until the visitor
presses Send. To receive submissions directly, add an API route plus an email provider (e.g. Resend).

## Replace before launch

- `public/images/keystone-logo.png` is a 249×140 JPEG pulled from the PDF. Swap in a vector logo.
- The two lineman photos come from the company profile. Confirm they are licensed for web use, or replace them with real Keystone project photos.
- Brand names (Klein, Fluke, Hastings…) are text only. Confirm each distributor relationship before showing logos.
- The 98% satisfaction figure in the profile is left out because it has no source.
