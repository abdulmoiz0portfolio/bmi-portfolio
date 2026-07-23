const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://bminternational.com.pk';
const BLOG_DIR = path.join(__dirname, '..', 'content', 'articles');
const OUT_DIR = path.join(__dirname, '..', 'articles');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const ROOT_DIR = path.join(__dirname, '..');
const ARTICLES_PER_PAGE = 5;

// Create output and template directories if they don't exist
if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper to parse YAML front matter and Markdown body
function parseFrontMatter(fileContent) {
    const matches = fileContent.match(/^---([\s\S]*?)---([\s\S]*)$/);
    if (!matches) {
        return { metadata: {}, body: fileContent };
    }
    const yamlBlock = matches[1];
    const body = matches[2];
    const metadata = {};
    
    yamlBlock.split('\n').forEach(line => {
        const sepIndex = line.indexOf(':');
        if (sepIndex === -1) return;
        const key = line.slice(0, sepIndex).trim();
        let value = line.slice(sepIndex + 1).trim();
        
        // Parse array format e.g. ["import from China", "sourcing"]
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
        } else {
            // Strip enclosing quotes if present
            value = value.replace(/^['"]|['"]$/g, '');
        }
        metadata[key] = value;
    });
    
    return { metadata, body };
}

// Helper to convert Markdown syntax to clean semantic HTML
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Headers (h3, h2, h1)
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    
    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');
    
    // Bold / Strong
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic / Emphasis
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links [Text](URL)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Line breaks and paragraphs / lists
    const lines = html.split('\n');
    const parsedLines = [];
    let inList = false;
    
    for (let line of lines) {
        const trimmed = line.trim();
        
        // Unordered lists
        const listMatch = line.match(/^[-*]\s+(.*)$/);
        if (listMatch) {
            if (!inList) {
                parsedLines.push('<ul>');
                inList = true;
            }
            parsedLines.push(`<li>${listMatch[1]}</li>`);
            continue;
        } else {
            if (inList) {
                parsedLines.push('</ul>');
                inList = false;
            }
        }
        
        // Empty line
        if (!trimmed) {
            continue;
        }
        
        // If the line is already an HTML tag, don't wrap it in <p>
        if (trimmed.startsWith('<') && (trimmed.endsWith('>') || trimmed.includes('</'))) {
            parsedLines.push(trimmed);
        } else {
            parsedLines.push(`<p>${trimmed}</p>`);
        }
    }
    
    if (inList) {
        parsedLines.push('</ul>');
    }
    
    return parsedLines.join('\n');
}

// Generate a slug from a title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with hyphens
        .replace(/-+/g, '-')          // replace multiple hyphens
        .replace(/^-+|-+$/g, '');     // trim leading/trailing hyphens
}

