# AdSense Readiness Design

## Goal

Prepare Pinoy Food Personality Test for a stronger Google AdSense review by reducing monetization-risk signals, improving crawl clarity, and strengthening the site as an original content property.

This work cannot guarantee approval, because Google controls the review decision. The practical target is to remove the issues most likely to trigger "low value content", "no publisher content", poor navigation, or ad-heavy UX judgments.

## Source Criteria

The implementation follows Google's AdSense guidance that eligible sites should have original, high-quality content, clear navigation, and policy-compliant ad behavior. Google Publisher Policies also warn against Google-served ads on screens with low-value content, behavioral-only screens, or more promotional material than publisher content.

## Chosen Approach

Use the medium-scope cleanup:

- Remove third-party ad network scripts before resubmission.
- Keep AdSense implementation minimal and review-friendly.
- Normalize result URLs to the static `/results/{type}.html` structure.
- Keep transitional or thin pages out of indexable review surfaces.
- Improve internal trust signals: About, Contact, Privacy, Terms, Blog, Food Guide, and result pages.
- Add verification coverage for navigation, result routing, sitemap/robots, and core page availability.

This is preferred over a tiny ad-code-only fix because the prior rejection was content-quality oriented. It is also preferred over a full rebuild because the site already has a useful static architecture and a substantial content base.

## Non-Goals

- Do not redesign the whole brand or quiz UX.
- Do not add new ad networks.
- Do not make unsupported claims that AdSense approval is guaranteed.
- Do not introduce a framework or build step.
- Do not rewrite every blog article unless a specific quality issue is found.

## Architecture

The project remains a static HTML/CSS/vanilla JavaScript site.

Core flow remains:

`index.html -> quiz.html -> loading.html -> results/{mbti}.html`

AdSense readiness changes are limited to:

- HTML script blocks and ad containers in root pages, quiz page, loading page, and result pages.
- Shared result/link logic in `js/result.js`.
- Static crawl files: `sitemap.xml`, `robots.txt`, and possibly `404.html`.
- Focused content blocks on high-value pages if a page appears thin or repetitive.
- Playwright tests under `tests/` for review-critical paths.

## Page Policy

Indexable content pages:

- Home
- Quiz
- Food Guide
- Blog index and blog posts
- About
- Contact
- Privacy
- Terms
- Static result pages under `results/`

Non-indexable or non-monetized utility pages:

- `loading.html`
- legacy `result.html` redirect page
- `404.html`

These utility pages should not carry third-party ads and should not be presented to crawlers as primary content pages.

## Ad Policy

Before resubmission:

- Remove Ezoic, effectivecpmnetwork, highperformanceformat, and similar third-party ad scripts from review pages.
- Remove visible third-party ad containers from review pages.
- Keep only necessary Google AdSense site verification or Auto Ads script if the publisher account requires it.
- Avoid manual ad units until after approval unless a real AdSense ad slot exists and the page has substantial content before the ad.

## Content Policy

The site should read as a useful Filipino food and MBTI content site with an interactive quiz, not as a quiz shell built around ads.

Priority content improvements:

- Homepage: clear explanation of the quiz, Filipino food angle, and links to substantial resources.
- Food Guide: comprehensive overview of all 16 dishes and why each personality match exists.
- Result pages: static, unique visible content for each MBTI type, not JS-only result text.
- Blog index/posts: easy navigation to original articles.
- Trust pages: clear About, Contact, Privacy, and Terms links from main navigation/footer.

## Link And Crawl Policy

- All share links and internal links should point to `results/{type}.html`, not `result.html?mbti=TYPE`.
- `result.html` may remain only as a legacy redirect page and should be `noindex`.
- `loading.html` should be `noindex`.
- `sitemap.xml` should include only canonical content pages.
- `robots.txt` should allow important content pages and avoid promoting thin utility pages.

## Testing

Add or replace the default Playwright example with project-specific tests:

- Homepage loads and exposes main navigation.
- Quiz page loads and can answer questions far enough to reach loading/result flow where practical.
- Representative result page loads with static MBTI/food content.
- Important trust pages load: About, Contact, Privacy, Terms.
- No stale `/result.html?mbti=` links remain in core static pages/scripts except inside the legacy redirect page if needed.

## Acceptance Criteria

- No third-party ad network scripts remain on the main review surface.
- No visible third-party ad containers remain on the main review surface.
- AdSense script usage is minimal and intentional.
- Static result pages are the canonical result destination.
- Utility pages are noindex and excluded from sitemap.
- Navigation/footer paths work consistently.
- Playwright tests target this site rather than `playwright.dev`.
- A final checklist explains exactly what was changed and what remains for the owner before resubmitting to AdSense.
