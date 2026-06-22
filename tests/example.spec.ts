import { test, expect } from '@playwright/test';

test('home page exposes quiz and content navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pinoy Food Personality Test/);
  const mainNav = page.getByLabel('Main navigation');
  await expect(mainNav.getByRole('link', { name: /Food Guide/i })).toBeVisible();
  await expect(mainNav.getByRole('link', { name: /Blog/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Let's Eat|Tara Kain/i })).toBeVisible();
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
