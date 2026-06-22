# AdSense Image + Polish Implementation Plan (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add real, licensed, accuracy-verified Filipino dish photography to the 16 result pages and the food guide (plus canonical/sitemap clean-URL alignment) so the site reads as a finished, professional publisher site for AdSense review.

**Architecture:** Pure static site, no build step. Source photos from Pexels via headless browser, visually verify each shows the correct dish, download + crop to a uniform 1000×667 JPEG with `sips`, self-host under `images/dishes/`, and embed with responsive, dimensioned, lazy/eager `<img>` markup. Add Playwright tests asserting each dish image loads. Then align canonicals + sitemap to the clean URLs served by `vercel.json` `cleanUrls`.

**Tech Stack:** HTML5/CSS3/vanilla JS, `sips` (macOS image tool), `curl`, Playwright Test, Vercel (git-push auto-deploy).

**Spec:** `docs/superpowers/specs/2026-06-22-adsense-images-design.md`

---

## Dish Reference Table (source of truth for this plan)

| MBTI | Dish | slug (image filename) | Pexels search term(s) | result page | food-guide `<h2>` id | alt text |
|------|------|------------------------|------------------------|-------------|----------------------|----------|
| istj | Adobo | `adobo` | chicken adobo | `results/istj.html` | `adobo-title` | Filipino chicken adobo braised in soy sauce and vinegar, served with rice |
| isfj | Sinigang | `sinigang` | sinigang soup; tamarind soup | `results/isfj.html` | `sinigang-title` | Filipino sinigang sour tamarind soup with pork and vegetables |
| infj | Kare-Kare | `kare-kare` | kare kare; oxtail peanut stew | `results/infj.html` | `karekare-title` | Filipino kare-kare oxtail stew in a rich peanut sauce |
| intj | Kapeng Barako | `kapeng-barako` | black coffee cup; espresso | `results/intj.html` | `barako-title` | A cup of strong black Filipino Barako coffee |
| istp | Kinilaw | `kinilaw` | fish ceviche; kinilaw | `results/istp.html` | `kinilaw-title` | Filipino kinilaw raw fish cured in vinegar and citrus |
| isfp | Buko Pie | `buko-pie` | coconut pie; cream pie slice | `results/isfp.html` | `bukopie-title` | A slice of Filipino buko (young coconut) pie |
| infp | Champorado | `champorado` | chocolate rice porridge; champorado | `results/infp.html` | `champorado-title` | Filipino champorado chocolate rice porridge |
| intp | Balut | `balut` | boiled duck egg; balut | `results/intp.html` | `balut-title` | Filipino balut boiled duck egg street food |
| estp | Isaw | `isaw` | filipino street food skewer; grilled bbq skewer | `results/estp.html` | `isaw-title` | Filipino isaw grilled skewers, a popular street food |
| esfp | Crispy Pata | `crispy-pata` | crispy pork leg; crispy pata | `results/esfp.html` | `crispypata-title` | Filipino crispy pata, deep-fried pork leg |
| enfp | Halo-Halo | `halo-halo` | halo halo dessert | `results/enfp.html` | `halohalo-title` | Filipino halo-halo shaved ice dessert with mixed toppings |
| entp | Sisig | `sisig` | sisig; sizzling pork | `results/entp.html` | `sisig-title` | Filipino sisig, a sizzling chopped pork dish |
| estj | Pancit Canton | `pancit-canton` | stir fried noodles; pancit | `results/estj.html` | `pancitcanton-title` | Filipino pancit canton stir-fried noodles |
| esfj | Lumpia | `lumpia` | spring rolls; lumpia | `results/esfj.html` | `lumpia-title` | Filipino lumpia spring rolls |
| enfj | Taho | `taho` | taho; silken tofu syrup dessert | `results/enfj.html` | `taho-title` | Filipino taho — warm silken tofu with syrup and tapioca pearls |
| entj | Lechon | `lechon` | lechon; roasted whole pig | `results/entj.html` | `lechon-title` | Filipino lechon, a whole roasted pig |

