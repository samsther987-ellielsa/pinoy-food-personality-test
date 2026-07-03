# Content-Value Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Reposition the site from "entertainment quiz" toward a genuine Filipino food & culture resource by adding real, functional recipe content (the strongest legitimate "added value" signal for AdSense), an honest editorial identity, and surfacing that content prominently — to address the recurring "low value content" AdSense rejection.

**Architecture:** Static HTML/CSS/vanilla JS, no build. New `recipes/` section of genuinely useful recipe pages (ingredients + step-by-step + tips + `schema.org/Recipe` JSON-LD), reusing the existing `images/dishes/*.jpg` photos. Homepage gains a Recipes feature section + a stronger value statement (bilingual via the existing `indexText`/`toggleLang` pattern). About page gains an honest editorial-standards statement (NO fabricated person). Nav/footer/sitemap updated site-wide. Playwright tests guard it.

**Tech Stack:** HTML5/CSS3/vanilla JS, Playwright, Vercel git-push deploy.

**Honest caveat (recorded):** Structural + functional-content improvements raise approval odds but do not guarantee approval; the user cannot supply human-original E-E-A-T (real author/first-hand photos) right now, which is the strongest lever. Recipes are chosen because they carry concrete utility regardless of authorship.

**Recipe set (6 home-cookable, iconic, already have photos):** `adobo`, `sinigang`, `kare-kare`, `lumpia`, `pancit-canton`, `champorado`.

---

## Task 1: Recipe page shell + shared CSS

**Files:**
- Create: `recipes/adobo.html` (first, as the shell template)
- Modify: `css/common.css` (append recipe styles)

- [ ] **Step 1: Copy an existing page shell**

Open `blog/history-of-sinigang.html` and reuse its exact `<head>` boilerplate (GTM, meta, canonical/og pattern, fonts, `../css/common.css`, GA/AdSense head scripts), `<nav class="site-nav">`, `<div class="top-bar">`, `<footer class="site-footer">`, and closing `<script src="../js/common.js">` block. These become the recipe page shell. Recipe pages live in `recipes/` so use `../` relative paths (same depth as `blog/` and `results/`).

- [ ] **Step 2: Append recipe styles to `css/common.css`**

```css
/* Recipe pages */
.recipe-meta { display: flex; flex-wrap: wrap; gap: 14px; margin: 16px 0; font-size: 0.9rem; }
.recipe-meta span { background: var(--card-bg, #fff); border: 1px solid var(--border, #eee); border-radius: 999px; padding: 6px 14px; }
.recipe-cols { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; align-items: start; }
@media (max-width: 600px) { .recipe-cols { grid-template-columns: 1fr; } }
.recipe-ingredients ul { padding-left: 18px; }
.recipe-ingredients li { margin: 6px 0; }
.recipe-steps ol { padding-left: 20px; }
.recipe-steps li { margin: 12px 0; line-height: 1.6; }
.recipe-tip { background: var(--card-bg, #fff8e6); border-left: 4px solid var(--primary, #e63946); padding: 12px 16px; border-radius: 8px; margin: 16px 0; }
```

- [ ] **Step 3: Commit**

```bash
git add css/common.css
git commit -m "feat: add recipe page styles"
```

---

## Task 2: Write the 6 recipe pages

**Files:**
- Create: `recipes/adobo.html`, `recipes/sinigang.html`, `recipes/kare-kare.html`, `recipes/lumpia.html`, `recipes/pancit-canton.html`, `recipes/champorado.html`

Each page uses the Task 1 shell plus this body structure (example shown for Adobo — write accurate, standard recipes for each dish; do NOT invent nonstandard steps):

- [ ] **Step 1: Build `recipes/adobo.html` body**

