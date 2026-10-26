import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/usePageMeta';
import { config } from '../config';

const Todo = ({ children }: { children: ReactNode }) => <mark className="todo">{children}</mark>;

function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow prose">
          <p className="notice" role="note">
            <strong>Document à compléter.</strong> Ce texte est un modèle provisoire : les éléments surlignés doivent
            être renseignés et l'ensemble validé par un conseil juridique avant la mise en production.
          </p>
          {children}
        </div>
      </section>
    </>
  );
}

export function MentionsLegales() {
  usePageMeta('Mentions légales', 'Mentions légales du site AutoEburni : éditeur, hébergement et propriété intellectuelle.');
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Raison sociale : <Todo>à compléter</Todo>
        <br />
        Forme juridique et capital : <Todo>à compléter</Todo>
        <br />
        Siège social : <Todo>adresse à compléter</Todo>, Côte d'Ivoire
        <br />
        RCCM : <Todo>à compléter</Todo> — N° de compte contribuable : <Todo>à compléter</Todo>
        <br />
        Directeur de la publication : <Todo>à compléter</Todo>
        <br />
        Contact : <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
      <h2>Hébergement</h2>
      <p>
        Hébergeur : <Todo>nom, adresse et contact de l'hébergeur à compléter</Todo>
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus de ce site (textes, logo, illustrations, mise en page) est la propriété de l'éditeur,
        sauf mention contraire. Toute reproduction, totale ou partielle, sans autorisation préalable écrite est
        interdite.
      </p>
      <h2>Responsabilité</h2>
      <p>
        AutoEburni met en relation des particuliers et des professionnels. Les transactions et prestations sont conclues
        directement entre les parties. Les conditions précises de responsabilité sont décrites dans les conditions
        générales d'utilisation <Todo>à rédiger</Todo>.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre <Link to="/confidentialite">politique de confidentialité</Link>.
      </p>
    </LegalPage>
  );
}

export function Confidentialite() {
  usePageMeta(
    'Politique de confidentialité',
    'Comment AutoEburni collecte, utilise et protège vos données personnelles, et comment exercer vos droits.',
  );
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        <Todo>Raison sociale et coordonnées du responsable du traitement à compléter</Todo>. Pour toute question :{' '}
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>.
      </p>
      <h2>Données collectées par ce site</h2>
      <p>
        Ce site vitrine ne dépose pas de cookie publicitaire et ne comporte pas de compte utilisateur. Le formulaire de
        contact n'enregistre aucune donnée : il ouvre votre messagerie avec un message pré-rempli que vous choisissez
        d'envoyer. Les polices de caractères sont chargées depuis Google Fonts, ce qui implique la transmission de
        votre adresse IP à ce service.
      </p>
      <h2>Données collectées par l'application</h2>
      <p>
        L'application mobile utilise notamment votre numéro de téléphone (inscription par SMS), votre position
        lorsque vous l'autorisez (carte des vendeurs, dépannage), ainsi que vos favoris et recherches. Le détail des
        finalités, bases légales et durées de conservation est <Todo>à compléter</Todo>.
      </p>
      <h2>Destinataires</h2>
      <p>
        Les données sont destinées à AutoEburni et, lorsque vous les contactez, aux vendeurs et prestataires concernés.
        Liste des sous-traitants : <Todo>à compléter</Todo>.
      </p>
      <h2>Vos droits</h2>
      <p>
        Conformément à la loi n° 2013-450 relative à la protection des données à caractère personnel, vous disposez
        d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Vous pouvez l'exercer en
        écrivant à <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>. Pour supprimer votre compte,
        suivez la procédure décrite sur la page <Link to="/suppression-compte">Supprimer mon compte</Link>. Vous pouvez également
        saisir l'autorité de protection compétente (ARTCI). <Todo>Vérifier et compléter les références légales.</Todo>
      </p>
      <p className="muted">Dernière mise à jour : <Todo>date à compléter</Todo></p>
    </LegalPage>
  );
}

const DELETION_SUBJECT = 'Suppression de mon compte AutoEburni';
const DELETION_BODY = [
  'Bonjour,',
  '',
  'Je demande la suppression de mon compte AutoEburni et des données associées.',
  '',
  'Numéro de téléphone du compte : ',
  'Nom (facultatif) : ',
  '',
  'Merci.',
].join('\n');

/** Procédure de suppression de compte (URL exigée par Google Play et l'App Store). */
export function SuppressionCompte() {
  usePageMeta(
    'Supprimer mon compte',
    'Comment demander la suppression de votre compte AutoEburni et des données associées.',
  );
  const mailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(DELETION_SUBJECT)}&body=${encodeURIComponent(DELETION_BODY)}`;
  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <h1>Supprimer mon compte</h1>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow prose">
          <p>
            Vous pouvez à tout moment demander la suppression de votre compte client de l'application AutoEburni
            (Android, iPhone et web), ainsi que des données personnelles qui y sont associées.
          </p>
          <h2>Comment faire</h2>
          <ol>
            <li>
              Écrivez-nous à <a href={mailto}>{config.contactEmail}</a> avec pour objet « {DELETION_SUBJECT} ».
            </li>
            <li>Indiquez le numéro de téléphone avec lequel vous vous connectez à l'application.</li>
            <li>
              Nous vous contactons sur ce numéro pour confirmer que la demande vient bien de vous, puis nous supprimons
              le compte dans un délai de 30 jours maximum. Un message vous confirme la suppression.
            </li>
          </ol>
          <p>
            <a className="btn btn--primary" href={mailto}>
              Demander la suppression
            </a>
          </p>
          <h2>Données supprimées</h2>
          <ul>
            <li>Votre profil : nom, numéro de téléphone, adresse e-mail et code PIN ;</li>
            <li>vos favoris, recherches enregistrées et préférences de notification ;</li>
            <li>les appareils enregistrés pour les notifications ;</li>
            <li>vos conversations et pièces jointes envoyées au support ;</li>
            <li>les avis que vous avez publiés.</li>
          </ul>
          <h2>Données conservées</h2>
          <p>
            Les commandes, réservations et demandes de service déjà passées sont conservées sans votre nom ni votre
            numéro (données anonymisées), le temps imposé par nos obligations légales et comptables, puis effacées.
          </p>
          <h2>Comptes vendeurs</h2>
          <p>
            Pour fermer un compte vendeur, écrivez à la même adresse depuis l'e-mail du compte : vos annonces seront
            retirées et vos données supprimées selon les mêmes règles.
          </p>
          <p className="muted">
            Voir aussi notre <Link to="/confidentialite">politique de confidentialité</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
