```js id="0x6bqa"
// scripts/generate-search-index.mjs
// Run: node scripts/generate-search-index.mjs
// Requires: npm i gray-matter markdown-it

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const ROOT = process.cwd();

// Adjust if your folders differ:
const POSTS_DIR = path.join(ROOT, "blog", "posts");
const OUTPUT_DIR = path.join(ROOT, "blog");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "search-index.json");

const SITE_URL = "https://yourdomain.com";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
});

function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDate(input = "") {
  if (!input) return "";
  const str = String(input).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str;

  return d.toISOString().slice(0, 10);
}

function stripHtml(html = "") {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text = "", max = 220) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  return clean.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

async function main() {
  const files = (await fs.readdir(POSTS_DIR)).filter((file) =>
    file.toLowerCase().endsWith(".md")
  );

  const items = [];

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");

    const parsed = matter(raw);
    const data = parsed.data || {};
    const content = parsed.content || "";

    const title =
      data.title ||
      file.replace(/\.md$/i, "").replace(/-/g, " ");

    const slug = data.slug || slugify(title);

    const html = md.render(content);
    const plain = stripHtml(html);

    const item = {
      title,
      slug,
      url: `/blog/${slug}/`,
      absoluteUrl: `${SITE_URL}/blog/${slug}/`,
      description: data.description || "",
      excerpt: excerpt(plain, 220),
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: normalizeDate(data.date || ""),
      updated: normalizeDate(data.updated || data.date || ""),
      cover: data.cover || "",
      searchText: [
        title,
        data.description || "",
        plain,
        ...(Array.isArray(data.tags) ? data.tags : []),
      ]
        .join(" ")
        .toLowerCase(),
    };

    items.push(item);
  }

  // newest first
  items.sort((a, b) => {
    const aDate = a.updated || a.date || "";
    const bDate = b.updated || b.date || "";
    return bDate.localeCompare(aDate);
  });

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(items, null, 2),
    "utf8"
  );

  console.log(`Generated ${items.length} posts → blog/search-index.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
