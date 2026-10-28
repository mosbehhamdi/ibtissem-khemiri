// Static checks run in CI (and locally via `npm run validate`).
// Fails the build on: missing content, forbidden brand leakage,
// broken internal anchors, or missing dist output.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!ok) failures.push(msg);
};

const required = ['index.html', 'src/app.js', 'src/content.js', 'src/styles.css', 'vite.config.js', 'package.json'];
for (const f of required) check(existsSync(join(root, f)), `required file present: ${f}`);

const html = readFileSync(join(root, 'index.html'), 'utf8');
const content = readFileSync(join(root, 'src/content.js'), 'utf8');
const all = `${html}\n${content}`;

check(!/ledelice/i.test(all), 'no "ledelice" brand leakage in portfolio source');
check(/Ibtissem Khemiri/.test(all), 'owner name present');
check(/QA Engineer/.test(content), 'QA role present in content');
check(/profile|about|skills|projects|contact/.test(content), 'core sections defined in content.js');

// Every in-page nav anchor must have a matching id in index.html.
const anchors = [...html.matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]);
const ids = new Set([...html.matchAll(/id="([a-z-]+)"/g)].map((m) => m[1]));
for (const a of new Set(anchors)) check(ids.has(a), `nav anchor target exists: #${a}`);

// No invented-contact risk: TODO markers must remain visible in repo until replaced.
check(/TODO/.test(content), 'TODO markers for real contact links still tracked');

// Custom-domain binding for GitHub Pages (file is deployed as-is).
const cnamePath = join(root, 'public', 'CNAME');
if (existsSync(cnamePath)) {
  const cname = readFileSync(cnamePath, 'utf8').trim();
  check(cname === 'ibtissem-khemiri.com', `public/CNAME targets personal domain (got: ${cname})`);
  check(!/ledelice/i.test(cname), 'CNAME contains no unrelated brand');
} else {
  console.log('INFO  public/CNAME absent — custom domain not configured');
}

// If dist/ exists (post-build), verify it is self-contained and clean.
const dist = join(root, 'dist');
if (existsSync(dist)) {
  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) walk(p);
      else files.push(p);
    }
  };
  walk(dist);
  check(files.some((f) => f.endsWith('index.html')), 'dist contains index.html');
  const distHtml = readFileSync(join(dist, 'index.html'), 'utf8');
  check(!/ledelice/i.test(distHtml), 'no "ledelice" leakage in built output');
  check(!/localhost:3000|@vite\/client/.test(distHtml), 'no dev-server references in build');
  console.log(`INFO  dist files: ${files.length}`);
} else {
  console.log('INFO  dist/ not present (pre-build) — skipping output checks');
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll validation checks passed.');
