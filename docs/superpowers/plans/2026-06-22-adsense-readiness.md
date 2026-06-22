# AdSense Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare the static Pinoy Food Personality Test site for a stronger Google AdSense review by removing ad-heavy signals, fixing stale crawl paths, and verifying core content pages.

**Architecture:** Keep the site as static HTML/CSS/vanilla JavaScript. Make mechanical HTML cleanup across existing pages, keep static result pages canonical, and replace the default Playwright example with project-specific smoke tests.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node static dev server, Playwright Test.

---

## File Structure

- Modify: `*.html`, `blog/*.html`, `results/*.html`  
  Remove Ezoic and third-party ad network snippets from all review-visible pages. Keep Google Analytics/Tag Manager and the existing AdSense Auto Ads script on content pages unless the page is a utility page.
- Modify: `result.html`  
  Keep as a `noindex` legacy redirect/fallback page, but remove AdSense and third-party ad blocks from it.
- Modify: `404.html`  
  Remove ad scripts and update popular result links to static result pages.
- Modify: `js/result.js`  
  Update copied/shared result URLs from `/result.html?mbti=TYPE` to `/results/type.html`.
- Modify: `robots.txt`  
  Add disallow rules for utility/duplicate pages that should not be reviewed as publisher content.
- Modify: `sitemap.xml`  
  Confirm only canonical content pages are listed; update changed page dates if needed.
- Modify: `privacy.html`  
  Keep third-party disclosures aligned with the scripts that remain after cleanup.
- Modify: `tests/example.spec.ts`  
  Replace the default Playwright docs tests with site-specific AdSense-readiness smoke tests.
- Optionally modify: `playwright.config.ts`  
  Add local `webServer` and `baseURL` if needed for reliable local tests.

---

## Task 1: Audit Current AdSense Risk Surface

**Files:**
- Read: all HTML, sitemap, robots, shared result script

- [ ] **Step 1: List third-party ad script files**

Run:

```bash
rg -l "ezoic|ezojs|ezoicanalytics|effectivecpmnetwork|highperformanceformat|pl29501229|0fddc2a7be719e48f4c5ed797b5078ba|Adsterra Ads" -g "*.html"
```

Expected: A list of root, blog, and result HTML files containing Ezoic or third-party ad network snippets.

- [ ] **Step 2: List stale result URLs**

Run:

```bash
rg -n "result\\.html\\?mbti=|/result\\.html\\?mbti=|result\\.html" -g "*.html" -g "*.js" -g "*.xml" -g "*.md"
```

Expected: Stale user-facing links should be limited to `404.html`, `js/result.js`, and legacy documentation. `result.html` references are acceptable inside the legacy redirect page itself.

- [ ] **Step 3: List Google AdSense script locations**

Run:

```bash
rg -n "pagead2.googlesyndication.com|adsbygoogle|ca-pub-3390185075238000" -g "*.html" -g "*.js"
```

Expected: AdSense appears on content pages. It should not remain on utility pages such as `result.html`, `loading.html`, or `404.html`.

---

## Task 2: Remove Third-Party Ad Network Scripts

**Files:**
- Modify: every HTML file returned by Task 1 Step 1

- [ ] **Step 1: Remove Ezoic header block from HTML files**

Remove this exact block wherever present:

```html
    <!-- Ezoic - Privacy & Header Scripts (must load before other tracking) -->
    <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
    <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
    <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
    <script>
        window.ezstandalone = window.ezstandalone || {};
        ezstandalone.cmd = ezstandalone.cmd || [];
    </script>
    <script src="//ezoicanalytics.com/analytics.js"></script>
```

- [ ] **Step 2: Remove Adsterra/effectivecpmnetwork visible ad blocks**

Remove every block shaped like this:

```html
    <!-- Adsterra Ads -->
    <div class="ad-container" style="margin: 30px auto; text-align: center; max-width: 500px;">
        <p style="font-size: 0.7rem; color: #999; margin-bottom: 8px;">Advertisement</p>
        <script async="async" data-cfasync="false" src="https://pl29501229.effectivecpmnetwork.com/7d0601214e5c324304baa5a17eaecdc8/invoke.js"></script>
        <div id="container-7d0601214e5c324304baa5a17eaecdc8"></div>
        <div style="margin: 25px auto 0; width: 300px; height: 250px;">
            <script type="text/javascript">
                atOptions = {
                    'key' : '0fddc2a7be719e48f4c5ed797b5078ba',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/0fddc2a7be719e48f4c5ed797b5078ba/invoke.js"></script>
        </div>
    </div>
```

