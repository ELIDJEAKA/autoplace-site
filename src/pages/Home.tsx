import { Link } from 'react-router-dom';
import { AppButtons } from '../components/AppButtons';
import { CtaBand } from '../components/CtaBand';
import { Faq } from '../components/Faq';
import { HeroArt } from '../components/HeroArt';
import { Icon, type IconName } from '../components/Icon';
import { PhoneMockup } from '../components/PhoneMockup';
import { Reveal } from '../components/Reveal';
import { usePageMeta } from '../components/usePageMeta';
import { config } from '../config';
import { CITIES, FAQ, SERVICES } from '../data/content';

const STEPS = [
  {
    icon: 'smartphone' as IconName,
    title: 'Inscrivez-vous par SMS',
    text: 'Téléchargez l’application et confirmez votre numéro avec le code reçu par SMS. Pas de mot de passe à retenir.',
  },
  {
    icon: 'search' as IconName,
    title: 'Trouvez près de chez vous',
    text: 'Véhicule, pièce, location ou dépanneur : filtrez, comparez et repérez les vendeurs sur la carte.',
  },
  {
    icon: 'cash' as IconName,
    title: 'Rencontrez et payez sur place',
    text: 'Contactez le vendeur, voyez le véhicule ou la pièce, et réglez directement lors du rendez-vous.',
  },
];

const WHY = [
  {
    icon: 'checklist' as IconName,
    title: 'Contrôle 30 points',
    text: 'Les véhicules contrôlés disposent d’un rapport détaillé consultable avant même le premier rendez-vous.',
  },
  {
    icon: 'badge' as IconName,
    title: 'Vendeurs vérifiés',
    text: 'Chaque professionnel est vérifié avant de publier, et les avis des clients restent visibles de tous.',
  },
  {
    icon: 'cash' as IconName,
    title: 'Paiement sur place',
    text: 'Vous ne payez qu’après avoir vu le véhicule ou validé la prestation, directement auprès du vendeur.',
  },
  {
    icon: 'clock' as IconName,
    title: 'Dépannage 24h/24',
    text: 'Une assistance accessible jour et nuit, avec les numéros d’urgence toujours à portée de main.',
  },
];

const APP_FEATURES = [
  { icon: 'pin' as IconName, title: 'Carte des vendeurs à proximité', text: 'Visualisez autour de vous les vendeurs, loueurs, garages et dépanneurs.' },
  { icon: 'heart' as IconName, title: 'Favoris', text: 'Gardez de côté les véhicules et les pièces qui vous intéressent.' },
  { icon: 'search' as IconName, title: 'Recherches enregistrées', text: 'Retrouvez vos critères en un geste et suivez les nouvelles annonces.' },
  { icon: 'message' as IconName, title: 'Inscription par SMS', text: 'Un numéro de téléphone suffit pour créer votre compte.' },
];

export function Home() {
  usePageMeta(
    "Véhicules d'occasion, location, pièces et dépannage en Côte d'Ivoire",
    "AutoPlace réunit l'achat de véhicules d'occasion contrôlés, la location, les pièces, l'assurance, l'entretien et le dépannage 24h/24 à Abidjan, Yamoussoukro et Bouaké.",
  );

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">Abidjan · Yamoussoukro · Bouaké</p>
            <h1>
              Tout pour votre véhicule, <span className="hl">au même endroit.</span>
            </h1>
            <p className="hero__lead">
              Achetez un véhicule d'occasion contrôlé, louez, trouvez vos pièces, assurez-vous et faites-vous dépanner
              24h/24. AutoPlace rapproche les automobilistes ivoiriens des professionnels de confiance.
            </p>
            <AppButtons className="hero__stores" />
            <div className="btn-row">
              <a className="btn btn--signal" href={config.dashboardRegister}>
                Devenir vendeur <Icon name="arrow" size={18} />
              </a>
              <Link className="btn btn--ghost-light" to="/services">
                Découvrir les services
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <HeroArt />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Nos services</p>
            <h2 id="services-title">Une seule application pour toute la vie de votre véhicule</h2>
            <p>De l'achat à l'entretien, en passant par l'imprévu sur la route.</p>
          </Reveal>
          <ul className="cards cards--3">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.id} className="card card--service" delay={(i % 3) * 80}>
                <span className="icon-tile">
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link className="card__link" to={`/services#${s.id}`}>
                  En savoir plus<span className="sr-only"> : {s.title}</span> <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="steps-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Comment ça marche</p>
            <h2 id="steps-title">Trois étapes, sans détour</h2>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" className="step" key={s.title} delay={i * 100}>
                <span className="step__num" aria-hidden="true">{i + 1}</span>
                <Icon name={s.icon} size={28} className="step__icon" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="app-title">
        <div className="container split">
          <Reveal className="split__visual">
            <PhoneMockup />
          </Reveal>
          <Reveal className="split__copy">
            <p className="eyebrow eyebrow--light">L'application</p>
            <h2 id="app-title">Pensée pour la route, dans votre poche</h2>
            <p>
              L'application AutoPlace vous montre ce qui est disponible autour de vous et garde en mémoire ce qui compte
              pour vous.
            </p>
            <ul className="feature-list">
              {APP_FEATURES.map((f) => (
                <li key={f.title}>
                  <span className="icon-tile icon-tile--dark">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <AppButtons />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Pourquoi AutoPlace</p>
            <h2 id="why-title">La confiance, d'abord</h2>
            <p>Nous avons construit AutoPlace autour de ce qui rassure vraiment quand on achète ou qu'on fait réparer.</p>
          </Reveal>
          <ul className="cards cards--4">
            {WHY.map((w, i) => (
              <Reveal as="li" className="card card--why" key={w.title} delay={i * 80}>
                <span className="icon-tile icon-tile--signal">
                  <Icon name={w.icon} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="cities-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Villes desservies</p>
            <h2 id="cities-title">Présents là où vous roulez</h2>
          </Reveal>
          <ul className="cards cards--3">
            {CITIES.map((c, i) => (
              <Reveal as="li" className="card card--city" key={c.name} delay={i * 80}>
                <Icon name="pin" size={28} className="card--city__pin" />
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 id="faq-title">Vous vous demandez peut-être…</h2>
          </Reveal>
          <Faq items={FAQ} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
