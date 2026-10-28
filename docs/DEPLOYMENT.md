# Deployment & maintenance

## Public URL

- **Live portfolio:** `https://mosbehhamdi.github.io/ibtissem-khemiri/`
- Source of truth: this repository (`main` branch).
- No `ledelice` branding appears anywhere on the portfolio (enforced by `npm run validate` in CI).

## How auto-deploy works

`push to main` → GitHub Actions (`.github/workflows/deploy.yml`):

1. Install (`npm ci`), validate source, build (`npm run build`), validate `dist/`.
2. Deploy to GitHub Pages. Any failure blocks the release — the previous live version stays up.
3. OVH mirror leg (optional, skipped unless all secrets exist).

Check a deployment: repo → **Actions** tab → latest *Build, Test, Deploy* run (green = live).

## Required setup (one time, already done unless noted)

- GitHub Pages: Settings → Pages → Source: **GitHub Actions**. (Do once; workflow handles the rest.)
- No secrets needed for the Pages URL.

## Optional: OVH mirror (isolated folder, zero risk to existing sites)

Create these **Actions secrets** (repo → Settings → Secrets and variables → Actions → New repository secret) — names only, values stay secret:

| Secret | Example value shape |
|---|---|
| `OVH_FTP_HOST` | `ftp.cluster100.hosting.ovh.net` (hosting cluster for `ledelice.tn`; already set) |
| `OVH_FTP_USERNAME` | dedicated FTP user (scoped to the portfolio folder) — still needed |
| `OVH_FTP_PASSWORD` | FTP password (rotate if ever shared in chat/email) — still needed |
| `OVH_FTP_DIR` | `www/ibtissem-khemiri/` (NEW folder — never an existing site root; already set) |

Known OVH account facts (from account emails, 2026-10-28):

- Hosting cluster: `ledelig.cluster100.hosting.ovh.net`; DNS already compliant (`A 5.135.23.164`, `AAAA 2001:41d0:301::100`).
- MySQL `ledeligledelice` exists on `ledeligledelice.mysql.db` — **not needed** by this static portfolio (no database; nothing connects to it).
- The FTP **username** is still unknown — find it in OVH Manager → Web hosting → FTP users (do not guess; repeated wrong logins can trigger a temporary block).

Safety rules enforced by the workflow:

- The OVH leg syncs **only** `OVH_FTP_DIR`, with `dangerous-clean-slate: false` (nothing outside that folder is touched or deleted).
- If any secret is missing, the leg is **skipped** — Pages deployment still succeeds.
- Never point `OVH_FTP_DIR` at `www/` or any existing site folder.

Recommended: create a **dedicated FTP user in OVH Manager** restricted to the portfolio folder (Hosting → FTP → create user), instead of reusing the main account.

## Updating the site (for Ibtissem)

1. Edit `src/content.js` (texts, links, skills…).
2. Commit and push to `main`:
   ```bash
   git add -A && git commit -m "Update portfolio content" && git push origin main
   ```
3. Watch the Actions run; the live site updates in ~1–2 minutes.

## Rollback

- **Pages:** Actions → pick the last green run → *Re-run jobs* (redeploys that commit's build). Or `git revert` the bad commit and push.
- **OVH mirror:** re-running any green workflow redeploys that commit's `dist/` to the same folder.

## Regression guarantee for existing OVH sites

- Baseline recorded 2026-10-28: `https://ledelice.tn/` and `https://www.ledelice.tn/` → HTTP 200, valid SSL, SPA homepage (2 535 bytes), main bundle `assets/main-*.js` (~965 KB).
- The portfolio never deploys to the existing site's document root; the OVH leg targets a NEW isolated folder only.
- After any OVH change, re-check: both URLs return 200 with unchanged homepage size/title and no new console/network errors.
