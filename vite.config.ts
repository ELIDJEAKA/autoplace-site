import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Routes publiques indexables (sitemap.xml). À tenir à jour avec src/App.tsx. */
const ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/services', priority: '0.9' },
  { path: '/vendeurs', priority: '0.8' },
  { path: '/a-propos', priority: '0.6' },
  { path: '/contact', priority: '0.7' },
  { path: '/mentions-legales', priority: '0.2' },
  { path: '/confidentialite', priority: '0.2' },
];

const DEFAULT_SITE_URL = 'http://45.90.161.191:3000';

/** Injecte l'URL du site dans index.html et génère robots.txt + sitemap.xml au build. */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  return {
    name: 'autoplace-seo-files',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', base);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = ROUTES.map(
        (r) =>
          `  <url>\n    <loc>${base}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`,
      ).join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  const siteUrl = env.VITE_SITE_URL || DEFAULT_SITE_URL;
  return {
    plugins: [react(), seoFiles(siteUrl)],
    server: { port: 5174 },
  };
});
