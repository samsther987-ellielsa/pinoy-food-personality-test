import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

test('published HTML keeps ads disabled and its structured data valid', async ({ page }) => {
  const files = ['.', 'blog', 'recipes', 'results'].flatMap(dir =>
    readdirSync(dir).filter(name => name.endsWith('.html')).map(name => `${dir}/${name}`));
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    expect(html, file).not.toMatch(/<script[^>]+src=["'][^"']*(?:adsbygoogle|googletagmanager)/i);
    expect(html, file).not.toMatch(/Userback|GTM-T/);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      expect(() => JSON.parse(match[1]), file).not.toThrow();
    }
  }
  await page.goto('/');
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content', 'ca-pub-3390185075238000');
  expect(readFileSync('ads.txt', 'utf8')).toContain('pub-3390185075238000');
});

test('analytics stays off until allowed, persists, and can be withdrawn', async ({ page, context }) => {
  const scripts: string[] = [];
  await page.route('https://www.googletagmanager.com/gtag/**', route => {
    scripts.push(route.request().url());
    return route.fulfill({ contentType: 'application/javascript', body: '' });
  });
  await page.goto('/');
  await page.locator('.privacy-choices summary').click();
  await expect(page.getByRole('status')).toHaveText('Analytics is off.');
  expect(scripts).toEqual([]);
  await page.getByRole('button', { name: 'Keep analytics off', exact: true }).click();
  await page.reload();
  expect(scripts).toEqual([]);
  await page.locator('.privacy-choices summary').click();
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Analytics is on.');
  await expect.poll(() => scripts.length).toBe(1);
  await page.reload();
  await expect.poll(() => scripts.length).toBe(2);
  await context.addCookies([{ name: '_ga', value: 'test-cookie', url: 'http://127.0.0.1:3000' }]);
  await page.locator('.privacy-choices summary').click();
  await page.getByRole('button', { name: 'Keep analytics off', exact: true }).click();
  expect(await page.evaluate(() => window['ga-disable-G-2SJWW8WS8Y'])).toBe(true);
  expect((await context.cookies()).some(cookie => cookie.name === '_ga')).toBe(false);
  await page.reload();
  expect(scripts.length).toBe(2);
  expect(await page.evaluate(() => localStorage.getItem('pinoy-analytics-consent'))).toBe('denied');
});

test('recipes and guides remain usable in Tagalog and on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const paths = ['/', '/recipes', '/blog', '/about', '/privacy', '/contact', '/food-guide',
    '/recipes/adobo', '/recipes/sinigang', '/recipes/kare-kare', '/recipes/lumpia', '/recipes/pancit-canton', '/recipes/champorado',
    '/blog/adobo-regional-variations', '/blog/history-of-sinigang', '/blog/how-to-host-kamayan',
    '/blog/filipino-breakfast-guide', '/blog/filipino-street-food-guide', '/blog/filipino-food-superstitions'];
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const path of paths) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const lang of ['en', 'tl']) {
      if (lang === 'tl') await page.locator('#lang-btn').click();
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      const layout = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(layout.scroll, `${path} ${lang}: no horizontal overflow`).toBeLessThanOrEqual(layout.width + 1);
      for (const block of await page.locator('[data-lang]').all()) {
        if (await block.getAttribute('data-lang') === lang) await expect(block).toBeVisible();
        else await expect(block).toBeHidden();
      }
    }
    const ids = await page.locator('[id]').evaluateAll(elements => elements.map(el => el.id));
    expect(new Set(ids).size, `${path}: unique HTML ids`).toBe(ids.length);
  }
  expect(errors).toEqual([]);
});

test('recipe metadata matches the ingredients and steps a reader sees', async ({ page }) => {
  for (const slug of ['adobo', 'sinigang', 'kare-kare', 'lumpia', 'pancit-canton', 'champorado']) {
    await page.goto(`/recipes/${slug}`);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const recipe = blocks.map(raw => JSON.parse(raw)).find(block => block['@type'] === 'Recipe');
    expect(recipe.recipeIngredient).toEqual(await page.locator('[data-lang="en"] .recipe-ingredients li').allTextContents());
    for (const step of recipe.recipeInstructions) {
      const id = new URL(step.url).hash;
      await expect(page.locator(id)).toHaveText(step.text);
    }
    await expect(page.locator('.article-sources a').first()).toBeVisible();
    await page.getByRole('button', { name: 'Print recipe', exact: true }).count().then(count => expect(count).toBe(1));
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.site-nav')).toBeHidden();
    await expect(page.locator('[data-lang="en"] .recipe-ingredients')).toBeVisible();
    await page.emulateMedia({ media: 'screen' });
  }
});

test('quiz completes even when browser storage is unavailable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto('/');
  await page.locator('#start-btn').click();
  for (let n = 1; n <= 16; n++) {
    await expect(page.locator('#q-counter')).toHaveText(`Q${n} / 16`);
    await page.locator('#opt-0').click();
  }
  await page.waitForURL(/\/results\/[a-z]{4}\.html$/, { timeout: 10000 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.entertainment-note')).toContainText('For entertainment');
  expect(errors).toEqual([]);
});

test('malformed score URLs restart the quiz', async ({ page }) => {
  for (const score of ['not-json', '{}', '{"E":-1}']) {
    await page.goto(`/loading.html?scores=${encodeURIComponent(score)}`);
    await page.waitForURL(/\/quiz\.html$/);
    await expect(page.locator('#q-counter')).toHaveText('Q1 / 16');
  }
});

test('contact form has labels and browser validation without sending a message', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByLabel('Your name', { exact: true })).toBeVisible();
  await page.getByLabel('Your email', { exact: true }).fill('invalid-address');
  expect(await page.locator('#contact-form').evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false);
  await expect(page.locator('#contact-form')).toHaveAttribute('action', 'https://formspree.io/f/xlglqkoe');
  await expect(page.locator('#contact-form')).toHaveAttribute('method', 'POST');
});
