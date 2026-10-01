import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

test('home page exposes quiz and content navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pinoy Food Personality Test/);
  const mainNav = page.getByLabel('Main navigation');
  await expect(mainNav.getByRole('link', { name: /Food Guide/i })).toBeVisible();
  await expect(mainNav.getByRole('link', { name: /Blog/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Start the MBTI Test/i })).toBeVisible();
});

test('representative result page has static publisher content', async ({ page }) => {
  await page.goto('/results/intj.html');

  await expect(page.getByRole('heading', { level: 1, name: /Kapeng Barako/i })).toBeVisible();
  await expect(page.getByText(/Understanding the INTJ Personality/i)).toBeVisible();
  await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();
});

test('trust and content pages are reachable', async ({ page }) => {
  const paths = [
    '/about.html',
    '/contact.html',
    '/privacy.html',
    '/terms.html',
    '/food-guide.html',
    '/blog.html',
  ];

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('body')).toContainText(/Pinoy Food|Privacy|Terms|Contact|Food Guide|Blog/i);
  }
});

test('legacy result URL redirects to static result page', async ({ page }) => {
  await page.goto('/result.html?mbti=INTJ');

  await page.waitForURL(/\/results\/intj\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: /Kapeng Barako/i })).toBeVisible();
});

const MBTI_TYPES = [
  'intj', 'intp', 'entj', 'entp', 'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj', 'istp', 'isfp', 'estp', 'esfp',
];

test('all result pages have valid JSON-LD structured data', async ({ page }) => {
  for (const type of MBTI_TYPES) {
    await page.goto(`/results/${type}.html`);
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();

    expect(blocks.length, `${type}: expected at least one JSON-LD block`).toBeGreaterThan(0);
    for (const [i, raw] of blocks.entries()) {
      expect(() => JSON.parse(raw), `${type} JSON-LD block #${i + 1} must be valid JSON`).not.toThrow();
    }
  }
});

test('every result page shows its dish hero photo', async ({ page }) => {
  for (const type of MBTI_TYPES) {
    await page.goto(`/results/${type}.html`);
    const img = page.locator('figure.food-hero img');
    await expect(img, `${type}: hero image present`).toHaveCount(1);
    await expect(img).toHaveAttribute('alt', /\w{8,}/);
    const loaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(loaded, `${type}: hero image actually loads`).toBe(true);
  }
});

test('food guide shows all 16 dish photos', async ({ page }) => {
  await page.goto('/food-guide.html');
  const imgs = page.locator('figure.food-figure img');
  await expect(imgs).toHaveCount(16);
  const count = await imgs.count();
  for (let i = 0; i < count; i++) {
    await imgs.nth(i).scrollIntoViewIfNeeded();
    const loaded = await imgs.nth(i).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(loaded, `food-guide image #${i + 1} loads`).toBe(true);
  }
});

const RECIPES = ['adobo', 'sinigang', 'kare-kare', 'lumpia', 'pancit-canton', 'champorado'];

test('recipe pages have ingredients, steps, and valid Recipe JSON-LD', async ({ page }) => {
  for (const r of RECIPES) {
    await page.goto(`/recipes/${r}.html`);
    await expect(page.locator('.recipe-ingredients li').first()).toBeVisible();
    await expect(page.locator('.recipe-steps li').first()).toBeVisible();
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const b of blocks) {
      expect(() => JSON.parse(b), `${r}: JSON-LD parses`).not.toThrow();
    }
    const recipe = blocks.map((b) => { try { return JSON.parse(b); } catch { return null; } })
      .find((o) => o && o['@type'] === 'Recipe');
    expect(recipe, `${r}: has Recipe JSON-LD`).toBeTruthy();
    // Google Search Console: every HowToStep needs name + url + text
    for (const [i, step] of (recipe.recipeInstructions || []).entries()) {
      expect(step.name, `${r} step ${i + 1}: name`).toBeTruthy();
      expect(step.text, `${r} step ${i + 1}: text`).toBeTruthy();
      expect(step.url, `${r} step ${i + 1}: url`).toMatch(/#step\d+$/);
    }
  }
});

test('recipes hub lists all recipes', async ({ page }) => {
  await page.goto('/recipes.html');
  await expect(page.getByRole('heading', { level: 1, name: /Filipino Recipes/i })).toBeVisible();
  for (const r of RECIPES) {
    await expect(page.locator(`a[href="recipes/${r}.html"]`).first()).toBeVisible();
  }
});