- [ ] **Step 3: Verify third-party ad scripts are gone**

Run:

```bash
rg -n "ezoic|ezojs|ezoicanalytics|effectivecpmnetwork|highperformanceformat|pl29501229|0fddc2a7be719e48f4c5ed797b5078ba|Adsterra Ads" -g "*.html"
```

Expected: no output outside `backup/` if backup files are included. Re-run with `-g "!backup/**"` for the approval surface:

```bash
rg -n "ezoic|ezojs|ezoicanalytics|effectivecpmnetwork|highperformanceformat|pl29501229|0fddc2a7be719e48f4c5ed797b5078ba|Adsterra Ads" -g "*.html" -g "!backup/**"
```

Expected: no output.

---

## Task 3: Keep Utility Pages Clean

**Files:**
- Modify: `result.html`
- Verify: `loading.html`
- Verify: `404.html`

- [ ] **Step 1: Remove AdSense script from `result.html`**

Remove:

```html
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3390185075238000" crossorigin="anonymous"></script>
```

Reason: `result.html` is `noindex` and exists only to redirect old URLs, so it should not be monetized.

- [ ] **Step 2: Confirm `loading.html` remains noindex and ad-free**

Run:

```bash
rg -n "noindex|pagead2|adsbygoogle|effectivecpmnetwork|highperformanceformat" loading.html
```

Expected: `noindex` appears, ad network terms do not.

- [ ] **Step 3: Confirm `404.html` has no ad scripts**

Run:

```bash
rg -n "pagead2|adsbygoogle|ezoic|effectivecpmnetwork|highperformanceformat" 404.html
```

Expected: no output.

---

## Task 4: Normalize Result URLs

**Files:**
- Modify: `js/result.js`
- Modify: `404.html`
- Optional docs update: `CLAUDE.md`

- [ ] **Step 1: Add a canonical share URL helper to `js/result.js`**

Insert before `shareResult()`:

```javascript
function getResultShareUrl(mbti) {
    const type = String(mbti || '').trim().toLowerCase();
    return `${window.location.origin}/results/${type}.html`;
}
```

- [ ] **Step 2: Update clipboard share URL in `shareResult()`**

Replace:

```javascript
const shareUrl = window.location.origin + `/result.html?mbti=${mbti}`;
```

with:

```javascript
const shareUrl = getResultShareUrl(mbti);
```

- [ ] **Step 3: Update Facebook share URL in `shareToFacebook()`**

Replace:

```javascript
const shareUrl = window.location.origin + `/result.html?mbti=${mbti}`;
```

with:

```javascript
const shareUrl = getResultShareUrl(mbti);
```

- [ ] **Step 4: Update 404 popular result links**

Replace:

```html
<a href="result.html?mbti=INTJ">☕ Kapeng Barako (INTJ)</a>
<a href="result.html?mbti=ENFP">🌈 Halo-Halo (ENFP)</a>
<a href="result.html?mbti=ISTJ">🥘 Adobo (ISTJ)</a>
<a href="result.html?mbti=INFP">🍫 Champorado (INFP)</a>
```

with:

```html
<a href="results/intj.html">☕ Kapeng Barako (INTJ)</a>
<a href="results/enfp.html">🌈 Halo-Halo (ENFP)</a>
<a href="results/istj.html">🥘 Adobo (ISTJ)</a>
<a href="results/infp.html">🍫 Champorado (INFP)</a>
```

- [ ] **Step 5: Verify stale URLs are gone from user-facing code**

Run:

```bash
rg -n "result\\.html\\?mbti=|/result\\.html\\?mbti=" -g "*.html" -g "*.js" -g "!docs/**" -g "!backup/**"
```

Expected: no output.

---

## Task 5: Update Crawl Signals

**Files:**
- Modify: `robots.txt`
- Verify: `sitemap.xml`
- Verify: `privacy-policy.html`

- [ ] **Step 1: Add utility-page disallows to `robots.txt`**

Change `robots.txt` to:

```txt
User-agent: *
Allow: /
Disallow: /backup/
Disallow: /loading.html
Disallow: /result.html
Disallow: /privacy-policy.html
Sitemap: https://pinoyfoodtest.com/sitemap.xml
```

- [ ] **Step 2: Confirm sitemap excludes utility pages**

Run:

```bash
rg -n "loading\\.html|result\\.html|privacy-policy\\.html|404\\.html" sitemap.xml
```

Expected: no output.

- [ ] **Step 3: Confirm sitemap includes important trust/content pages**

Run:

```bash
rg -n "about\\.html|contact\\.html|privacy\\.html|terms\\.html|food-guide\\.html|blog\\.html|results/intj\\.html" sitemap.xml
```

