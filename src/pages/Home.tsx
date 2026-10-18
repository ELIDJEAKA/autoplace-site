import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { MOTION_OK, useGsap, type GsapApi } from '../anim/useGsap';
import { AppButtons } from '../components/AppButtons';
import { CtaBand } from '../components/CtaBand';
import { Faq } from '../components/Faq';
import { HeroStage } from '../components/HeroStage';
import { Icon, type IconName } from '../components/Icon';
import { PhoneMockup } from '../components/PhoneMockup';
import { Reveal } from '../components/Reveal';
import { ServiceIcon } from '../components/ServiceIcon';
import { usePageMeta } from '../components/usePageMeta';
import { config } from '../config';
import { FAQ, SERVICES } from '../data/content';

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

const NEARBY = [
  {
    icon: 'pin' as IconName,
    title: 'Autour de votre position',
    text: 'La carte de l’application affiche les vendeurs, loueurs, garages et dépanneurs les plus proches de vous.',
  },
  {
    icon: 'badge' as IconName,
    title: 'Des professionnels vérifiés',
    text: 'Chaque vendeur est vérifié avant de publier : vous savez à qui vous avez affaire avant de vous déplacer.',
  },
  {
    icon: 'truck' as IconName,
    title: 'Là où vous êtes',
    text: 'En cas de panne, partagez votre position et faites venir un dépanneur partout où nos partenaires sont présents.',
  },
];

const H1_WORDS = ['Tout', 'pour', 'votre', 'véhicule,'];
const H1_HL = ['au', 'même', 'endroit.'];

