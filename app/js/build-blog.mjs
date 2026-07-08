// scripts/build-blog.mjs
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const ROOT = process.cwd();

const SITE_URL = "https://preciousn.me";
const SITE_NAME = "Precious Nwaoha";
const BLOG_DESCRIPTION = "Writing about AI engineering, SaaS, fullstack development and indie hacking — from real production experience.";

const BLOG_DIR = path.join(ROOT, "blog");
const POSTS_DIR = path.join(BLOG_DIR, "posts");
const TEMPLATE_DIR = path.join(BLOG_DIR, "templates");

const POST_TEMPLATE_PATH = path.join(TEMPLATE_DIR, "post.html");
const INDEX_TEMPLATE_PATH = path.join(TEMPLATE_DIR, "index.html");

const OUT_BLOG_INDEX  = path.join(BLOG_DIR, "index.html");
const OUT_SITEMAP     = path.join(ROOT, "sitemap.xml");
const PORT_INDEX_PATH = path.join(ROOT, "index.html");
const VIDEOS_DIR      = path.join(ROOT, "videos");
const OUT_VIDEOS_INDEX = path.join(VIDEOS_DIR, "index.html");

// Tag → display color for the portfolio posts section
const TAG_COLORS = {
  ai: "#fb839e", llm: "#8a49ff", "prompt-engineering": "#fb839e",
  rag: "#8a49ff", engineering: "#fb839e", saas: "#ec9412",
  "indie-hacker": "#ec9412", "lifecycle-emails": "#ec9412", growth: "#ec9412",
  retention: "#ec9412", product: "#1fc586", "open-source": "#1fc586",
  workflow: "#2eb1ed", web: "#2eb1ed", seo: "#2eb1ed", claude: "#fb839e",
  backend: "#cc3a3b", fastapi: "#1fc586", pipeline: "#8a49ff",
  streaming: "#2eb1ed", contribute: "#1fc586",
};
function tagColor(tag) { return TAG_COLORS[tag] || "#8a49ff"; }
function tagLabel(tag) { return tag.replace(/-/g, " "); }

const md = new MarkdownIt({
  html: true,      // allows raw HTML like iframes
  linkify: true,
  breaks: true,
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value = "") {
  return escapeHtml(value);
}

function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDateIso(input) {
  if (!input) return "";
  const str = String(input).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str;

  return d.toISOString().slice(0, 10);
}

function formatDisplayDate(input) {
  const iso = normalizeDateIso(input);
  if (!iso) return "";

  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

function renderTemplate(template, replacements) {
  let out = template;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.replaceAll(`{{${key}}}`, value ?? "");
  }
  return out;
}

function youtubeIdFromUrl(url) {
  if (!url) return null;

  const str = String(url).trim();

  // youtu.be/VIDEO_ID
  let m = str.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (m) return m[1];

  // youtube.com/watch?v=VIDEO_ID
  m = str.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (m) return m[1];

  // youtube.com/embed/VIDEO_ID
  m = str.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/);
  if (m) return m[1];

  // already just the id
  if (/^[A-Za-z0-9_-]{6,}$/.test(str)) return str;

  return null;
}

function renderYouTubeEmbeds(video) {
  if (!video) return "";

  const items = Array.isArray(video) ? video : [video];
  const embeds = items
    .map((item) => {
      const id = youtubeIdFromUrl(item);
      if (!id) return "";

      return `
<div class="video-embed">
  <iframe
    width="100%"
    height="315"
    src="https://www.youtube.com/embed/${id}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>`.trim();
    })
    .filter(Boolean);

  return embeds.join("\n");
}

function renderTags(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return "";

  return `
<div class="post-tags">
  ${tags
    .map(
      (tag) => `<span class="tag">#${escapeHtml(tag)}</span>`
    )
    .join("\n  ")}
</div>`.trim();
}

function renderPostPage({
  title,
  description,
  date,
  updated,
  slug,
  tags,
  cover,
  contentHtml,
  video,
  readtime,
}, template) {
  const canonical = `${SITE_URL}/blog/${slug}/`;
  const dateIso = normalizeDateIso(date);
  const updatedIso = normalizeDateIso(updated || date);
  const dateDisplay = formatDisplayDate(date);
  const updatedDisplay =
    updated && updated !== date
      ? formatDisplayDate(updated)
      : "";

  const ogImageTag = cover
    ? `<meta property="og:image" content="${escapeAttr(SITE_URL + cover)}" />`
    : "";

  const twitterImageTag = cover
    ? `<meta name="twitter:image" content="${escapeAttr(SITE_URL + cover)}" />`
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || "",
    datePublished: dateIso || "",
    dateModified: updatedIso || dateIso || "",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };

  if (cover) jsonLd.image = `${SITE_URL}${cover}`;
  if (Array.isArray(tags) && tags.length) jsonLd.keywords = tags;

  const postCoverHtml = cover
    ? `
