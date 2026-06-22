# AdSense Approval Boost — Real Food Photography + Polish

**Date:** 2026-06-22
**Goal:** Increase Google AdSense approval odds by closing the biggest remaining gap — the site is a *food* site with **zero images** (everything is emoji). Add real, licensed, accurate dish photography and a few technical polish items so the site reads as a finished, professional, valuable publisher site.

## Context / What's Already Done

The text content already addresses the historical "low value content" rejection reason:
- Strong About page with real author identity + E-E-A-T (`about.html`).
- 16 result pages (`results/*.html`) with unique per-type prose, food story, type explanation, Strengths/Growth, and a 4-question FAQ (~3,300+ words each).
- 15 blog posts (~2,700 words each), food guide, trust pages, clean robots/sitemap, valid structured data, `ads.txt` live, no third-party ad scripts.

This spec covers the remaining polish, **not** a content rewrite. No single change guarantees approval; this raises the overall quality signal.

## Non-Goals

- No text/content rewrites of existing pages.
- No redesign of layout, theme, or navigation.
- No change to quiz logic, scoring, or data model.
- No new third-party dependencies or build step (stays pure static HTML/CSS/JS).

## Sourcing Approach (decided)

- **Source:** Pexels. Browser-based (headless Playwright) — feasibility confirmed: Pexels search loads, photos are visible for accuracy verification, image URLs are extractable from `images.pexels.com/photos/...`, and downloads succeed via `curl`.
- **License:** Pexels License permits commercial use (incl. ad-monetized sites), no attribution required, modification allowed. Legally clean for AdSense.
- **Accuracy gate (critical):** For every dish, I screenshot the search results and **visually confirm the photo shows the correct Filipino dish** before using it. A mislabeled photo (wrong dish) is worse than none — reject generic/ambiguous/wrong images and pick another.

## Image Pipeline

1. Per dish: navigate Pexels search (e.g., "chicken adobo", "kare kare", "halo halo"), screenshot, visually verify, extract the photo URL.
2. Download at `?auto=compress&cs=tinysrgb&w=1200` via `curl`.
3. Optimize with `sips` (available): resize to ~1000px max width, re-compress (~quality 70), strip EXIF orientation issues. Keep JPEG (no `cwebp`/imagemagick available; optimized JPEG is acceptable).
4. Self-host in `images/dishes/<dish-slug>.jpg` (on-domain — reliable, AdSense-friendly). Target < ~150 KB each.

## Integration

- **Result pages (`results/*.html`):** add a responsive hero `<img>` for the dish directly under the `.food-name` heading (top of the first info-box area).
- **Food guide (`food-guide.html`):** add the same dish image to each dish's section (under its `<h2>`).
- **Markup standard for every image:**
  - explicit `width`/`height` attributes (prevent layout shift / CLS),
  - `loading="lazy"` (except the first above-the-fold image on a page) + `decoding="async"`,
  - descriptive English `alt` text per dish (e.g., `alt="Filipino chicken adobo with hard-boiled eggs served over rice"`) — SEO + accessibility + completeness signal. (Alt text stays English; the site's JS language toggle swaps body copy, not `alt` attributes — consistent with current behavior.)
  - constrained by CSS (`max-width:100%; height:auto; border-radius`) reusing existing style tokens.
- **Source of truth for the type→dish mapping:** `resultsData` in `js/result.js` and the dish sections in `food-guide.html`. The implementation plan enumerates all 16.

## Performance Guardrail

The About page promises sub-1-second loads on slow Philippine connections. Honor it:
- optimized + lazy-loaded images, explicit dimensions, one hero image above the fold per page.
- Verify total added weight per page is modest (target hero image < ~150 KB).

## Bundled Technical Polish

- Align `<link rel="canonical">` and `sitemap.xml` entries to the **clean URLs** (no `.html`), since `vercel.json` `cleanUrls:true` 308-redirects `*.html` → extensionless. Removes the canonical/redirect mismatch and reads as a "finished" site. (Pre-existing, minor, but cheap to fix.)

## Scope / Phasing

- **Phase 1 (core, highest impact):** 16 dish hero photos → 16 result pages + food-guide. Canonical/sitemap clean-URL alignment.
- **Phase 2 (follow-up):** blog post hero images (15) + a homepage hero/feature image.

Ship Phase 1 first; Phase 2 after Phase 1 is verified and deployed.

## Testing / Acceptance

Extend the existing Playwright suite (`tests/example.spec.ts`) and reuse the standalone JSON-LD validator:
- each of the 16 result pages has a dish `<img>` that loads (HTTP 200) and has non-empty, dish-specific `alt`;
- food-guide has 16 dish images;
- existing smoke + JSON-LD tests still pass;
- a check that hero images have explicit `width`/`height`;
- manual spot-check (screenshots) that each image shows the correct dish.

Acceptance: `npm test` green, every dish image visually verified accurate, page weight reasonable, then commit + push (auto-deploys via Vercel) and confirm live.

## Risks

- **Wrong-dish photos** — mitigated by the visual accuracy gate.
- **Bot-protection / flaky sourcing** — Pexels worked in the probe; if a specific dish has no good match, fall back to a closely-related accurate photo or flag it for the user.
- **Page-weight regression** — mitigated by `sips` optimization + lazy-load + the performance check.
