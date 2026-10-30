import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/usePageMeta';
import { config } from '../config';

/** Responsable du service tant que la société n'est pas immatriculée. */
const RESPONSABLE = 'Jean Claude Kouassi';
const UPDATED = '30 octobre 2026';

function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow prose">{children}</div>
      </section>
    </>
  );
}

function Contact() {
  return <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>;
}

export function MentionsLegales() {
  usePageMeta('Mentions légales', 'Mentions légales d’AutoEburni : éditeur, hébergement et propriété intellectuelle.');
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur</h2>
      <p>
        AutoEburni est un service édité par <strong>{RESPONSABLE}</strong>, à titre personnel, dans l’attente de
        l’immatriculation de la société qui l’exploitera (ces mentions seront alors mises à jour).
        <br />
        Abidjan, Côte d’Ivoire
        <br />
        Directeur de la publication : {RESPONSABLE}
        <br />
        Contact : <Contact />
      </p>
      <h2>Hébergement</h2>
      <ul>
        <li>Serveurs applicatifs : Sapinet SAS (hébergement de serveurs).</li>
        <li>Base de données : MongoDB Atlas (MongoDB, Inc.).</li>
        <li>Photos et fichiers : Google Cloud Storage (Google LLC).</li>
      </ul>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les contenus de ce site et des applications AutoEburni (textes, logo, illustrations, mise en page) sont
        protégés. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite. Les photos
        des annonces appartiennent à leurs auteurs (vendeurs) ou proviennent de banques d’images libres.
      </p>
      <h2>Responsabilité</h2>
      <p>
        AutoEburni met en relation des clients et des professionnels de l’automobile. Les ventes, locations et
        prestations sont conclues directement entre les parties ; chaque vendeur est responsable de ses annonces.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Leur traitement est décrit dans notre <Link to="/confidentialite">politique de confidentialité</Link>.
      </p>
      <p className="muted">Dernière mise à jour : {UPDATED}</p>
    </LegalPage>
  );
}