<div class="post-cover">
  <img src="${escapeAttr(cover)}" alt="${escapeAttr(title)} cover image" />
</div>`.trim()
    : "";

  const videoHtml = renderYouTubeEmbeds(video);
  const tagsHtml = renderTags(tags);

  const content = renderTemplate(template, {
    SITE_NAME: escapeHtml(SITE_NAME),
    TITLE: escapeHtml(title),
    DESCRIPTION: escapeAttr(description || ""),
    CANONICAL: escapeAttr(canonical),
    OG_IMAGE_TAG: ogImageTag,
    TWITTER_IMAGE_TAG: twitterImageTag,
    JSON_LD: escapeHtml(JSON.stringify(jsonLd, null, 2)),
    DATE_ISO: escapeAttr(dateIso),
    DATE_DISPLAY: escapeHtml(dateDisplay),
    UPDATED_DISPLAY: updatedDisplay
      ? ` · Updated ${escapeHtml(updatedDisplay)}`
      : "",
    TAGS_HTML: tagsHtml,
    COVER_HTML: postCoverHtml,
    VIDEO_HTML: videoHtml,
    CONTENT: contentHtml,
    READTIME_DISPLAY: readtime
      ? `<span class="post-meta-sep">·</span><i class="fas fa-clock"></i><span>${readtime} min read</span>`
      : "",
    SLUG: escapeAttr(slug),
    BLOG_URL: `${SITE_URL}/blog/`,
    HOME_URL: SITE_URL,
  });

  return content;
}

function renderIndexCard(post) {
  const tagHtml = Array.isArray(post.tags) && post.tags.length
    ? `<div class="card-tags">${post.tags
        .slice(0, 4)
        .map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`)
        .join(" ")}</div>`
    : "";

  const coverHtml = post.cover
    ? `<a class="card-cover" href="/blog/${post.slug}/"><img src="${escapeAttr(post.cover)}" alt="${escapeAttr(post.title)} cover" /></a>`
    : "";

  return `
<article class="post-card">
  ${coverHtml}
  <div class="card-body">
    <p class="card-date">${escapeHtml(formatDisplayDate(post.date))}</p>
    <h2 class="card-title"><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h2>
    <p class="card-description">${escapeHtml(post.description || "")}</p>
    ${tagHtml}
  </div>
</article>`.trim();
}

