import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SosBlock } from '../components/SosBlock';
import { usePageMeta } from '../components/usePageMeta';
import { SERVICES } from '../data/content';

export function Services() {
  usePageMeta(
    'Nos services',
    "Véhicules d'occasion contrôlés, location, pièces et accessoires, assurance auto, dépannage 24h/24, entretien à domicile et historique du véhicule : découvrez les services AutoPlace.",
  );
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Services</p>
          <h1>Tout ce dont votre véhicule a besoin</h1>
          <p className="page-hero__lead">
            Sept services réunis dans une même application, avec des professionnels identifiés près de chez vous.
          </p>
          <nav className="chips" aria-label="Accès rapide aux services">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="chip">
                <Icon name={s.icon} size={16} /> {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`section service-detail ${i % 2 ? 'section--muted' : ''}`}
          aria-labelledby={`${s.id}-title`}
        >
          <div className={`container split ${i % 2 ? 'split--reverse' : ''}`}>
            <Reveal className="split__copy" variant="left">
              <p className="eyebrow">Service {String(i + 1).padStart(2, '0')}</p>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              <p>{s.intro}</p>
              <ul className="checks">
                {s.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={18} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="split__visual" variant="scale" delay={120}>
              {s.id === 'depannage' ? (
                <SosBlock headingLevel={3} />
              ) : (
                <div className="service-art" aria-hidden="true">
                  <span className="service-art__ring" />
                  <span className="service-art__icon">
                    <Icon name={s.icon} size={72} />
                  </span>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