test('food guide links to all 16 result pages, and the language toggle rewrites them', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/food-guide.html');
  const links = page.locator('a.dish-result-link');
  await expect(links).toHaveCount(MBTI_TYPES.length);

  for (const t of MBTI_TYPES) {
    await expect(page.locator(`a.dish-result-link[href="results/${t}.html"]`)).toHaveCount(1);
  }

  // Every result page must be reachable by a static link, not sitemap-only.
  const first = links.first();
  await expect(first).toHaveText(/See the full ISTJ profile/);

  await page.getByRole('button', { name: /Eng|Tag/i }).click();
  await expect(first).toHaveText(/Tingnan ang buong profile ng ISTJ/);

  expect(errors, 'no JS errors during language toggle').toEqual([]);
});

const MERGED_POSTS: { source: string; destination: string; permanent: boolean }[] =
  JSON.parse(readFileSync('vercel.json', 'utf8')).redirects;

test('quiz outputs are noindex and merged posts redirect outside the sitemap', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();

  for (const t of MBTI_TYPES) {
    await page.goto(`/results/${t}.html`);
    await expect(
      page.locator('meta[name="robots"]'),
      `results/${t} must be noindex`
    ).toHaveAttribute('content', /noindex/);
    expect(sitemap, `results/${t} must not be in the sitemap`).not.toContain(`/results/${t}<`);
  }

  for (const { source, destination, permanent } of MERGED_POSTS) {
    expect(permanent).toBe(true);
    for (const path of [source, source + '.html']) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(308);
      expect(response.headers().location, path).toBe(destination);
    }
    expect((await request.get(destination)).ok(), destination).toBe(true);
    expect(sitemap, `${source} must not be in the sitemap`).not.toContain(`${source}<`);
  }
});

test('homepage leads with the MBTI test on mobile, with food content below', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await expect(page.locator('#start-btn')).toBeInViewport({ ratio: 1 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pinoy FoodPersonality Test');

  const order = await page.evaluate(() =>
    ['start-screen', 'how-it-works', 'popular-results-section', 'intro-section', 'recipes-section', 'blog-preview-section']
      .map((id) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY)
  );
  expect(order, 'test → how-it-works → results → introduction → recipes → blog').toEqual([...order].sort((a, b) => a - b));

  // Supporting food links remain available after the test sections.
  for (const id of ['hero-link-recipes', 'hero-link-guide', 'hero-link-blog']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  await expect(page.locator('#hero-link-recipes')).toHaveText('Filipino Recipes');
  await page.getByRole('button', { name: /Eng|Tag/i }).click();
  await expect(page.locator('#hero-link-recipes')).toHaveText('Mga Filipino Recipe');
  await expect(page.locator('#start-btn')).toHaveText('Simulan ang MBTI Test');
  await expect(page.locator('#faq-q2')).toHaveText(/Aling mga Filipino dish/);
  await page.locator('#start-btn').click();
  await expect(page).toHaveURL(/quiz(?:\.html)?$/);

  expect(errors, 'no JS errors during language toggle').toEqual([]);
});

test('quiz page has one h1 that names the page without showing it', async ({ page }) => {
  await page.goto('/quiz');

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1, 'quiz needs exactly one h1').toHaveCount(1);
  await expect(h1).toHaveText('Pinoy Food Personality Quiz');

  // Reachable by assistive tech (getByRole found it) but clipped to nothing on screen:
  // the question, not a page title, is what a sighted reader sees.
  const box = await h1.boundingBox();
  expect(box!.width, 'h1 must be clipped, not laid out').toBeLessThanOrEqual(1);
  expect(box!.height, 'h1 must be clipped, not laid out').toBeLessThanOrEqual(1);
  await expect(page.locator('#question-text')).toBeVisible();

  // Headings start at h1 and never skip a level.
  const levels = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]))
  );
  expect(levels[0]).toBe(1);
  levels.forEach((lvl, i) => {
    if (i > 0) expect(lvl - levels[i - 1], `skip before heading ${i}`).toBeLessThanOrEqual(1);
  });

  // The hidden title is translated like every other string on the site.
  await page.click('#lang-btn');
  await expect(h1).toHaveText('Quiz sa Pinoy Food Personality');
});
