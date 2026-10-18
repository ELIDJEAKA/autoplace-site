import { useEffect, useRef } from 'react';
import { prefersReducedMotion, useScrollPast } from '../anim/useScrollPast';
import { Icon } from './Icon';

/** Barre de progression de lecture (décorative) + bouton « retour en haut ». */
export function ScrollUi() {
  const bar = useRef<HTMLDivElement>(null);
  const showTop = useScrollPast(640);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.current?.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.getElementById('contenu')?.focus({ preventScroll: true });
  };

  return (
    <>
      <div className="scroll-progress" ref={bar} aria-hidden="true" />
      <button
        type="button"
        className={`to-top ${showTop ? 'is-shown' : ''}`}
        onClick={toTop}
        aria-label="Revenir en haut de la page"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="arrow" size={20} className="to-top__icon" />
      </button>
    </>
  );
}
