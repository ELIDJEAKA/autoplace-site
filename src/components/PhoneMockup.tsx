import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../anim/useScrollPast';
import { APP_SCREENS, type AppScreenName } from '../data/appScreens';

const CYCLE_MS = 3800;

type Props = {
  /** Captures réelles à afficher ; plusieurs = défilement automatique (en pause hors écran). */
  screens: AppScreenName[];
  /** Image prioritaire (héros) : chargement immédiat. Sinon chargement différé. */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Cadre de téléphone neutre (bordure, coins arrondis, encoche) autour de captures réelles de
 * l'application. Avec plusieurs écrans, fondu enchaîné toutes les ~4 s tant que le cadre est visible ;
 * écran fixe si l'utilisateur préfère réduire les animations.
 */
export function PhoneMockup({ screens, priority = false, sizes = '(min-width: 768px) 260px, 66vw', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ index, prev }, setView] = useState({ index: 0, prev: -1 });
  const count = screens.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2 || prefersReducedMotion()) return;
    let visible = false;
    let timer: number | undefined;
    const tick = () => setView((v) => ({ prev: v.index, index: (v.index + 1) % count }));
    const sync = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (visible && !document.hidden) timer = window.setInterval(tick, CYCLE_MS);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.clearInterval(timer);
    };
  }, [count]);

  return (
    <div className={`phone ${className}`.trim()} ref={ref}>
      <div className="phone__notch" aria-hidden="true" />
      <div className="phone__screen">
        {screens.map((name, i) => {
          const s = APP_SCREENS[name];
          const active = i === index;
          return (
            <img
              key={name}
              className={`phone__shot ${active ? 'is-active' : ''} ${i === prev ? 'is-leaving' : ''}`}
              src={s.src}
              srcSet={s.srcSet}
              sizes={sizes}
              width={s.width}
              height={s.height}
              alt={s.alt}
              aria-hidden={active ? undefined : true}
              loading={priority && i === 0 ? 'eager' : 'lazy'}
              {...(priority && i === 0 ? { fetchpriority: 'high' } : {})}
              decoding="async"
            />
          );
        })}
      </div>
    </div>
  );
}
