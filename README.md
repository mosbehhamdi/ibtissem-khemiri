# Ibtissem Khemiri — QA Engineer Portfolio

Live site: **https://mosbehhamdi.github.io/ibtissem-khemiri/** (personal URL — no unrelated business branding).

Static portfolio built with [Vite](https://vite.dev/) (vanilla JS, no runtime dependencies). The `dist/` build runs on GitHub Pages and any static host.

## Edit the content (no coding needed)

Everything editable lives in **`src/content.js`** — texts, skills, links, projects. Rules:

1. Change values between quotes, keep the structure.
2. Copy/paste item blocks (`{ ... }`) to add entries.
3. Set `visible: false` to hide a draft, `visible: true` to publish it.
4. **Only add real experience, education, and certifications.** Example placeholders are hidden by default — replace or delete them, never present them as real.
5. Push to `main` → GitHub Actions builds, validates, and deploys automatically.

## Local development

```bash
npm install
npm run dev      # local preview with hot reload
npm run validate # static checks (content, anchors, brand leakage)
npm run build    # production build into dist/
npm run test:e2e # Playwright smoke on the production build (set E2E_BASE_URL to test a live URL)
```

## Automatic deployment

Push to `main` triggers `.github/workflows/deploy.yml`:

1. `npm ci` → `npm run validate` → `npm run build` → re-validate `dist/` → Playwright e2e on the production build.
2. Deploy to **GitHub Pages** (public personal URL above). Any failure blocks the release — the previous live version stays up.

Note: an OVH FTP mirror leg briefly existed for staging and was **fully removed on 2026-10-29** (folder deleted from hosting, workflow job + secrets removed). Current deploys touch only GitHub Pages.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the custom-domain plan (`ibtissem-khemiri.com`), rollback, and regression notes.
