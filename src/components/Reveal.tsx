import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade';

type Props = { children: ReactNode; as?: ElementType; className?: string; delay?: number; variant?: RevealVariant };

/**
 * Apparition au défilement (IntersectionObserver + animation CSS). Le contenu reste dans l'arbre
 * d'accessibilité ; seule l'opacité est nulle avant l'apparition. Désactivée si l'utilisateur préfère
 * réduire les animations.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Révélé aussi s'il a été dépassé d'un coup (défilement rapide, ancre) : jamais de contenu laissé invisible.
        if (entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
