import { useId, useState } from 'react';
import { Icon } from './Icon';

export type FaqItem = { q: string; a: string };

/** Accordéon : hauteur animée en CSS (grid-template-rows), panneau fermé masqué (visibility) aux lecteurs d'écran. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <Icon name="chevron" className="faq__chev" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="faq__panel">
              <div className="faq__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