async function main() {
  const [postTemplate, indexTemplate] = await Promise.all([
    fs.readFile(POST_TEMPLATE_PATH, "utf8"),
    fs.readFile(INDEX_TEMPLATE_PATH, "utf8"),
  ]);

  const files = (await fs.readdir(POSTS_DIR)).filter((file) =>
    file.toLowerCase().endsWith(".md")
  );

  const posts = [];

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);

    const title       = parsed.data.title       || file.replace(/\.md$/i, "");
    const slug        = parsed.data.slug        || slugify(title);
    const description = parsed.data.description || "";
    const date        = parsed.data.date        || "";
    const updated     = parsed.data.updated     || "";
    const tags        = Array.isArray(parsed.data.tags) ? parsed.data.tags : [];
    const cover       = parsed.data.cover       || "";
    const video       = parsed.data.video       || "";
    const readtime    = parsed.data.readtime     || "";
    const featured    = parsed.data.featured    === true;

    const contentHtml = md.render(parsed.content);

    const html = renderPostPage(
      { title, description, date, updated, slug, tags, cover, contentHtml, video, readtime },
      postTemplate
    );

    const outDir = path.join(BLOG_DIR, slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");

    posts.push({ title, slug, description, date, updated, tags, cover, readtime, featured });
  }

  posts.sort((a, b) => {
    const aDate = normalizeDateIso(a.updated || a.date || "");
    const bDate = normalizeDateIso(b.updated || b.date || "");
    return bDate.localeCompare(aDate);
  });

  const postsHtml = posts.length
    ? posts.map(renderIndexCard).join("\n")
    : `<p class="empty-state">No posts yet.</p>`;

  const indexHtml = renderTemplate(indexTemplate, {
    SITE_NAME: escapeHtml(SITE_NAME),
    BLOG_DESCRIPTION: escapeHtml(BLOG_DESCRIPTION),
    POSTS_HTML: postsHtml,
    HOME_URL: SITE_URL,
    BLOG_URL: `${SITE_URL}/blog/`,
  });

  await fs.writeFile(OUT_BLOG_INDEX, indexHtml, "utf8");

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  function sitemapUrl(loc, lastmod) {
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
  }

  const sitemapEntries = [
    sitemapUrl(`${SITE_URL}/`,        today),
    sitemapUrl(`${SITE_URL}/blog/`,   today),
    ...posts.map(post => {
      const lastmod = normalizeDateIso(post.updated || post.date || today).slice(0, 10) || today;
      return sitemapUrl(`${SITE_URL}/blog/${post.slug}/`, lastmod);
    }),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>
`;

  await fs.writeFile(OUT_SITEMAP, sitemapXml, "utf8");

  // ---- Inject posts into portfolio index.html ----
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const restPosts    = posts.filter(p => p !== featuredPost);

  // Collect unique tags for the filter bar
  const allTags = [...new Set(posts.flatMap(p => p.tags))];

  function portTagBtn(tag, active) {
    const col = tagColor(tag);
    const style = active ? `style="background:${col};color:#fff"` : "";
    return `<button class="post-tag-btn${active ? " active" : ""}" data-tag="${tag}" ${style}>${tagLabel(tag)}</button>`;
  }

  const tagsHtml = `<button class="post-tag-btn active" data-tag="all" style="background:var(--skin-color);color:#fff">All</button>`
    + allTags.map(t => portTagBtn(t, false)).join("");

  function portFeaturedCard(post) {
    const tag  = post.tags[0] || "";
    const col  = tagColor(tag);
    const read = post.readtime ? `<span class="post-meta-dot">·</span><span class="post-read">${post.readtime} min read</span>` : "";
    const badge = tag ? `<span class="post-tag-badge" style="color:${col};background:${col}1a">${tagLabel(tag)}</span>` : "";
    return `<a href="/blog/${escapeAttr(post.slug)}/" class="feat-post-card" id="featured-post">
  <div class="feat-post-label">Featured Post <span class="feat-post-label-line"></span></div>
  <div class="feat-post-meta">
    <span class="post-date">${escapeHtml(String(post.date))}</span>${read}${badge}
  </div>
  <span class="feat-post-title">${escapeHtml(post.title)}</span>
  <p class="feat-post-excerpt">${escapeHtml(post.description)}</p>
  <span class="feat-post-read-more">Read post <i class="fas fa-arrow-right" style="font-size:10px"></i></span>
</a>`;
  }

  function portPostItem(post) {
    const tag  = post.tags[0] || "";
    const col  = tagColor(tag);
    const read = post.readtime ? `<span class="post-meta-dot">·</span><span class="post-read">${post.readtime} min read</span>` : "";
    const badge = tag ? `<span class="post-tag-badge" style="color:${col};background:${col}12">${tagLabel(tag)}</span>` : "";
    return `<div class="post-item" data-tag="${tag}">
  <div class="post-meta"><span class="post-date">${escapeHtml(String(post.date))}</span>${read}${badge}</div>
  <a href="/blog/${escapeAttr(post.slug)}/" class="post-title">${escapeHtml(post.title)}</a>
  <p class="post-excerpt">${escapeHtml(post.description)}</p>
</div>`;
  }

  const portPostsHtml = portFeaturedCard(featuredPost) + restPosts.map(portPostItem).join("\n");

  let portHtml = await fs.readFile(PORT_INDEX_PATH, "utf8");
  portHtml = portHtml
    .replace(/<!-- BLOG_TAGS_START -->[\s\S]*?<!-- BLOG_TAGS_END -->/,
      `<!-- BLOG_TAGS_START -->${tagsHtml}<!-- BLOG_TAGS_END -->`)
    .replace(/<!-- BLOG_POSTS_START -->[\s\S]*?<!-- BLOG_POSTS_END -->/,
      `<!-- BLOG_POSTS_START -->${portPostsHtml}<!-- BLOG_POSTS_END -->`);
  await fs.writeFile(PORT_INDEX_PATH, portHtml, "utf8");

  console.log(`Built ${posts.length} posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});