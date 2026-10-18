import { useEffect, type RefObject } from 'react';

type GsapModule = typeof import('./gsap');
export type GsapApi = {
  gsap: GsapModule['gsap'];
  ScrollTrigger: GsapModule['ScrollTrigger'];
  /** gsap.matchMedia() portée par l'élément racine (révoquée au démontage). */
  mm: ReturnType<GsapModule['gsap']['matchMedia']>;
  root: HTMLElement;
};

/** Requête « animations autorisées » utilisable avec gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Charge GSAP + ScrollTrigger à la demande (chunk séparé) puis exécute `setup` dans un gsap.context
 * limité à `scope`. Tout est annulé au démontage. Sans GSAP (chargement impossible), le contenu reste
 * simplement visible : aucun état initial masqué n'est posé avant l'exécution de `setup`.
 * `setup` doit être stable (fonction définie au niveau du module).
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (api: GsapApi) => void) {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let timer: number | undefined;
    import('./gsap')
      .then(({ gsap, ScrollTrigger }) => {
        const root = scope.current;
        if (cancelled || !root) return;
        const mm = gsap.matchMedia(root);
        const ctx = gsap.context(() => setup({ gsap, ScrollTrigger, mm, root }), root);
        // Recalcule les positions une fois la transition de page et les polices terminées.
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 450);
        cleanup = () => {
          mm.revert();
          ctx.revert();
        };
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [scope, setup]);
}
