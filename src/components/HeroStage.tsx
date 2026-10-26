import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion } from '../anim/useScrollPast';
import { Icon } from './Icon';
import { PhoneMockup } from './PhoneMockup';

type Mode = '3d' | 'lite' | 'fallback';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Choix de rendu : 3D seulement sur écran ≥ 768 px, animations autorisées et WebGL disponible. */
function pickMode(): Mode {
  if (typeof window === 'undefined' || window.innerWidth < 768 || prefersReducedMotion() || !hasWebGL()) {
    return 'fallback';
  }
  const cores = navigator.hardwareConcurrency || 4;
  return cores <= 4 ? 'lite' : '3d';
}

/** Illustration statique (repli) : une route qui se trace jusqu'au repère AutoEburni. */
function HeroRoad() {
  const d = 'M-6 98 C 18 90, 26 74, 42 66 S 66 46, 74 34 S 84 20, 86 15';
  return (
    <div className="hero-road" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <path className="hero-road__base" pathLength={1} d={d} />
        <path className="hero-road__center" d={d} />
      </svg>
      <span className="hero-road__pin">
        <span className="hero-road__ring" />
        <span className="hero-road__ring hero-road__ring--late" />
        <img src="/brand/mark-dark.svg" alt="" width="72" height="72" />
      </span>
    </div>
  );
}

/** Visuel du héros : téléphone flottant + scène 3D chargée à la demande (ou illustration SVG de repli). */
export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [mode] = useState<Mode>(pickMode);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const use3d = mode !== 'fallback' && !failed;

  useEffect(() => {
    if (mode === 'fallback') return;
    const el = stage.current;
    if (!el) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      import('./HeroScene3D')
        .then(({ mountHeroScene }) => {
          const target = host.current;
          if (cancelled || !target) return;
          dispose = mountHeroScene(target, { lite: mode === 'lite', onReady: () => setReady(true) });
        })
        .catch(() => !cancelled && setFailed(true));
    });
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      dispose?.();
    };
  }, [mode]);

  return (
    <div
      ref={stage}
      className={`hero-stage enter ${use3d ? 'hero-stage--3d' : ''} ${ready ? 'is-ready' : ''}`}
      style={{ '--d': '380ms' } as CSSProperties}
    >
      {use3d ? <div className="hero-stage__canvas" ref={host} aria-hidden="true" /> : <HeroRoad />}
      <div className="hero-stage__phone">
        <PhoneMockup screens={['accueil', 'recherche', 'vehicule', 'piece']} priority />
      </div>
      <span className="hero-chip hero-chip--a" aria-hidden="true">
        <Icon name="badge" size={16} /> Vendeurs vérifiés
      </span>
      <span className="hero-chip hero-chip--b" aria-hidden="true">
        <Icon name="truck" size={16} /> Dépannage 24h/24
      </span>
    </div>
  );
}
