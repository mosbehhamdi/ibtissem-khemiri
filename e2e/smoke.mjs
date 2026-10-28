import { chromium } from 'playwright';

// Local production-smoke: serves ./dist and checks rendering,
// navigation, responsive menu, console errors and failed requests.
// Usage: npm run build && npm run test:e2e
const BASE = process.env.E2E_BASE_URL || 'http://127.0.0.1:4173/';

const b = await chromium.launch();
try {
  for (const [name, w, h] of [['desktop', 1440, 900], ['tablet', 834, 1110], ['mobile', 390, 844]]) {
    const pg = await b.newPage({ viewport: { width: w, height: h } });
    const cerr = [];
    const rfail = [];
    pg.on('console', (m) => { if (m.type() === 'error') cerr.push(m.text()); });
    pg.on('requestfailed', (r) => rfail.push(r.url()));
    await pg.goto(BASE, { waitUntil: 'networkidle' });
    const title = await pg.title();
    const h1 = await pg.locator('h1').innerText();
    console.log(`[${name}] title=${title} h1=${h1}`);
    if (!/Ibtissem Khemiri/.test(`${title} ${h1}`)) throw new Error(`${name}: owner name missing`);
    const mobileNav = w <= 720;
    for (const a of ['#about', '#skills', '#experience', '#education', '#projects', '#contact']) {
      if (mobileNav) await pg.locator('#nav-toggle').click();
      await pg.locator(`nav a[href="${a}"]`).nth(0).click();
      await pg.waitForTimeout(250);
      if (!(await pg.evaluate((s) => !!document.querySelector(s), a))) throw new Error(`missing ${a}`);
    }
    console.log(`[${name}] anchors OK console_errors=${JSON.stringify(cerr)} failed=${JSON.stringify(rfail)}`);
    if (cerr.length || rfail.length) throw new Error(`${name} has errors`);
    if (name === 'mobile') {
      console.log('[mobile] hamburger OK (menu used for all anchor clicks)');
    }
    await pg.close();
  }
  console.log('SMOKE PASSED');
} finally {
  await b.close();
}
