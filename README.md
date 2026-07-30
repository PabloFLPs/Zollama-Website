# Zollama — website

Marketing landing page + documentation for **Zollama**, a typed SDK for structured
output from AI models. Built with Next.js 15 (App Router) + React 19, TypeScript, and
zero UI dependencies — the design mirrors System Design Studio's calm dev-tool
aesthetic with Zollama's orange identity.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static)

```bash
npm run build    # emits a static site to ./out  (output: 'export' in next.config.mjs)
```

Host `out/` on any static host (GitHub Pages, S3/CloudFront, Netlify). To deploy on a
Node/Vercel runtime instead, drop `output: 'export'` from `next.config.mjs`.

## Structure

```
app/
  layout.tsx        fonts (Inter + JetBrains Mono), metadata, theme tokens
  globals.css       design tokens (dark, Zollama-orange accent) + base styles
  page.tsx          landing page
  docs/
    layout.tsx      docs shell (sidebar + content)
    page.tsx        Overview  (+ installation, quick-start, generate, providers,
                    validation, evals, errors, telemetry sub-pages)
components/         Header, Footer, CodeBlock (highlighter), ui primitives + Callout
lib/docsNav.ts      docs navigation model
```

Content is adapted from the Zollama library's own docs. This site is standalone — it
documents the library, not any particular app that consumes it.
