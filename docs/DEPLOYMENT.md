# Deployment & maintenance

## Public URL

- **Live portfolio (today):** `https://mosbehhamdi.github.io/ibtissem-khemiri/`
- **Target personal URL:** `https://ibtissem-khemiri.com` — repo is already prepared (`public/CNAME` + CI check). Goes live as soon as the domain is purchased and DNS points to GitHub Pages (see below).
- Source of truth: this repository (`main` branch).
- No `ledelice` branding appears anywhere on the portfolio (enforced by `npm run validate` in CI).

## Custom domain `ibtissem-khemiri.com` (requires purchase — not yet owned)

RDAP check 2026-10-28: domain is **unregistered**. Someone must buy it (registrar of choice, ~€10–15/yr; OVH is fine since hosting is already there).

After purchase, set these DNS records at the registrar (GitHub Pages):

| Host | Type | Value |
|---|---|---|
| `@` (apex) | A | `185.199.108.153` |
| `@` (apex) | A | `185.199.109.153` |
| `@` (apex) | A | `185.199.110.153` |
| `@` (apex) | A | `185.199.111.153` |
| `www` | CNAME | `mosbehhamdi.github.io.` |

Then: repo → Settings → Pages → Custom domain = `ibtissem-khemiri.com` → Save → wait for DNS check → **Enforce HTTPS**.
No code change or redeploy needed — the next Actions run (or Re-run of the latest green one) publishes the already-present `CNAME` file.

Optional OVH alternative: attach the domain as a multisite to the existing hosting pointing at `www/ibtissem-khemiri/` (isolated folder). Keep Pages as primary unless you prefer OVH to serve it.

## How auto-deploy works

`push to main` → GitHub Actions (`.github/workflows/deploy.yml`):

1. Install (`npm ci`), validate source, build (`npm run build`), validate `dist/`.
2. Deploy to GitHub Pages. Any failure blocks the release — the previous live version stays up.

Check a deployment: repo → **Actions** tab → latest *Build, Test, Deploy* run (green = live).

## Required setup (one time, already done unless noted)

- GitHub Pages: Settings → Pages → Source: **GitHub Actions**. (Do once; workflow handles the rest.)
- No secrets needed for the Pages URL.

## OVH mirror — REMOVED 2026-10-29 (owner request)

The portfolio folder `www/ibtissem-khemiri/` was fully deleted from the hosting (all 5 files + 2 folders, verified via FTP; `www/` restored to its 6 original entries). The `deploy-ovh-mirror` job was removed from the workflow and all four `OVH_FTP_*` secrets deleted. Re-pushing can no longer recreate it.

Hosting facts kept for reference:

- Cluster: `ledelig.cluster100.hosting.ovh.net`; DNS compliant (`A 5.135.23.164`, `AAAA 2001:41d0:301::100`).
- MySQL `ledeligledelice` exists — never used by this static portfolio.
- `/ibtissem-khemiri/` (and any unknown path) serves the Pâtisserie SPA fallback via the site's own `.htaccess` — pre-existing host behavior, not portfolio content.

## Updating the site (for Ibtissem)

1. Edit `src/content.js` (texts, links, skills…).
2. Commit and push to `main`:
   ```bash
   git add -A && git commit -m "Update portfolio content" && git push origin main
   ```
3. Watch the Actions run; the live site updates in ~1–2 minutes.

## Rollback

- **Pages:** Actions → pick the last green run → *Re-run jobs* (redeploys that commit's build). Or `git revert` the bad commit and push.

## Regression guarantee for existing OVH sites

- Baseline recorded 2026-10-28: `https://ledelice.tn/` and `https://www.ledelice.tn/` → HTTP 200, valid SSL, SPA homepage (2 535 bytes), main bundle `assets/main-*.js` (~965 KB).
- The portfolio never deployed to the existing site's document root; its former isolated folder `www/ibtissem-khemiri/` was fully removed 2026-10-29.
- After any OVH change, re-check: both URLs return 200 with unchanged homepage size/title and no new console/network errors.
