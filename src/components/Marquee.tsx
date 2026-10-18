import { useRef } from 'react';
import { MOTION_OK, useGsap, type GsapApi } from '../anim/useGsap';

const WORDS = ['Achat', 'Location', 'Pièces', 'Assurance', 'Dépannage 24h/24', 'Entretien'];

function setup({ gsap, ScrollTrigger, mm, root }: GsapApi) {
  mm.add(MOTION_OK, () => {
    const track = root.querySelector<HTMLElement>('.marquee__track');
    if (!track) return;
    const loop = gsap.to(track, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 });
    // Accélère brièvement selon la vitesse de défilement, puis revient au rythme de croisière.
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 400);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: () => {
          gsap.to(loop, { timeScale: 1, duration: 0.9, ease: 'power2.out' });
        } });
      },
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
    });
    return () => st.kill();
  });
}

/** Bandeau défilant (décoratif) des mots-clés de services. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(ref, setup);
  const group = (copy: number) => (
    <ul className="marquee__group" key={copy}>
      {[...WORDS, ...WORDS].map((w, i) => (
        <li key={`${copy}-${i}`}>
          {w}
          <span className="marquee__dot" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <div className="marquee__track">{[0, 1].map(group)}</div>
    </div>
  );
}
