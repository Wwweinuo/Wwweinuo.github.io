# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev         # Start VitePress dev server (localhost)
npm run build       # Build static site to docs/.vitepress/dist/
npm run preview     # Preview built site locally
```

## Project Architecture

VitePress-based personal blog deployed on GitHub Pages.

### Key Directories

```
docs/
├── .vitepress/
│   ├── config.mts              # Site config (nav, theme, search, social links)
│   └── theme/
│       ├── index.ts            # Theme entry — registers custom components, layout slots
│       ├── style.css           # Global CSS vars (emerald brand), page layouts, responsive
│       └── components/
│           ├── HomePage.vue    # Landing page: avatar, random quote, latest 5 posts
│           ├── BackToTop.vue   # Scroll-to-top button (transition, throttled scroll)
│           └── Tabs.vue        # Reusable tab component (a11y, keyboard nav, sliding indicator)
├── blog/
│   ├── posts.data.ts           # Loads all blog posts, sorts by date desc
│   ├── index.md                # Blog list page — renders all posts
│   └── YYYY/                   # Posts organized by year folders
├── archives/index.md           # Posts grouped by year (client-side grouping)
├── tags/index.md               # Tag cloud + per-tag post lists
├── friends/index.md            # Friend links (inline data in component)
├── about/index.md              # About page (static markdown)
├── index.md                    # Home page — renders <HomePage /> component
└── public/                     # Static assets (avatars/, etc.)
```

### Custom Theme

- **Brand color**: Emerald green (`#059669`) — defined in CSS vars with dark mode variants
- **Layout**: Extends VitePress `DefaultTheme`, injects `BackToTop` into `layout-bottom` slot
- **Global components**: `HomePage`, `Tabs` registered in `enhanceApp`
- **Pages**: Home (`index.md`) uses `layout: page` frontmatter to render the `<HomePage>` component directly; all other pages use default VitePress layout

### Color Scheme

- Light mode: white bg, `#2c3e50` text
- Dark mode: `#1a1a1a` bg, `#e5e7eb` text
- Brand uses `--vp-c-brand-1/2/3` and `--vp-c-brand-soft` throughout

### Blog Posts

- Written in Markdown with YAML frontmatter: `title`, `date`, `tags`, `summary`
- Stored in `docs/blog/YYYY/` by year
- `posts.data.ts` uses VitePress `createContentLoader` to glob all `blog/**/*.md`, extracts frontmatter, sorts by date descending
- Tags and Archives pages consume the same data source at build time

### Deployment

- GitHub Actions workflow (`.github/workflows/deploy.yml`) on push to `master`
- Builds with `npm ci` → `npm run build` → uploads `docs/.vitepress/dist/`
- Deploys via `actions/deploy-pages` to GitHub Pages

## Post Creation

Add a `.md` file under `docs/blog/YYYY/` with frontmatter:

```yaml
---
title: Post Title
date: 2026-07-03
tags: [Tag1, Tag2]
summary: Brief summary shown on blog list and home page.
---
```

The post auto-appears on Blog, Archives, Tags pages, and homepage's "最新文章" list after build.