Expected: all listed content pages appear.

---

## Task 6: Align Privacy Disclosure With Remaining Scripts

**Files:**
- Modify: `privacy.html`

- [ ] **Step 1: Confirm removed ad networks are not named as active services**

Run:

```bash
rg -n "Ezoic|Adsterra|effectivecpmnetwork|highperformanceformat" privacy.html
```

Expected: no output.

- [ ] **Step 2: Update the last updated date**

Replace:

```html
<p class="update-date">Last Updated: February 16, 2026</p>
```

with:

```html
<p class="update-date">Last Updated: June 22, 2026</p>
```

- [ ] **Step 3: Verify remaining disclosures match remaining scripts**

Run:

```bash
rg -n "Google Analytics|Google AdSense|Google Tag Manager|Formspree|Firebase" privacy.html
```

Expected: the remaining active services are disclosed. If Firebase is not used in deployment anymore, update that line in a separate commit after confirming hosting.

---

## Task 7: Replace Default Playwright Tests

**Files:**
- Modify: `playwright.config.ts`
- Modify: `tests/example.spec.ts`

- [ ] **Step 1: Fetch current Playwright docs via Context7**

Resolve library ID for `Playwright` with the question: "Configure Playwright Test for a static local site with webServer and baseURL, and write smoke tests for navigation and page content."

Query docs with the selected Playwright library ID and the same question.

- [ ] **Step 2: Configure Playwright base URL and dev server**

Update `playwright.config.ts` so `use.baseURL` is `http://127.0.0.1:3000` and `webServer` runs `npm run dev` with that URL and `reuseExistingServer`.

- [ ] **Step 3: Replace default example tests**

Replace `tests/example.spec.ts` with tests that verify:

```typescript
import { test, expect } from '@playwright/test';

test('home page exposes quiz and content navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Pinoy Food Personality Test/);
  await expect(page.getByRole('link', { name: /Food Guide/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Blog/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Let's Eat|Tara Kain/i })).toBeVisible();
});

test('representative result page has static publisher content', async ({ page }) => {
  await page.goto('/results/intj.html');
  await expect(page.getByRole('heading', { name: /Kapeng Barako/i })).toBeVisible();
  await expect(page.getByText(/Understanding the INTJ Personality/i)).toBeVisible();
  await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();
});

test('trust and content pages are reachable', async ({ page }) => {
  for (const path of ['/about.html', '/contact.html', '/privacy.html', '/terms.html', '/food-guide.html', '/blog.html']) {
    await page.goto(path);
    await expect(page.locator('body')).toContainText(/Pinoy Food|Privacy|Terms|Contact|Food Guide|Blog/i);
  }
});

test('legacy result URL redirects to static result page', async ({ page }) => {
  await page.goto('/result.html?mbti=INTJ');
  await page.waitForURL(/\/results\/intj\.html$/);
  await expect(page.getByRole('heading', { name: /Kapeng Barako/i })).toBeVisible();
});
```

- [ ] **Step 4: Run Playwright tests**

Run:

```bash
npm test
```

If no `test` script exists, add:

```json
"test": "playwright test"
```

to `package.json`, then run:

```bash
npm test
```

Expected: all site smoke tests pass.

---

## Task 8: Final AdSense Readiness Verification

**Files:**
- Read: all changed files

- [ ] **Step 1: Verify no third-party ad scripts remain**

Run:

```bash
rg -n "ezoic|ezojs|ezoicanalytics|effectivecpmnetwork|highperformanceformat|pl29501229|0fddc2a7be719e48f4c5ed797b5078ba|Adsterra Ads" -g "*.html" -g "!backup/**"
```

Expected: no output.

- [ ] **Step 2: Verify AdSense is absent from utility pages**

Run:

```bash
rg -n "pagead2.googlesyndication.com|adsbygoogle|ca-pub-3390185075238000" result.html loading.html 404.html
```

Expected: no output.

- [ ] **Step 3: Verify content pages still expose trust navigation**

Run:

```bash
rg -n "About|Food Guide|Blog|Contact|Privacy Policy|Terms of Service" index.html quiz.html results/intj.html blog.html food-guide.html
```

Expected: navigation or footer trust links are present on each checked page.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: `Static site: no build step required`.

- [ ] **Step 5: Summarize readiness**

Final response should include:

- Removed third-party ad networks.
- Kept content pages and static result pages canonical.
- Cleaned stale result links.
- Updated robots/privacy/test coverage.
- Mention whether tests passed or what blocked them.
