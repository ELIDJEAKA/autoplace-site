import { useEffect } from 'react';

const SUFFIX = 'AutoEburni';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Met à jour <title>, la meta description, le canonical et les balises de partage (Open Graph, Twitter)
 * pour la route courante. `noindex` demande à Google de ne pas référencer la page (ex. 404).
 */
export function usePageMeta(title: string, description: string, options: { noindex?: boolean } = {}) {
  const { noindex = false } = options;
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SUFFIX}` : SUFFIX;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const origin = new URL(canonical.href).origin;
      const url = `${origin}${window.location.pathname}`;
      canonical.href = url;
      setMeta('property', 'og:url', url);
    }

    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'max-image-preview:large');
  }, [title, description, noindex]);
}
