import { CtaBand } from '../components/CtaBand';
import { Icon, type IconName } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { usePageMeta } from '../components/usePageMeta';

const VALUES: { icon: IconName; title: string; text: string }[] = [
  { icon: 'shield', title: 'Transparence', text: 'Des prix clairs en FCFA, des véhicules contrôlés et des vendeurs identifiés.' },
  { icon: 'user', title: 'Proximité', text: 'Des professionnels près de chez vous, joignables simplement, dans votre ville.' },
  { icon: 'clock', title: 'Disponibilité', text: 'Une assistance accessible jour et nuit, parce que la route ne s’arrête pas à 18 h.' },
];

export function About() {
  usePageMeta(
    'À propos',
    "AutoPlace est née d'une conviction : acheter, entretenir et assurer son véhicule en Côte d'Ivoire devrait être simple, transparent et accessible à tous.",
  );
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">À propos</p>
          <h1>Rendre l'automobile plus simple en Côte d'Ivoire</h1>
          <p className="page-hero__lead">
            AutoPlace rassemble dans une même plateforme les services dont chaque automobiliste a besoin, et les
            professionnels capables de les rendre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow prose">
          <Reveal>
            <h2>Notre mission</h2>
            <p>
              Trouver un véhicule fiable, la bonne pièce, un garage sérieux ou un dépanneur en pleine nuit demande
              souvent de nombreux appels, des déplacements et beaucoup de bouche-à-oreille. Nous voulons que ces
              démarches tiennent dans une seule application.
            </p>
            <p>
              AutoPlace met en relation les automobilistes avec des vendeurs, loueurs, garages, assureurs et
              dépanneurs vérifiés. Le contrôle des véhicules, les avis des clients et le paiement sur place sont au
              cœur de notre approche : chacun avance en confiance.
            </p>
            <h2>Notre ancrage</h2>
            <p>
              Nous travaillons avec des professionnels locaux qui connaissent leurs clients et leurs routes. Notre
              réseau s'agrandit progressivement, pour que vous trouviez toujours un vendeur près de chez vous.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="values-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Nos valeurs</p>
            <h2 id="values-title">Ce qui nous guide</h2>
          </Reveal>
          <ul className="cards cards--3">
            {VALUES.map((v, i) => (
              <Reveal as="li" className="card card--lift" variant="scale" key={v.title} delay={i * 90}>
                <span className="icon-tile">
                  <Icon name={v.icon} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
