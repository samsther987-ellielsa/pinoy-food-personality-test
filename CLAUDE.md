# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pinoy Food Personality Test — a static interactive web quiz that maps MBTI personality types to Filipino foods, with K-Pop/K-Drama character matches. Live at pinoyfoodtest.com.

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — no frameworks, no build step, no npm
- Bilingual: English (en) and Tagalog (tl), toggled client-side
- Light/Dark theme via CSS variables and `data-theme` attribute on `<body>`

## Local Development

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

The IDX environment uses `python3 -m http.server 80 --bind 0.0.0.0` (configured in `.idx/dev.nix`).

## Architecture

### Page Flow

```
index.html → quiz.html → loading.html → result.html?mbti=XXXX
```

- **quiz.html / quiz.js**: Presents 16 randomized questions (4 per MBTI dimension from a pool of 48). Scores are accumulated in a `{E,I,S,N,T,F,J,P}` object. Answers use a 4-point scale (+3/+1/-1/-3) with inversion support.
- **loading.html / loading.js**: 3-second animated transition. Calculates final MBTI type from scores, saves to localStorage, redirects to result page.
- **result.html / result.js**: Reads `?mbti=` param, displays matching food/emoji/description/K-star from `resultsData` object (16 entries). Handles social sharing (Facebook, Twitter, Instagram, TikTok, Messenger, clipboard).
- **meta-tags.js**: Injects per-MBTI Open Graph and Twitter Card meta tags dynamically for social sharing previews.
- **common.js**: Shared utilities — language toggle, theme toggle, UI text translations.

### Data Locations

- **Question bank**: `js/quiz.js` — `questionBank` object with `EI`, `SN`, `TF`, `JP` arrays
- **Result profiles**: `js/result.js` — `resultsData` keyed by MBTI code (food, emoji, descriptions, K-star matches, daily missions)
- **SEO meta data**: `js/meta-tags.js` — `mbtiMetaData` keyed by MBTI code
- **UI translations**: `js/common.js` — `uiText` object with `en`/`tl` keys

### Styling

Single stylesheet `css/common.css` handles all pages. CSS variables control theming. Breakpoints at 600px and 400px. Container max-width is 500px.

## External Services

- Google Analytics 4 (G-2SJWW8WS8Y) + GTM (GTM-5RJVV65C)
- Google AdSense (ca-pub-3390185075238000)
- Formspree (contact form backend)
- Userback (feedback widget)
- Mixkit (audio SFX hosting)
- Firebase Hosting (deployment)

## Conventions

- All content must support both English and Tagalog — any new user-facing text needs entries in both languages
- Audio files are lazy loaded (`preload="none"`) except the quiz click sound
- The sitemap.xml includes all 16 MBTI result URLs — update it when adding pages