```html
<div class="container">
  <article class="info-content legal-content">
    <h1>Filipino Chicken Adobo Recipe</h1>
    <figure class="food-hero"><img src="../images/dishes/adobo.jpg" width="1000" height="667" alt="Filipino chicken adobo braised in soy sauce and vinegar" loading="eager" decoding="async"></figure>
    <p><!-- 2-3 sentence intro: what adobo is, why it works, the vinegar+soy braise. --></p>
    <div class="recipe-meta">
      <span>⏱️ Prep: 10 min</span><span>🍳 Cook: 40 min</span><span>🍽️ Serves: 4</span><span>🇵🇭 Filipino</span>
    </div>
    <div class="recipe-cols">
      <section class="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li>1 kg chicken thighs and drumsticks</li>
          <li>1/2 cup soy sauce</li>
          <li>1/2 cup white or cane vinegar</li>
          <li>1 whole head garlic, crushed</li>
          <li>3 bay leaves</li>
          <li>1 tsp whole black peppercorns</li>
          <li>1 cup water</li>
          <li>2 tbsp cooking oil</li>
          <li>1 tbsp brown sugar (optional)</li>
        </ul>
      </section>
      <section class="recipe-steps">
        <h2>Instructions</h2>
        <ol>
          <li>Marinate the chicken in soy sauce and crushed garlic for 30 minutes.</li>
          <li>Heat oil in a pot and brown the marinated chicken on all sides. Set the marinade aside.</li>
          <li>Pour in the reserved marinade, vinegar, water, bay leaves, and peppercorns. Do not stir yet — let it come to a boil so the vinegar's sharpness cooks off.</li>
          <li>Lower the heat, cover, and simmer for 30–40 minutes until the chicken is tender.</li>
          <li>Uncover, add brown sugar if using, and reduce the sauce until slightly thick. Serve hot with steamed rice.</li>
        </ol>
      </section>
    </div>
    <div class="recipe-tip"><strong>Tip:</strong> Every Filipino family has its own adobo. Add a splash of coconut milk for <em>adobo sa gata</em>, or more vinegar for a sharper, Batangas-style bite.</div>
    <p><a href="../food-guide.html">← Back to the Filipino Food Guide</a></p>
  </article>
</div>
```

Add this `Recipe` JSON-LD in `<head>` (fill each page with its own data):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Filipino Chicken Adobo",
  "image": "https://pinoyfoodtest.com/images/dishes/adobo.jpg",
  "description": "Classic Filipino chicken adobo braised in soy sauce, vinegar, garlic, and bay leaves.",
  "recipeCuisine": "Filipino",
  "recipeCategory": "Main Course",
  "prepTime": "PT10M",
  "cookTime": "PT40M",
  "totalTime": "PT50M",
  "recipeYield": "4 servings",
  "author": { "@type": "Organization", "name": "Pinoy Food Personality Test" },
  "recipeIngredient": [
    "1 kg chicken thighs and drumsticks",
    "1/2 cup soy sauce",
    "1/2 cup vinegar",
    "1 head garlic, crushed",
    "3 bay leaves",
    "1 tsp whole black peppercorns",
    "1 cup water",
    "2 tbsp cooking oil"
  ],
  "recipeInstructions": [
    { "@type": "HowToStep", "text": "Marinate the chicken in soy sauce and garlic for 30 minutes." },
    { "@type": "HowToStep", "text": "Brown the chicken in oil; reserve the marinade." },
    { "@type": "HowToStep", "text": "Add marinade, vinegar, water, bay leaves, and peppercorns; boil without stirring." },
    { "@type": "HowToStep", "text": "Cover and simmer 30–40 minutes until tender." },
    { "@type": "HowToStep", "text": "Reduce the sauce until slightly thick and serve with rice." }
  ]
}
</script>
```

Set each page's `<title>`, meta description, canonical (`https://pinoyfoodtest.com/recipes/<slug>` — clean URL, no `.html`), and og tags accordingly.

- [ ] **Step 2: Write the remaining 5 pages** using the same structure with accurate standard recipes:
  - `sinigang` — pork sinigang, tamarind (sampalok) base, kangkong/radish/tomato/okra/string beans.
  - `kare-kare` — oxtail + peanut/annatto sauce, banana blossom, eggplant, string beans, bagoong on the side.
  - `lumpia` — lumpiang shanghai (ground pork, carrot, onion, wrappers, deep-fried) + sweet-chili dip.
  - `pancit-canton` — flour/egg noodles, pork/chicken, shrimp, cabbage, carrot, snap peas, soy, calamansi.
  - `champorado` — glutinous rice, cocoa/tablea, sugar, evaporated milk; note the classic tuyo pairing.

- [ ] **Step 3: Validate JSON-LD + commit**

```bash
node - <<'EOF'
const fs=require('fs');const files=fs.readdirSync('recipes').filter(f=>f.endsWith('.html'));
const re=/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;let bad=0;
for(const f of files){const h=fs.readFileSync('recipes/'+f,'utf8');let m;while((m=re.exec(h))){try{JSON.parse(m[1].trim())}catch(e){bad++;console.log('BAD',f,e.message)}}}
console.log('recipe files:',files.length,'malformed JSON-LD:',bad);
EOF
git add recipes css/common.css
git commit -m "feat: add 6 Filipino recipe pages with Recipe structured data"
```

