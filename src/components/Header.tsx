import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrollPast } from '../anim/useScrollPast';
import { config } from '../config';
import { Icon } from './Icon';

const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/services', label: 'Services' },
  { to: '/vendeurs', label: 'Vendeurs' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

type Indicator = { x: number; w: number; on: boolean; ready: boolean };

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrolled = useScrollPast(12);
  const links = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<Indicator>({ x: 0, w: 0, on: false, ready: false });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open]);

  // Soulignement actif glissant (bureau) : mesure du lien actif à chaque navigation et redimensionnement.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = links.current;
      const active = wrap?.querySelector<HTMLElement>('a.active');
      if (!wrap || !active || active.offsetWidth === 0) {
        setInd((s) => ({ ...s, on: false }));
        return;
      }
      setInd((s) => ({ x: active.offsetLeft + 12, w: active.offsetWidth - 24, on: true, ready: s.ready || s.on }));
    };
    measure();
    void document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pathname]);

  const indStyle = { '--x': `${ind.x}px`, '--w': ind.w } as CSSProperties;

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="AutoEburni, retour à l'accueil">
          <img src="/brand/logo-dark.svg" alt="AutoEburni" width="140" height="48" />
        </Link>

        <button
          type="button"
          className={`burger ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="burger__lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <div className="main-nav__links" ref={links}>
            <ul>
              {NAV.map((n, i) => (
                <li key={n.to} style={{ '--i': i } as CSSProperties}>
                  <NavLink to={n.to} end={n.end}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span
              className={`nav-ind ${ind.on ? 'is-on' : ''} ${ind.ready ? 'is-ready' : ''}`}
              style={indStyle}
              aria-hidden="true"
            />
          </div>
          <div className="main-nav__actions" style={{ '--i': NAV.length } as CSSProperties}>
            <Link to="/services#depannage" className="sos-link">
              <Icon name="alert" size={18} /> SOS 24h/24
            </Link>
            <a className="btn btn--signal btn--sm" href={config.dashboardLogin}>
              Espace vendeur
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