/** Animations de défilement de la page d'accueil (GSAP + ScrollTrigger, chargés à la demande). */
function animateHome({ gsap, ScrollTrigger, mm, root }: GsapApi) {
  const q = gsap.utils.selector(root);

  mm.add(MOTION_OK, () => {
    // Parallaxe du héros : halos lents (toutes tailles).
    const hero = q('.hero')[0];
    if (hero) {
      gsap.to(q('.hero__blobs'), {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // Grilles : apparitions échelonnées, avec un effet différent par section.
    q<HTMLElement>('[data-stagger]').forEach((list) => {
      const kind = list.dataset.stagger;
      const from =
        kind === 'scale' ? { opacity: 0, scale: 0.9, y: 16 } : kind === 'right' ? { opacity: 0, x: 48 } : { opacity: 0, y: 40 };
      const items = Array.from(list.children);
      gsap.set(items, from);
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.09,
            clearProps: 'transform,opacity',
          }),
      });
    });

    // « Près de chez vous » : itinéraire tracé au défilement, repères qui tombent, téléphone en parallaxe.
    const stage = q('.nearby-stage')[0];
    if (stage) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top 80%', end: 'center 45%', scrub: 0.6 },
      });
      tl.from(q('.nearby-stage__line'), { strokeDashoffset: 1, duration: 1, ease: 'none' }, 0).from(
        q('.nearby-stage__pin'),
        { y: -50, opacity: 0, duration: 0.4, ease: 'bounce.out', stagger: 0.18 },
        0.2,
      );
      gsap.fromTo(
        q('.nearby-stage .phone'),
        { y: 40 },
        { y: -30, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }

    // Duo de téléphones : le téléphone arrière défile plus lentement (profondeur).
    const duo = q('.phone-duo')[0];
    if (duo) {
      gsap.fromTo(
        q('.phone-duo__back'),
        { y: 50 },
        { y: -50, ease: 'none', scrollTrigger: { trigger: duo, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }
  });

  // Bureau (texte et visuel côte à côte) : le visuel monte un peu plus vite que le texte.
  mm.add(`${MOTION_OK} and (min-width: 960px)`, () => {
    const hero = q('.hero')[0];
    if (!hero) return;
    const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to(q('.hero-stage'), { y: -60, ease: 'none', scrollTrigger: st });
    gsap.to(q('.hero__copy'), { y: 40, opacity: 0.35, ease: 'none', scrollTrigger: st });
  });

  // « Comment ça marche » : section épinglée, progression étape par étape (bureau).
  mm.add(`${MOTION_OK} and (min-width: 860px)`, () => {
    const section = q('.how')[0];
    const steps = q('.step');
    if (!section || steps.length === 0) return;
    gsap.set(steps, { opacity: 0.35, y: 24, scale: 0.96 });
    gsap.set(q('.steps__fill'), { scaleX: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: () => `+=${Math.round(window.innerHeight * 1.1)}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });
    steps.forEach((step, i) => {
      const at = i * 1;
      tl.to(step, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }, at)
        .to(step.querySelector('.step__num'), { scale: 1.18, duration: 0.3, yoyo: true, repeat: 1 }, at);
      if (i < steps.length - 1) {
        tl.to(q('.steps__fill'), { scaleX: (i + 1) / (steps.length - 1), duration: 1, ease: 'none' }, at);
      }
    });
    tl.to({}, { duration: 0.4 });
  });

  // Mobile / tablette : pas d'épinglage, la ligne verticale se remplit au défilement.
  mm.add(`${MOTION_OK} and (max-width: 859px)`, () => {
    const wrap = q('.steps-wrap')[0];
    if (!wrap) return;
    gsap.fromTo(
      q('.steps__fill'),
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 75%', end: 'bottom 55%', scrub: 0.4 } },
    );
    q('.step').forEach((step) => {
      gsap.from(step, { opacity: 0, x: -28, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 85%' } });
    });
  });
}

export function Home() {
  usePageMeta(
    "Véhicules d'occasion, location, pièces et dépannage en Côte d'Ivoire",
    "AutoPlace réunit l'achat de véhicules d'occasion contrôlés, la location, les pièces, l'assurance, l'entretien et le dépannage 24h/24, avec des professionnels vérifiés près de chez vous.",
  );
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, animateHome);

  return (
    <div ref={root}>
      <section className="hero">
        <div className="hero__blobs" aria-hidden="true">
          <span className="blob blob--teal" />
          <span className="blob blob--signal" />
          <span className="blob blob--navy" />
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light enter" style={{ '--d': '0ms' } as CSSProperties}>
              Près de chez vous, 24h/24
            </p>
            <h1 className="hero__title">
              <span className="sr-only">Tout pour votre véhicule, au même endroit.</span>
              <span aria-hidden="true">
                {H1_WORDS.map((w, i) => (
                  <span className="word" key={w} style={{ '--i': i } as CSSProperties}>
                    {w}
                  </span>
                ))}
                <span className="hl">
                  {H1_HL.map((w, i) => (
                    <span className="word" key={w} style={{ '--i': i + H1_WORDS.length } as CSSProperties}>
                      {w}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="hero__lead enter" style={{ '--d': '520ms' } as CSSProperties}>
              Achetez un véhicule d'occasion contrôlé, louez, trouvez vos pièces, assurez-vous et faites-vous dépanner
              24h/24. AutoPlace rapproche les automobilistes ivoiriens des professionnels de confiance.
            </p>
            <div className="enter" style={{ '--d': '640ms' } as CSSProperties}>
              <AppButtons className="hero__stores" />
            </div>
            <div className="btn-row enter" style={{ '--d': '760ms' } as CSSProperties}>
              <a className="btn btn--signal" href={config.dashboardRegister}>
                Devenir vendeur <Icon name="arrow" size={18} className="btn__arrow" />
              </a>
              <Link className="btn btn--ghost-light" to="/services">
                Découvrir les services
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <HeroStage />
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
          <ul className="cards cards--3" data-stagger="up">
            {SERVICES.map((s) => (
              <li key={s.id} className="card card--service card--lift">
                <span className="icon-tile">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link className="card__link" to={`/services#${s.id}`}>
                  En savoir plus<span className="sr-only"> : {s.title}</span> <Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>


      <section className="section section--muted how" aria-labelledby="steps-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Comment ça marche</p>
            <h2 id="steps-title">Trois étapes, sans détour</h2>
          </Reveal>
          <div className="steps-wrap">
            <span className="steps__track" aria-hidden="true">
              <span className="steps__fill" />
            </span>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li className="step" key={s.title}>
                  <span className="step__num" aria-hidden="true">{i + 1}</span>
                  <Icon name={s.icon} size={28} className="step__icon" />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="app-title">
        <div className="container split">
          <Reveal className="split__visual" variant="left">
            <div className="phone-duo">
              <PhoneMockup screens={['connexion']} className="phone-duo__back" sizes="(min-width: 768px) 220px, 50vw" />
              <PhoneMockup screens={['location']} className="phone-duo__front" />
            </div>
          </Reveal>
          <Reveal className="split__copy" variant="right" delay={120}>
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
          <ul className="cards cards--4" data-stagger="scale">
            {WHY.map((w) => (
              <li className="card card--why card--lift" key={w.title}>
                <span className="icon-tile icon-tile--signal">
                  <ServiceIcon name={w.icon} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="nearby-title">
        <div className="container nearby">
          <div className="nearby__visual">
            <div className="nearby-stage">
              <svg className="nearby-stage__route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path className="nearby-stage__road" d="M2 88 C 22 70, 18 40, 40 34 S 78 30, 96 8" />
                <path className="nearby-stage__line" pathLength={1} d="M2 88 C 22 70, 18 40, 40 34 S 78 30, 96 8" />
              </svg>
              {[
                { l: '8%', t: '70%' },
                { l: '20%', t: '34%' },
                { l: '86%', t: '18%' },
                { l: '90%', t: '62%' },
              ].map((p, i) => (
                <span key={i} className="nearby-stage__pin" style={{ left: p.l, top: p.t }} aria-hidden="true">
                  <Icon name="pin" size={22} />
                </span>
              ))}
              <PhoneMockup screens={['recherche']} />
            </div>
          </div>
          <div className="nearby__copy">
            <Reveal className="section__head">
              <p className="eyebrow">Autour de vous</p>
              <h2 id="nearby-title">Des vendeurs près de chez vous</h2>
              <p>Partout où nos vendeurs sont présents, AutoPlace vous montre les plus proches.</p>
            </Reveal>
            <ul className="nearby__list" data-stagger="right">
              {NEARBY.map((n) => (
                <li className="card card--nearby card--lift" key={n.title}>
                  <span className="icon-tile">
                    <ServiceIcon name={n.icon} />
                  </span>
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
    </div>
  );
}