---

## Task 3: Surface recipes on the homepage (bilingual)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add a "Cook It Yourself: Filipino Recipes" section**

Insert a new `.intro-section` after the Popular Results section (before the blog preview), with an id and a grid of 6 links to `recipes/<slug>.html`, each showing the dish photo + name. Give the heading/description `id`s (`recipes-title`, `recipes-desc`).

- [ ] **Step 2: Strengthen the value statement**

Update `#intro-desc` (and its `indexText.en/tl.introDesc`) to state the site is a Filipino food & culture resource — recipes, a food guide, and articles — with the personality quiz as one feature.

- [ ] **Step 3: Wire bilingual text**

Add `recipesTitle`/`recipesDesc` to BOTH `indexText.en` and `indexText.tl`, and add the corresponding `document.getElementById(...).innerText = t.recipesTitle` lines inside the overridden `toggleLang` function. Update `introDesc` in both languages.

- [ ] **Step 4: Verify locally**

```bash
npm test
```

Expected: existing tests still pass.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: feature recipes + stronger value statement on homepage"
```

---

## Task 4: Honest editorial identity on the About page

**Files:**
- Modify: `about.html`

- [ ] **Step 1: Add an "Our Editorial Approach" section**

Add a section stating, truthfully: the site's mission (celebrating Filipino food & culture), that recipes reflect standard traditional preparations, that dish descriptions draw on documented culinary history, and how to reach the team (link `contact.html`). Do NOT invent a named person or fake credentials. Keep tone honest and specific.

- [ ] **Step 2: Commit**

```bash
git add about.html
git commit -m "content: add honest editorial-approach section to About"
```

---

## Task 5: Site-wide nav/footer + sitemap + tests

**Files:**
- Modify: all `*.html` with `site-nav`/`site-footer`, `sitemap.xml`, `tests/example.spec.ts`

- [ ] **Step 1: Add "Recipes" to the main nav + footer site-wide**

Script the insertion of a `<a href="recipes.html">Recipes</a>` (path-adjusted `../recipes.html` inside `blog/`, `results/`, `recipes/`) into `.site-nav-links` and the footer nav, wherever "Blog" appears, across all content pages. Skip utility pages (`loading.html`, `result.html`, `404.html`).

- [ ] **Step 2: Create `recipes.html` index page**

A hub page (root level, mirrors blog.html shell) listing the 6 recipes with photo + name + one-line description, linking to each `recipes/<slug>.html`.

- [ ] **Step 3: Add recipe URLs to `sitemap.xml`**

Add clean-URL `<loc>` entries for `/recipes` and each `/recipes/<slug>`.

- [ ] **Step 4: Add a Playwright test**

```typescript
const RECIPES = ['adobo', 'sinigang', 'kare-kare', 'lumpia', 'pancit-canton', 'champorado'];

test('recipe pages have ingredients, steps, and valid Recipe JSON-LD', async ({ page }) => {
  for (const r of RECIPES) {
    await page.goto(`/recipes/${r}.html`);
    await expect(page.locator('.recipe-ingredients li').first()).toBeVisible();
    await expect(page.locator('.recipe-steps li').first()).toBeVisible();
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasRecipe = blocks.some((b) => { try { return JSON.parse(b)['@type'] === 'Recipe'; } catch { return false; } });
    expect(hasRecipe, `${r}: has Recipe JSON-LD`).toBe(true);
  }
});

test('recipes hub lists all recipes', async ({ page }) => {
  await page.goto('/recipes.html');
  await expect(page.locator('a[href*="recipes/"]')).toHaveCount(RECIPES.length);
});
```

- [ ] **Step 5: Run tests + commit**

```bash
npm test
git add -A
git commit -m "feat: recipes hub, site-wide nav link, sitemap + tests"
```

---

## Task 6: Final verification, deploy, live check

- [ ] **Step 1: Full verification** — `npm test` green; site-wide JSON-LD malformed = 0 (reuse the validator from the images plan).
- [ ] **Step 2: Deploy** — `git push origin main`.
- [ ] **Step 3: Confirm Vercel** — `npx vercel ls --yes | sed -n '5,6p'` shows `● Ready`.
- [ ] **Step 4: Live check** — `curl -sL https://pinoyfoodtest.com/recipes/adobo` references ingredients; `/recipes` hub loads; recipe image 200.
- [ ] **Step 5: Report** — summarize what shipped and restate the honest odds. Then advise: submit for re-review, and separately consider building some organic traffic before/after (Google favors sites with real usage).
