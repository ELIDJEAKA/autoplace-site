import { Icon, type IconName } from './Icon';

const BADGES: { icon: IconName; label: string; pos: string }[] = [
  { icon: 'car', label: 'Achat', pos: 'hero-art__badge--1' },
  { icon: 'key', label: 'Location', pos: 'hero-art__badge--2' },
  { icon: 'gear', label: 'Pièces', pos: 'hero-art__badge--3' },
  { icon: 'shield', label: 'Assurance', pos: 'hero-art__badge--4' },
  { icon: 'truck', label: 'Dépannage 24h/24', pos: 'hero-art__badge--5' },
  { icon: 'wrench', label: 'Entretien', pos: 'hero-art__badge--6' },
];

/** Illustration du héros : le repère AutoPlace entouré des services. Purement décorative. */
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="hero-art__orbit" />
      <span className="hero-art__orbit hero-art__orbit--inner" />
      <img className="hero-art__mark" src="/brand/mark.svg" alt="" width="200" height="200" />
      {BADGES.map((b) => (
        <span key={b.label} className={`hero-art__badge ${b.pos}`}>
          <Icon name={b.icon} size={18} /> {b.label}
        </span>
      ))}
    </div>
  );
}
