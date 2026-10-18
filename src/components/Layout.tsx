import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollUi } from './ScrollUi';

/** Remonte en haut de page à chaque navigation, ou fait défiler jusqu'à l'ancre (#id). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  // Pas de transition au premier affichage (LCP) : seulement lors des navigations suivantes.
  const firstPath = useRef(pathname);
  const animate = pathname !== firstPath.current;
  if (animate) firstPath.current = '';

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <ScrollManager />
      <ScrollUi />
      <Header />
      <div className="header-spacer" aria-hidden="true" />
      <main id="contenu" tabIndex={-1}>
        <div key={pathname} className={animate ? 'page page--enter' : 'page'}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
