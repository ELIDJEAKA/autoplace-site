import { useEffect } from 'react';

const SUFFIX = 'AutoEburni';

/** Met à jour <title> et la meta description pour la route courante. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const origin = new URL(canonical.href).origin;
      canonical.href = `${origin}${window.location.pathname}`;
    }
  }, [title, description]);
}
