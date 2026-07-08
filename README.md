<div align="center">

# Precious Nwaoha — Personal Portfolio & Blog

**Senior Fullstack Product & AI Engineer · Indie Hacker · [@takaraqode](https://x.com/takaraqode)**

[![Live Site](https://img.shields.io/badge/Live%20Site-preciousn.me-fb839e?style=for-the-badge&logo=github)](https://preciousn.me)
[![Blog](https://img.shields.io/badge/Blog-/blog-2eb1ed?style=for-the-badge)](https://preciousn.me/blog)
[![X](https://img.shields.io/badge/@takaraqode-000000?style=for-the-badge&logo=x)](https://x.com/takaraqode)

> Built with **zero frontend frameworks** — pure HTML, CSS & vanilla JS.  
> The constraint was intentional. The result is faster than most React portfolios.

</div>

---

## Demo

<!-- Replace the URL below with your uploaded release asset after creating the v1.0.0 release -->
<video src="https://github.com/preciousnwaoha/preciousnwaoha.github.io/releases/download/v1.0.0/portfolio-demo.mp4" controls width="100%" style="border-radius:8px"></video>

> If the video doesn't render, [watch it here](https://github.com/preciousnwaoha/preciousnwaoha.github.io/releases/tag/v1.0.0).

---

## About Me

I'm **Precious Nwaoha** (known online as **Takara**) — a Senior Fullstack Product & AI Engineer who ships. I build products end-to-end across web, mobile, desktop, and AI — and I've done it solo.

| Stat | |
|---|---|
| **6+ years** shipping production software |
| **4× global hackathon winner** | Blockchain Hub Africa, Polygon Africa, Bunzz BHA |
| **$5k+ solo revenue** | From AI SaaS products built independently |
| **900+ active monthly users** | Across all solo projects |
| **2× AI SaaS Founder** | Velin AI · HumanJobHunter |
| **Founding Engineer (AI)** | Pharmora — #1 Healthcare app in West Africa |
| **Founder Member** | NSK.AI — 1,300+ member student AI community |

### Flagship Products
| Product | Description | Status |
|---|---|---|
| [**Velin AI**](https://velinai.live) | Undetectable real-time AI for live meetings & interviews. Desktop + Web, C++ core | `$455 MRR · 400+ users` |
| [**HumanJobHunter**](https://humanjobhunter.com) | Hire real job-hunting experts to apply to 400+ jobs for you | `$300 MRR` |
| [**Pharmora**](https://pharmora.ng) | AI-powered healthcare delivery. Built AI subscription features with LLM pipelines | `#1 West Africa` |
| [**Inkspiff**](https://github.com/preciousnwaoha) | AI dev tool that documents any codebase in 60 seconds | `$7k generated` |

---

## Technical Architecture

### Why No Framework?

This site is built with **zero build tooling, zero npm dependencies at runtime, zero component frameworks**. The only runtime is the browser. This was a deliberate choice — not a limitation.

The result:
- **Instant first paint** — no JS bundle to parse before render
- **Fully static** — deploys to any CDN or GitHub Pages with zero config
- **Total control** — every pixel, every animation, every interaction is hand-written

### Design System

The site implements a full **neumorphic design system** built entirely in CSS custom properties. Dark mode, light mode, and 5 swappable skin colors are all handled by a single CSS variable (`--skin-color`) with no class toggling.

```css
/* One variable. Five themes. Zero JS repaints. */
:root { --skin-color: #fb839e; }
body.dark { --bg-black-50: #1d1d1d; --outer-shadow: 3px 3px 3px #111216, ... }
```

Shadows use a dual-layer neumorphic system (`--outer-shadow` / `--inner-shadow`) that inverts cleanly between themes. Hover states trigger a shadow inversion effect purely through CSS `::after` pseudo-elements.

### Content Architecture

All dynamic content is **JSON-driven** with no CMS or database:

```
utils/
  projects.json    — portfolio projects (badge, categories, featured flag)
  skills.json      — 106 skills with category + tab taxonomy
  experience.json  — work history with bullet points
  contact.json     — contact info (single source of truth)
  socials.json     — social links (rendered everywhere from one file)
  videos.json      — YouTube videos (featured flag, short/long distinction)
```

The portfolio popup, skill pill grid, contact cards, social icons, and video cards all render from these files at runtime. Update one JSON file — everything updates.

### Blog Build System

The blog is a **custom static site generator** (`app/js/build-blog.mjs`) with no third-party SSG:

```
blog/posts/*.md  →  [build-blog.mjs]  →  blog/{slug}/index.html
                                       →  blog/index.html
                                       →  sitemap.xml (with lastmod)
                                       →  index.html (posts injected via marker comments)
```

Posts are written in **Markdown with YAML frontmatter** (`title`, `description`, `date`, `tags`, `slug`, `readtime`, `featured`). The build script:
- Parses frontmatter with `gray-matter`
- Renders Markdown to HTML with `markdown-it`
- Generates individual post pages from an HTML template
- **Injects the posts list directly into `index.html`** at build time using marker comment replacement — no client-side JSON fetch needed
- Generates a valid `sitemap.xml` with per-post `<lastmod>` dates
- Writes SEO meta: canonical URLs, Open Graph, Twitter Cards, JSON-LD Article schema

Marking a post as `featured: true` in frontmatter promotes it to the featured card on the portfolio homepage automatically on next build.

### Skills Taxonomy

Skills are stored as a flat list with per-skill metadata:

```json
{ "name": "LangGraph", "color": "#8a49ff", "category": "Languages & Frameworks", "tabs": ["all", "ai"] }
```

The frontend filters by `tabs` and groups by `category` at render time — no duplication in the data, full flexibility in the UI.

### SEO

- `robots.txt` → Sitemap reference
- `sitemap.xml` → All pages with `<lastmod>` dates (auto-generated from post frontmatter)
- `index.html` → `<meta description>`, canonical, Open Graph, Twitter Card, JSON-LD `Person` schema
- Blog posts → `<meta description>`, canonical, OG/Twitter per post, JSON-LD `Article` schema

---

## Stack

| Layer | Tech |
|---|---|
| **Frontend** | Vanilla HTML5, CSS3 (Custom Properties), Vanilla JS (ES6+) |
| **Styling** | Hand-written CSS · Neumorphic design system · No preprocessor at runtime |
| **Blog** | Custom Node.js SSG · gray-matter · markdown-it |
| **Hosting** | GitHub Pages |
| **No:** | React, Vue, Angular, Webpack, Vite, Tailwind, Bootstrap, jQuery |

---

## Project Structure

```
├── index.html              # Single-page app (SPA) — all sections
├── dist/
│   ├── styles.css          # Full design system (~2900 lines)
│   ├── responsive.css      # Breakpoints
│   ├── skins/              # 5 swappable accent color themes
│   └── font-awesome.css    # Self-hosted icons
├── app/
│   ├── js/
│   │   ├── script.js       # All SPA logic, JSON loaders, popup system
│   │   ├── build-blog.mjs  # Blog SSG (Node.js, runs at build time)
│   │   └── style-switcher.js
│   └── scss/               # Source SCSS (dist/styles.css is the working file)
├── blog/
│   ├── posts/              # Markdown source files
│   ├── templates/          # HTML templates for SSG
│   └── {slug}/index.html   # Generated post pages
├── utils/
│   ├── projects.json
│   ├── skills.json         # 106 skills · 3 categories · 6 tab groups
│   ├── experience.json
│   ├── socials.json
│   ├── contact.json
│   └── videos.json
└── img/                    # Portfolio thumbnails, profile photo
```

---

## Running Locally

```bash
# Serve locally (any static server works)
python3 -m http.server 8080
# or
npx serve .

# After writing/editing blog posts
node app/js/build-blog.mjs
```

No `npm install` needed to run the site. The blog build script requires `gray-matter` and `markdown-it`:

```bash
npm install   # only needed for blog builds
node app/js/build-blog.mjs
```

---

## Writing a Blog Post

1. Create `blog/posts/your-post-title.md`
2. Add frontmatter:
```yaml
---
title: Your Post Title
description: One-sentence summary for SEO and previews.
date: 2026-05-05
tags:
  - ai
  - engineering
slug: your-post-title
readtime: 5
featured: true   # optional — promotes to featured card on homepage
---
```
3. Write in Markdown
4. Run `node app/js/build-blog.mjs`
5. Commit everything including the generated `blog/{slug}/index.html` and updated `index.html`

---

<div align="center">

**[preciousn.me](https://preciousn.me)** · [Blog](https://preciousn.me/blog) · [Velin AI](https://velinai.live) · [X](https://x.com/takaraqode) · [LinkedIn](https://linkedin.com/in/preciousnwaoha04)

*Built with HTML, CSS & JS — because constraints breed creativity.*

</div>