**`.food-name` heading text per result page** (the edit anchor for Task 3): istj `Adobo 🥘`, isfj `Sinigang 🍲`, infj `Kare-Kare 🥜`, intj `Kapeng Barako ☕`, istp `Kinilaw 🐟`, isfp `Buko Pie 🥥`, infp `Champorado 🍫`, intp `Balut 🥚`, estp `Isaw 🍢`, esfp `Crispy Pata 🍖`, enfp `Halo-Halo 🌈`, entp `Sisig 🌶️`, estj `Pancit Canton 🍜`, esfj `Lumpia 🌯`, enfj `Taho 🥤`, entj `Lechon 👑`.

---

## Task 1: Image asset directory + CSS

**Files:**
- Create: `images/dishes/.gitkeep`
- Modify: `css/common.css` (append)

- [ ] **Step 1: Create the asset directory**

```bash
mkdir -p "images/dishes" && touch "images/dishes/.gitkeep"
```

- [ ] **Step 2: Append image styles to `css/common.css`**

Append at end of file:

```css
/* Dish photography */
.food-hero { margin: 0 0 16px; }
.food-figure { margin: 14px 0 6px; }
.food-hero img,
.food-figure img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
}
```

- [ ] **Step 3: Commit**

```bash
git add images/dishes/.gitkeep css/common.css
git commit -m "feat: add images/dishes dir + dish photo styles"
```

---

## Task 2: Source, verify, and optimize the 16 dish photos

This is an interactive task. Repeat the procedure below for **each** of the 16 dishes in the reference table. Use the Playwright MCP browser for discovery and visual verification.

**Files:**
- Create: `images/dishes/<slug>.jpg` (×16)

- [ ] **Step 1 (per dish): Find candidates on Pexels**

Navigate the browser to `https://www.pexels.com/search/<search term>/` (URL-encode spaces as `%20`). Take a screenshot (JPEG) and **look at it**. Confirm a candidate photo clearly shows the correct dish. If none match (e.g., generic results), try the alternate search term in the table, or a closely-related accurate term. If still no good match, record the dish as "needs user input" and skip its download (do NOT ship a wrong-dish photo).

- [ ] **Step 2 (per dish): Extract the chosen photo URL**

In the browser, run an evaluate to list candidate image URLs:

```js
() => Array.from(document.querySelectorAll('img'))
  .filter(i => /images\.pexels\.com\/photos\//.test(i.src))
  .slice(0, 12)
  .map(i => i.src)
```

Pick the URL matching the verified photo. Strip its query string and request a 1200px-wide version: `https://images.pexels.com/photos/<id>/...jpeg?auto=compress&cs=tinysrgb&w=1200`.

- [ ] **Step 3 (per dish): Download + crop to uniform 1000×667 JPEG**

```bash
curl -s -L --max-time 30 -o "/tmp/<slug>-src.jpg" "<1200px url>"
# center-crop to 1000x667 (no distortion); source from Pexels at w=1200 is always >=1000 wide
sips -c 667 1000 "/tmp/<slug>-src.jpg" --out "images/dishes/<slug>.jpg" >/dev/null
sips -s format jpeg -s formatOptions 72 "images/dishes/<slug>.jpg" --out "images/dishes/<slug>.jpg" >/dev/null
ls -la "images/dishes/<slug>.jpg"
```

Expected: file exists, < ~150 KB.

- [ ] **Step 4 (per dish): Confirm dimensions**

```bash
sips -g pixelWidth -g pixelHeight "images/dishes/<slug>.jpg"
```

Expected: `pixelWidth: 1000`, `pixelHeight: 667`.

- [ ] **Step 5: Verify the full set, then commit**

```bash
ls images/dishes/*.jpg | wc -l        # expect 16 (or fewer if any flagged for user)
du -sh images/dishes                  # sanity-check total weight (~1-2 MB)
git add images/dishes
git commit -m "feat: add 16 verified Filipino dish photos (Pexels, optimized)"
```

If any dish was flagged "needs user input", note it in the commit body and stop to report before continuing.

---

## Task 3: Add hero images to the 16 result pages (TDD)