export function Confidentialite() {
  usePageMeta(
    'Politique de confidentialité',
    'Données collectées par AutoEburni (application mobile, application web, espace vendeurs, site), usages, partenaires, durées de conservation et droits.',
  );
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette politique s’applique à l’application mobile AutoEburni (Android et iPhone), à l’application web, à
        l’espace vendeurs et à ce site. Elle explique quelles données nous collectons, pourquoi, avec qui elles sont
        partagées, combien de temps elles sont conservées et comment exercer vos droits.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {RESPONSABLE}, éditeur d’AutoEburni, Abidjan, Côte d’Ivoire. Contact : <Contact />.
      </p>

      <h2>Données que nous collectons</h2>
      <h3>Si vous utilisez l’application (clients)</h3>
      <ul>
        <li>
          <strong>Numéro de téléphone</strong> : pour créer votre compte et vous connecter (code reçu par SMS), et pour
          que le vendeur ou le service concerné vous rappelle.
        </li>
        <li>
          <strong>Code PIN</strong> : pour vous reconnecter sans SMS. Il est stocké sous forme chiffrée irréversible ;
          personne, y compris notre équipe, ne peut le lire.
        </li>
        <li>
          <strong>Nom et, si vous le donnez, adresse e-mail</strong> : pour personnaliser votre compte et vos demandes.
        </li>
        <li>
          <strong>Demandes et transactions</strong> : demandes d’achat d’un véhicule, réservations de location (dates,
          véhicule), commandes de pièces, demandes d’assurance, de dépannage et d’entretien (informations sur le
          véhicule et le problème).
        </li>
        <li>
          <strong>Position</strong>, seulement si vous l’autorisez : pour afficher les vendeurs proches sur la carte et
          pour envoyer une dépanneuse au bon endroit. Elle est enregistrée uniquement dans une demande de dépannage.
        </li>
        <li>
          <strong>Messages et photos envoyés au support</strong> : pour traiter vos demandes d’aide.
        </li>
        <li>
          <strong>Avis sur les vendeurs</strong> : note et commentaire, publiés avec votre prénom et l’initiale de votre
          nom.
        </li>
        <li>
          <strong>Favoris et préférences</strong> : véhicules, locations et pièces suivis, pour vous prévenir d’une
          baisse de prix, d’une vente ou d’un retour en stock.
        </li>
        <li>
          <strong>Appareil</strong> : un identifiant technique de notifications (pour vous envoyer les alertes que vous
          avez activées) et, sans compte, un identifiant anonyme généré par l’application pour retenir vos favoris.
        </li>
      </ul>
      <p>
        Le déverrouillage par empreinte ou par visage est entièrement géré par votre téléphone : AutoEburni ne reçoit
        jamais vos données biométriques. Vos recherches récentes restent sur votre appareil.
      </p>
      <h3>Si vous êtes vendeur ou membre de l’équipe</h3>
      <ul>
        <li>Nom, adresse e-mail et mot de passe (stocké sous forme chiffrée irréversible).</li>
        <li>
          Profil public : nom commercial, photo, adresse, commune, position sur la carte, horaires et téléphone (ce
          dernier n’est montré qu’aux utilisateurs connectés).
        </li>
        <li>Annonces publiées (véhicules, locations, pièces) et leurs photos.</li>
      </ul>
      <h3>Si vous nous écrivez depuis le site</h3>
      <p>
        Le formulaire de contact transmet votre nom, votre adresse e-mail, votre téléphone (facultatif), le sujet et
        votre message à l’équipe AutoEburni par e-mail, pour vous répondre. Ces messages sont conservés dans notre
        messagerie le temps nécessaire au suivi de votre demande.
      </p>
      <h3>Données techniques</h3>
      <p>
        Comme tout service en ligne, nos serveurs enregistrent l’adresse IP et la date des requêtes, pour la sécurité
        (protection contre les abus) et le diagnostic des erreurs. L’application web utilise un cookie de session,
        nécessaire à la connexion. Nous n’utilisons <strong>aucun cookie publicitaire, aucune publicité et aucun outil
        de suivi publicitaire</strong>, et nous ne vendons pas vos données.
      </p>

      <h2>Pourquoi nous les utilisons</h2>
      <ul>
        <li>Fournir le service : compte, annonces, réservations, commandes, demandes de services, support.</li>
        <li>Mettre en relation les clients et les vendeurs concernés par une demande.</li>
        <li>Envoyer les notifications et e-mails liés à votre compte et à vos demandes.</li>
        <li>Assurer la sécurité : vérification par SMS, protection anti-robot, prévention des abus.</li>
      </ul>

      <h2>Avec qui elles sont partagées</h2>
      <p>
        Le <strong>vendeur ou le service concerné</strong> reçoit les informations nécessaires pour vous répondre (par
        exemple votre nom et votre téléphone pour une demande d’achat ou une commande). Nous faisons aussi appel à des
        prestataires techniques, qui ne traitent vos données que pour notre compte :
      </p>
      <ul>
        <li>Sapinet SAS : hébergement des serveurs.</li>
        <li>MongoDB Atlas (MongoDB, Inc.) : base de données.</li>
        <li>Google Cloud (Google LLC) : stockage des photos et fichiers, et Firebase Cloud Messaging pour les notifications.</li>
        <li>Brevo (Sendinblue SAS) : envoi des e-mails.</li>
        <li>Notre prestataire d’envoi de SMS : codes de vérification.</li>
        <li>Cloudflare, Inc. : protection anti-robot (Turnstile) de l’inscription des vendeurs et du formulaire de contact.</li>
        <li>OpenStreetMap : fonds de carte (votre adresse IP est transmise pour afficher la carte).</li>
        <li>Google Fonts : polices de caractères du site.</li>
      </ul>
      <p>
        Certains de ces prestataires sont situés hors de Côte d’Ivoire (Union européenne, États-Unis). Ils sont choisis
        pour leurs garanties de sécurité. Vos données peuvent aussi être communiquées aux autorités si la loi l’exige.
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Compte et profil : tant que le compte existe ; supprimés dans les 30 jours suivant votre demande.</li>
        <li>Codes SMS : quelques minutes (un code expire au bout de 90 secondes).</li>
        <li>Messages du support : jusqu’à la suppression du compte.</li>
        <li>
          Commandes, réservations et ventes : conservées sans votre nom ni votre téléphone (données anonymisées) le temps
          imposé par nos obligations légales et comptables.
        </li>
        <li>Journaux techniques : quelques semaines au plus.</li>
      </ul>

      <h2>Sécurité</h2>
      <p>
        Les échanges sont chiffrés (HTTPS), les mots de passe et codes PIN sont stockés sous forme chiffrée
        irréversible, et l’accès aux données est réservé à l’équipe AutoEburni et aux vendeurs pour leurs propres
        annonces et demandes.
      </p>

      <h2>Mineurs</h2>
      <p>AutoEburni s’adresse aux personnes majeures (18 ans et plus).</p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère
        personnel, vous pouvez accéder à vos données, les faire rectifier, vous opposer à leur traitement ou en demander
        la suppression en écrivant à <Contact />. Pour supprimer votre compte, suivez la procédure de la page{' '}
        <Link to="/suppression-compte">Supprimer mon compte</Link>. Vous pouvez également saisir l’Autorité de
        Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI).
      </p>

      <h2>Modifications</h2>
      <p>
        Nous pouvons mettre à jour cette politique ; la date ci-dessous indique la dernière version. En cas de
        changement important, nous vous en informerons dans l’application.
      </p>
      <p className="muted">Dernière mise à jour : {UPDATED}</p>
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
          <h2 id="donnees">Supprimer seulement certaines données (sans supprimer le compte)</h2>
          <p>Vous pouvez garder votre compte et effacer une partie de vos données :</p>
          <ul>
            <li>
              <strong>Favoris</strong> : dans l’application, onglet Favoris, touchez le cœur d’un véhicule, d’une
              location ou d’une pièce pour le retirer.
            </li>
            <li>
              <strong>Avis sur un vendeur</strong> : ouvrez le profil du vendeur, puis « Supprimer mon avis ».
            </li>
            <li>
              <strong>Recherches enregistrées</strong> : Profil → Mes recherches, puis supprimez celles que vous ne
              voulez plus. Elles ne sont conservées que sur votre téléphone.
            </li>
            <li>
              <strong>Nom et adresse e-mail</strong> : Profil → Paramètres, effacez-les de votre profil.
            </li>
            <li>
              <strong>Toute autre donnée</strong> (messages au support, demandes, réservations, position enregistrée
              dans une demande de dépannage…) : écrivez-nous à <a href={mailto}>{config.contactEmail}</a> en précisant
              votre numéro de téléphone et les données à effacer. Nous les supprimons dans un délai de 30 jours maximum,
              sauf celles que la loi nous oblige à conserver (voir ci-dessus « Données conservées »).
            </li>
          </ul>
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