// Main Generation function
function generate() {
    console.log('Starting blog generation...');
    
    // 1. Read templates
    const blogTemplatePath = path.join(TEMPLATES_DIR, 'blog-template.html');
    const listTemplatePath = path.join(TEMPLATES_DIR, 'list-template.html');
    
    if (!fs.existsSync(blogTemplatePath) || !fs.existsSync(listTemplatePath)) {
        console.error('Templates are missing. Please verify blog-template.html and list-template.html.');
        process.exit(1);
    }
    
    const blogTemplate = fs.readFileSync(blogTemplatePath, 'utf8');
    const listTemplate = fs.readFileSync(listTemplatePath, 'utf8');
    
    // 2. Read and parse articles
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true });
        console.log(`Created content directory: ${BLOG_DIR}. Add markdown files here.`);
        return;
    }
    
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    const articles = [];
    
    files.forEach(file => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { metadata, body } = parseFrontMatter(fileContent);
        
        const slug = metadata.slug || generateSlug(path.basename(file, '.md'));
        
        articles.push({
            filename: file,
            metadata: {
                ...metadata,
                slug,
                seoTitle: metadata.seoTitle || metadata.title,
                publishedDate: metadata.publishedDate || new Date().toISOString().split('T')[0],
                updatedDate: metadata.updatedDate || metadata.publishedDate || new Date().toISOString().split('T')[0],
                author: metadata.author || 'BM International Team',
                description: metadata.description || 'Expert textile sourcing and garment manufacturing insights.',
                featuredImage: metadata.featuredImage || 'images/logo.png',
                keywords: metadata.keywords || [],
                related: metadata.related || []
            },
            body: body
        });
    });
    
    // Sort articles by publication date (descending)
    articles.sort((a, b) => new Date(b.metadata.publishedDate) - new Date(a.metadata.publishedDate));
    
    console.log(`Found ${articles.length} articles.`);
    
    // 3. Generate individual article pages
    articles.forEach(article => {
        const meta = article.metadata;
        const htmlContent = markdownToHtml(article.body);
        const articleSlug = meta.slug;
        const articleDir = path.join(OUT_DIR, articleSlug);
        
        if (!fs.existsSync(articleDir)) {
            fs.mkdirSync(articleDir, { recursive: true });
        }
        
        // Canonical URL
        const canonicalUrl = `${SITE_URL}/articles/${articleSlug}`;
        
        // Build JSON-LD structured data (Article + Breadcrumbs)
        const schemas = [
            {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": meta.seoTitle,
                "description": meta.description,
                "image": [
                    `${SITE_URL}/${meta.featuredImage}`
                ],
                "datePublished": meta.publishedDate,
                "dateModified": meta.updatedDate,
                "author": {
                    "@type": "Person",
                    "name": meta.author,
                    "url": `${SITE_URL}/`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "BM International",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${SITE_URL}/images/logo.png`
                    }
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${SITE_URL}/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Articles",
                        "item": `${SITE_URL}/articles/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": meta.title,
                        "item": canonicalUrl
                    }
                ]
            }
        ];
        
        // Tags HTML
        const tagsHtml = meta.keywords.map(kw => `<span class="blog-tag">${kw}</span>`).join('\n');
        
        // Related Articles HTML
        let relatedHtml = '';
        const relatedSlugs = meta.related;
        let relatedArticles = articles.filter(a => relatedSlugs.includes(a.metadata.slug));
        
        // If not enough related specified, backfill with newest articles
        if (relatedArticles.length < 3) {
            const extraArticles = articles.filter(a => a.metadata.slug !== articleSlug && !relatedArticles.some(r => r.metadata.slug === a.metadata.slug));
            relatedArticles = [...relatedArticles, ...extraArticles].slice(0, 3);
        }
        
        relatedArticles.forEach(rel => {
            const rMeta = rel.metadata;
            const excerpt = rMeta.description.length > 120 ? rMeta.description.substring(0, 117) + '...' : rMeta.description;
            relatedHtml += `
            <div class="article-card">
                <a href="../../articles/${rMeta.slug}/" class="card-img-link">
                    <img class="card-img" src="../../${rMeta.featuredImage}" alt="${rMeta.title}" loading="lazy">
                </a>
                <div class="card-body">
                    <span class="card-date">${rMeta.publishedDate}</span>
                    <h3 class="card-title"><a href="../../articles/${rMeta.slug}/">${rMeta.title}</a></h3>
                    <p class="card-excerpt">${excerpt}</p>
                    <a href="../../articles/${rMeta.slug}/" class="card-readmore">Read Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>`;
        });
        
        // Compile template
        let pageHtml = blogTemplate
            .replace(/{{ROOT_PATH}}/g, '../../')
            .replace(/{{SEO_TITLE}}/g, meta.seoTitle)
            .replace(/{{TITLE}}/g, meta.title)
            .replace(/{{META_DESCRIPTION}}/g, meta.description)
            .replace(/{{KEYWORDS}}/g, meta.keywords.join(', '))
            .replace(/{{CANONICAL_URL}}/g, canonicalUrl)
            .replace(/{{FEATURED_IMAGE}}/g, meta.featuredImage)
            .replace(/{{PUBLISHED_DATE}}/g, meta.publishedDate)
            .replace(/{{UPDATED_DATE}}/g, meta.updatedDate)
            .replace(/{{AUTHOR}}/g, meta.author)
            .replace(/{{CONTENT}}/g, htmlContent)
            .replace(/{{TAGS_HTML}}/g, tagsHtml)
            .replace(/{{RELATED_ARTICLES}}/g, relatedHtml)
            .replace(/{{JSON_LD_SCHEMA}}/g, JSON.stringify(schemas, null, 2));
            
        fs.writeFileSync(path.join(articleDir, 'index.html'), pageHtml);
        console.log(`Generated article: /articles/${articleSlug}`);
    });
    
    // 4. Generate Listing pages (with pagination)
    const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
    
    for (let page = 1; page <= totalPages; page++) {
        const startIdx = (page - 1) * ARTICLES_PER_PAGE;
        const pageArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);
        
        // Render Articles Grid HTML
        let gridHtml = '';
        if (pageArticles.length === 0) {
            gridHtml = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No articles published yet.</p>';
        } else {
            pageArticles.forEach(art => {
                const meta = art.metadata;
                const rootPath = page === 1 ? '../' : '../../../';
                const excerpt = meta.description.length > 140 ? meta.description.substring(0, 137) + '...' : meta.description;
                gridHtml += `
                <div class="article-card">
                    <a href="${rootPath}articles/${meta.slug}/" class="card-img-link">
                        <img class="card-img" src="${rootPath}${meta.featuredImage}" alt="${meta.title}" loading="lazy">
                    </a>
                    <div class="card-body">
                        <span class="card-date">${meta.publishedDate}</span>
                        <h2 class="card-title"><a href="${rootPath}articles/${meta.slug}/">${meta.title}</a></h2>
                        <p class="card-excerpt">${excerpt}</p>
                        <a href="${rootPath}articles/${meta.slug}/" class="card-readmore">Read Article <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>`;
            });
        }
        
        // Render Pagination Controls
        let paginationHtml = '';
        const rootPath = page === 1 ? '../' : '../../../';
        
        // Prev button
        if (page === 1) {
            paginationHtml += `<span class="pagination-btn disabled"><i class="fas fa-chevron-left" style="margin-right: 5px;"></i> Prev</span>`;
        } else {
            const prevUrl = page === 2 ? `${rootPath}articles/` : `${rootPath}articles/page/${page - 1}/`;
            paginationHtml += `<a href="${prevUrl}" class="pagination-btn"><i class="fas fa-chevron-left" style="margin-right: 5px;"></i> Prev</a>`;
        }
        
        // Page info
        paginationHtml += `<span class="pagination-info">Page ${page} of ${totalPages}</span>`;
        
        // Next button
        if (page === totalPages) {
            paginationHtml += `<span class="pagination-btn disabled">Next <i class="fas fa-chevron-right" style="margin-left: 5px;"></i></span>`;
        } else {
            const nextUrl = `${rootPath}articles/page/${page + 1}/`;
            paginationHtml += `<a href="${nextUrl}" class="pagination-btn">Next <i class="fas fa-chevron-right" style="margin-left: 5px;"></i></a>`;
        }
        
        // Page Title & Meta
        const pageTitle = page === 1 
            ? 'BM International Articles | Sourcing & Garment Manufacturing Sourcing Blog' 
            : `Articles Page ${page} | Sourcing & Garment Manufacturing Blog`;
        const pageDesc = 'Read our expert articles and guides on apparel sourcing, factory auditing, customs clearance, private label clothing, and shipping from Pakistan.';
        const canonicalUrl = page === 1 ? `${SITE_URL}/articles/` : `${SITE_URL}/articles/page/${page}/`;
        
        let listHtml = listTemplate
            .replace(/{{ROOT_PATH}}/g, rootPath)
            .replace(/{{SEO_TITLE}}/g, pageTitle)
            .replace(/{{META_DESCRIPTION}}/g, pageDesc)
            .replace(/{{KEYWORDS}}/g, 'Pakistan textile exporter, garment manufacturer, apparel sourcing, textile sourcing company, blog, articles')
            .replace(/{{CANONICAL_URL}}/g, canonicalUrl)
            .replace(/{{ARTICLES_GRID}}/g, gridHtml)
            .replace(/{{PAGINATION_HTML}}/g, paginationHtml);
            
        // Write file
        if (page === 1) {
            fs.writeFileSync(path.join(OUT_DIR, 'index.html'), listHtml);
            console.log('Generated index listing: /articles/index.html');
        } else {
            const pageDir = path.join(OUT_DIR, 'page', String(page));
            if (!fs.existsSync(pageDir)) {
                fs.mkdirSync(pageDir, { recursive: true });
            }
            fs.writeFileSync(path.join(pageDir, 'index.html'), listHtml);
            console.log(`Generated page ${page} listing: /articles/page/${page}/index.html`);
        }
    }
    
    // 5. Generate sitemap.xml dynamically
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/articles/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

    articles.forEach(art => {
        sitemapXml += `  <url>
    <loc>${SITE_URL}/articles/${art.metadata.slug}/</loc>
    <lastmod>${art.metadata.updatedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
    
    sitemapXml += '</urlset>\n';
    fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml);
    console.log('Generated/Updated sitemap.xml');
    
    // 6. Generate/Update robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Allow: /articles/

Sitemap: ${SITE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt);
    console.log('Generated/Updated robots.txt');
    
    console.log('Blog generation successfully completed!');
}

generate();