**Files:**
- Modify: `tests/example.spec.ts` (append test)
- Modify: `results/*.html` (×16)

- [ ] **Step 1: Write the failing test**

Append to `tests/example.spec.ts`:

```typescript
test('every result page shows its dish hero photo', async ({ page }) => {
  for (const type of MBTI_TYPES) {
    await page.goto(`/results/${type}.html`);
    const img = page.locator('figure.food-hero img');
    await expect(img, `${type}: hero image present`).toHaveCount(1);
    await expect(img).toHaveAttribute('alt', /\w{8,}/); // non-trivial alt text
    const loaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(loaded, `${type}: hero image actually loads`).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npm test`
Expected: the new test FAILS (no `figure.food-hero img` exists yet); the other tests still pass.

- [ ] **Step 3: Insert the hero figure into each result page**

For each result page, insert this snippet **immediately after** its `<h1 class="food-name">…</h1>` line (anchor text per page is in the reference table), substituting `<slug>` and `<alt text>` for that dish:

```html
            <figure class="food-hero">
                <img src="../images/dishes/<slug>.jpg" width="1000" height="667" alt="<alt text>" loading="eager" decoding="async">
            </figure>
```

(If a dish was flagged "needs user input" in Task 2, skip its `<img>` and adjust the test's `MBTI_TYPES` loop to exclude it until the photo is supplied.)

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test`
Expected: all tests PASS (including JSON-LD and smoke tests).

- [ ] **Step 5: Commit**

```bash
git add tests/example.spec.ts results/*.html
git commit -m "feat: add dish hero photos to all 16 result pages + test"
```

---

## Task 4: Add dish images to the food guide (TDD)

**Files:**
- Modify: `tests/example.spec.ts` (append test)
- Modify: `food-guide.html`

- [ ] **Step 1: Write the failing test**

Append to `tests/example.spec.ts`:

```typescript
test('food guide shows all 16 dish photos', async ({ page }) => {
  await page.goto('/food-guide.html');
  const imgs = page.locator('figure.food-figure img');
  await expect(imgs).toHaveCount(16);
  const count = await imgs.count();
  for (let i = 0; i < count; i++) {
    const loaded = await imgs.nth(i).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(loaded, `food-guide image #${i + 1} loads`).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npm test`
Expected: new test FAILS (0 `figure.food-figure img` found).

- [ ] **Step 3: Insert a figure after each dish `<h2>` in `food-guide.html`**

For each dish section, insert immediately **after** its `<h2 id="<food-guide id>">…</h2>` line, substituting `<slug>` and `<alt text>` (map the food-guide id → slug via the reference table; e.g. `karekare-title`→`kare-kare`, `barako-title`→`kapeng-barako`, `bukopie-title`→`buko-pie`, `crispypata-title`→`crispy-pata`, `halohalo-title`→`halo-halo`, `pancitcanton-title`→`pancit-canton`):

```html
                        <figure class="food-figure">
                            <img src="images/dishes/<slug>.jpg" width="1000" height="667" alt="<alt text>" loading="lazy" decoding="async">
                        </figure>
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/example.spec.ts food-guide.html
git commit -m "feat: add dish photos to the food guide + test"
```

---

## Task 5: Align canonicals + sitemap to clean URLs

`vercel.json` has `cleanUrls: true`, so `*.html` 308-redirects to extensionless URLs. Canonicals and the sitemap should point at the served (clean) URL.

**Files:**
- Modify: `*.html`, `blog/*.html`, `results/*.html` (canonical + og:url)
- Modify: `sitemap.xml`

- [ ] **Step 1: Inventory current canonical/og:url with `.html`**

```bash
rg -n '<link rel="canonical"|og:url' -g '*.html' -g '!backup/**' | rg '\.html"' | head -60
rg -c '\.html</loc>' sitemap.xml
```

Expected: a list of pages whose canonical/og:url end in `.html`, and a count of `.html` sitemap entries.

- [ ] **Step 2: Strip `.html` from canonical + og:url across pages**

For every content/trust page (NOT the utility pages `result.html`, `loading.html`, `404.html`, `privacy-policy.html`), rewrite the canonical and `og:url` values to drop the trailing `.html`. Keep the leading path and `index.html`→`/` rules consistent:
- `https://pinoyfoodtest.com/about.html` → `https://pinoyfoodtest.com/about`
- `https://pinoyfoodtest.com/results/intj.html` → `https://pinoyfoodtest.com/results/intj`
- `https://pinoyfoodtest.com/index.html` (or home) → `https://pinoyfoodtest.com/`

Use a guarded sed pass, then spot-check:

```bash
for f in $(rg -l '<link rel="canonical"' -g '*.html' -g '!backup/**' | rg -v 'result\.html|loading\.html|404\.html|privacy-policy\.html'); do
  sed -i '' -E 's#(<link rel="canonical" href="https://pinoyfoodtest\.com/[^"]*)\.html"#\1"#g; s#(property="og:url" content="https://pinoyfoodtest\.com/[^"]*)\.html"#\1"#g' "$f"
done
rg -n '<link rel="canonical"|og:url' results/intj.html about.html blog/history-of-sinigang.html
```

Expected: canonicals/og:url now end without `.html` (e.g. `…/results/intj`, `…/about`).

- [ ] **Step 3: Strip `.html` from `sitemap.xml` content URLs**

```bash
sed -i '' -E 's#(<loc>https://pinoyfoodtest\.com/[^<]*)\.html</loc>#\1</loc>#g' sitemap.xml
rg -n '\.html</loc>' sitemap.xml || echo "clean: no .html in sitemap"
rg -n '<loc>https://pinoyfoodtest.com/</loc>|results/intj<' sitemap.xml | head
```

Expected: no `.html` remains in sitemap `<loc>` entries.

- [ ] **Step 4: Verify nothing broke**

```bash
npm test
```

Expected: all tests PASS (internal links still use `.html` and 308-redirect fine; only canonical/sitemap changed).

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "seo: align canonical + sitemap URLs to cleanUrls (drop .html)"
```

---

## Task 6: Final verification, deploy, and live check

**Files:** none (verification + deploy)

- [ ] **Step 1: Full local verification**

```bash
npm test                                   # all green
du -sh images/dishes                       # reasonable total weight
node - <<'EOF'
const fs = require('fs');
const { execSync } = require('child_process');
const files = execSync("find . -name '*.html' -not -path './node_modules/*' -not -path './backup/*'").toString().trim().split('\n');
const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
let bad = 0;
for (const f of files) { const h = fs.readFileSync(f, 'utf8'); let m; while ((m = re.exec(h))) { try { JSON.parse(m[1].trim()); } catch (e) { bad++; console.log('BAD', f); } } }
console.log('malformed JSON-LD:', bad);
EOF
```

Expected: tests pass, JSON-LD malformed count = 0.

- [ ] **Step 2: Push to deploy**

```bash
git push origin main
```

- [ ] **Step 3: Confirm Vercel deploy is Ready**

```bash
npx vercel ls --yes 2>&1 | sed -n '5,6p'
```

Expected: latest Production deployment `● Ready`.

- [ ] **Step 4: Live image spot-check**

```bash
for u in "/results/intj" "/results/istj" "/food-guide"; do
  body=$(curl -sL "https://pinoyfoodtest.com$u")
  echo "$u images: $(echo "$body" | grep -c 'images/dishes/')"
done
curl -s -o /dev/null -w "adobo.jpg: %{http_code}\n" "https://pinoyfoodtest.com/images/dishes/adobo.jpg"
```

Expected: result pages reference 1 dish image, food-guide references 16, and the image returns HTTP 200.

- [ ] **Step 5: Report readiness**

Summarize: images added + verified accurate, tests passing, canonical/sitemap aligned, deployed and live. Note any dishes flagged "needs user input".

---

## Phase 2 (deferred — separate plan after Phase 1 ships)

Blog post hero images (15 posts) and a homepage hero/feature image, using the same source→verify→optimize→embed pipeline. Plan this only after Phase 1 is deployed and verified.
