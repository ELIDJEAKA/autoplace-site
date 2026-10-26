import { Icon, type IconName } from '../components/Icon';
import { PhoneMockup } from '../components/PhoneMockup';
import { Reveal } from '../components/Reveal';
import { usePageMeta } from '../components/usePageMeta';
import { config } from '../config';

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'chart',
    title: 'Un back-office complet',
    text: 'Pilotez votre activité depuis un tableau de bord web : annonces, demandes de clients, rendez-vous et suivi de vos ventes.',
  },
  {
    icon: 'pin',
    title: 'Visible sur la carte',
    text: 'Votre point de vente apparaît sur la carte de l’application, au moment où les automobilistes cherchent près de chez eux.',
  },
  {
    icon: 'star',
    title: 'Des avis qui font la différence',
    text: 'Les clients notent leur expérience. Un service soigné se voit et attire de nouveaux acheteurs.',
  },
  {
    icon: 'box',
    title: 'Gestion du stock',
    text: 'Ajoutez vos véhicules et vos pièces, mettez à jour prix et disponibilités, marquez un article vendu en un clic.',
  },
];

const AUDIENCE = [
  'Concessionnaires et revendeurs de véhicules d’occasion',
  'Loueurs de véhicules',
  'Magasins de pièces détachées et d’accessoires',
  'Garages et ateliers d’entretien',
  'Dépanneurs et services de remorquage',
  'Courtiers et agents d’assurance automobile',
];

const STEPS = [
  { title: 'Créez votre compte', text: 'Renseignez votre activité et vos coordonnées depuis l’espace vendeur.' },
  { title: 'Faites vérifier votre activité', text: 'Notre équipe valide votre profil pour garantir la confiance des acheteurs.' },
  { title: 'Publiez et recevez des demandes', text: 'Mettez en ligne votre stock et répondez aux clients depuis votre tableau de bord.' },
];

export function Vendeurs() {
  usePageMeta(
    'Devenir vendeur',
    'Garages, concessionnaires, loueurs, magasins de pièces et dépanneurs : rejoignez AutoEburni, gérez votre stock depuis le back-office et soyez visible sur la carte.',
  );
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Espace professionnels</p>
          <h1>Développez votre activité automobile avec AutoEburni</h1>
          <p className="page-hero__lead">
            Rejoignez un réseau de professionnels vérifiés et rendez votre offre visible auprès des automobilistes
            qui cherchent près de chez eux.
          </p>
          <div className="btn-row">
            <a className="btn btn--signal" href={config.dashboardRegister}>
              Créer mon compte vendeur <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--ghost-light" href={config.dashboardLogin}>
              J'ai déjà un compte
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="benef-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Avantages</p>
            <h2 id="benef-title">Les outils pour vendre en confiance</h2>
          </Reveal>
          <ul className="cards cards--4">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" className="card card--lift" key={b.title} delay={i * 80}>
                <span className="icon-tile">
                  <Icon name={b.icon} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="audience-title">
        <div className="container split">
          <Reveal className="split__copy" variant="left">
            <p className="eyebrow">Pour qui ?</p>
            <h2 id="audience-title">Tous les métiers de l'automobile</h2>
            <p>
              Que vous vendiez des véhicules, des pièces ou un savoir-faire, AutoEburni vous met en relation avec des
              clients qui cherchent exactement ce que vous proposez.
            </p>
            <ul className="checks">
              {AUDIENCE.map((a) => (
                <li key={a}>
                  <Icon name="check" size={18} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="split__visual" variant="right" delay={120}>
            <PhoneMockup screens={['profil']} />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="join-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Inscription</p>
            <h2 id="join-title">Rejoindre AutoEburni en trois étapes</h2>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" className="step" key={s.title} delay={i * 100}>
                <span className="step__num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="center">
            <a className="btn btn--primary" href={config.dashboardRegister}>
              Commencer l'inscription <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
