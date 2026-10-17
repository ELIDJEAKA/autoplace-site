import { SOS_NUMBERS } from '../data/content';
import { Icon } from './Icon';

export function SosBlock({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <aside className="sos" aria-labelledby="sos-title">
      <div className="sos__head">
        <Icon name="alert" size={28} />
        <div>
          <H id="sos-title">Urgence sur la route ?</H>
          <p>En cas de blessé ou de danger, appelez immédiatement les secours. Ces numéros sont gratuits.</p>
        </div>
      </div>
      <ul className="sos__list">
        {SOS_NUMBERS.map((n) => (
          <li key={n.number}>
            <a href={`tel:${n.number}`} className="sos__call">
              <span className="sos__num">{n.number}</span>
              <span>
                <strong>{n.label}</strong>
                <small>{n.desc}</small>
              </span>
              <Icon name="phone" size={20} />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
