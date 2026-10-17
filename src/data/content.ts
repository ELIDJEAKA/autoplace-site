import type { IconName } from '../components/Icon';
import type { FaqItem } from '../components/Faq';

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  label: string;
  short: string;
  intro: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: 'achat',
    label: 'Achat',
    icon: 'car',
    title: "Achat de véhicules d'occasion contrôlés",
    short: 'Des véhicules passés au contrôle 30 points, avec prix affichés en FCFA et vendeurs identifiés.',
    intro:
      "Acheter une voiture d'occasion ne devrait pas être un pari. Chaque véhicule mis en avant sur AutoPlace fait l'objet d'un contrôle en 30 points et d'une fiche détaillée, pour que vous sachiez exactement ce que vous achetez.",
    points: [
      'Contrôle 30 points : moteur, freinage, carrosserie, électricité, pneumatiques…',
      'Prix affichés en FCFA, sans frais cachés',
      'Vendeurs vérifiés et avis laissés par les acheteurs',
      'Rendez-vous pour voir et essayer le véhicule, paiement sur place',
    ],
  },
  {
    id: 'location',
    label: 'Location',
    icon: 'key',
    title: 'Location de véhicules',
    short: "Une citadine pour la semaine ou un 4×4 pour la route de l'intérieur : réservez en quelques gestes.",
    intro:
      "Déplacement professionnel, week-end en famille, voyage vers l'intérieur du pays : comparez les véhicules disponibles près de vous et réservez directement auprès de loueurs partenaires.",
    points: [
      'Location à la journée, à la semaine ou au mois',
      'Conditions et caution affichées avant la réservation',
      'Loueurs partenaires à Abidjan, Yamoussoukro et Bouaké',
      'Option avec chauffeur selon les loueurs',
    ],
  },
  {
    id: 'pieces',
    label: 'Pièces',
    icon: 'gear',
    title: 'Pièces et accessoires',
    short: "Trouvez la bonne pièce pour votre modèle auprès des vendeurs et magasins proches de chez vous.",
    intro:
      "Plaquettes, filtres, batteries, pneus, éclairage ou accessoires : recherchez par modèle et repérez sur la carte les vendeurs qui ont la pièce en stock.",
    points: [
      'Recherche par marque, modèle et type de pièce',
      'Pièces neuves et d’occasion clairement distinguées',
      'Disponibilité en stock indiquée par le vendeur',
      'Retrait en boutique ou arrangement directement avec le vendeur',
    ],
  },
  {
    id: 'assurance',
    label: 'Assurance',
    icon: 'shield',
    title: 'Assurance auto',
    short: 'Demandez un devis en ligne et comparez les formules adaptées à votre véhicule et à votre usage.',
    intro:
      "Responsabilité civile obligatoire, tiers étendu ou tous risques : décrivez votre véhicule et votre usage, et recevez une proposition de devis sans vous déplacer.",
    points: [
      'Demande de devis en quelques minutes depuis l’application',
      'Formules expliquées simplement, garanties détaillées',
      'Accompagnement pour la souscription et le renouvellement',
      'Rappels avant l’échéance de votre contrat',
    ],
  },
  {
    id: 'depannage',
    label: 'Dépannage',
    icon: 'truck',
    title: 'Dépannage et remorquage 24h/24',
    short: "Panne, crevaison ou accident : localisez-vous et demandez de l'aide, de jour comme de nuit.",
    intro:
      "Une panne n'arrive jamais au bon moment. Depuis l'application, partagez votre position et faites venir un dépanneur ou une dépanneuse, à toute heure. En cas d'urgence vitale, appelez d'abord les secours.",
    points: [
      'Demande d’assistance géolocalisée, 24h/24 et 7j/7',
      'Remorquage vers le garage de votre choix',
      'Petits dépannages sur place : batterie, roue, carburant',
      'Numéros d’urgence toujours accessibles dans l’application',
    ],
  },
  {
    id: 'entretien',
    label: 'Entretien',
    icon: 'wrench',
    title: 'Entretien avec récupération à domicile',
    short: 'Vidange, révision, diagnostic : on vient chercher votre véhicule et on vous le ramène.',
    intro:
      "Gagnez du temps sur l'entretien de votre véhicule. Choisissez la prestation, fixez un créneau, et un professionnel récupère le véhicule à votre domicile ou au bureau avant de vous le restituer.",
    points: [
      'Vidange, révision, freinage, climatisation, diagnostic',
      'Récupération et restitution à domicile ou au bureau',
      'Devis communiqué avant toute intervention',
      'Interventions enregistrées dans l’historique du véhicule',
    ],
  },
  {
    id: 'fiche',
    label: 'Historique',
    icon: 'file',
    title: 'Fiche véhicule et historique',
    short: "Un carnet numérique pour suivre l'entretien, les réparations et les documents de votre véhicule.",
    intro:
      "Gardez au même endroit l'historique de votre véhicule : entretiens, réparations, contrôles et échéances. Un véhicule bien documenté se revend plus facilement et en confiance.",
    points: [
      'Historique des entretiens et réparations',
      'Rappels d’échéances : vidange, assurance, visite technique',
      'Fiche partageable avec un acheteur au moment de la revente',
      'Données accessibles depuis votre téléphone, où que vous soyez',
    ],
  },
];

export const SOS_NUMBERS = [
  { label: 'SAMU', number: '185', desc: 'Urgence médicale' },
  { label: 'Sapeurs-pompiers', number: '180', desc: 'Accident, incendie, désincarcération' },
  { label: 'Police secours', number: '170', desc: 'Sécurité, accident sur la voie publique' },
];

export const CITIES = [
  {
    name: 'Abidjan',
    desc: "Du Plateau à Yopougon, de Cocody à Port-Bouët : vendeurs, loueurs et dépanneurs dans toutes les communes.",
  },
  {
    name: 'Yamoussoukro',
    desc: 'Un réseau de partenaires dans la capitale politique pour acheter, louer et entretenir votre véhicule.',
  },
  {
    name: 'Bouaké',
    desc: "Pièces, entretien et assistance au cœur du pays, sur l'axe Nord-Sud.",
  },
];

export const FAQ: FaqItem[] = [
  {
    q: "En quoi consiste le contrôle 30 points ?",
    a: "C'est une vérification structurée de l'état du véhicule : moteur, boîte de vitesses, freinage, direction, suspensions, carrosserie, électricité, pneumatiques et documents. Le résultat est consigné dans la fiche du véhicule pour que l'acheteur puisse le consulter.",
  },
  {
    q: 'Comment payer un véhicule ou une prestation ?',
    a: "Le paiement se fait sur place, directement auprès du vendeur ou du prestataire, après avoir vu le véhicule ou validé l'intervention. Aucun paiement n'est demandé à l'avance dans l'application.",
  },
  {
    q: "Comment créer un compte sur l'application ?",
    a: "Il suffit de votre numéro de téléphone : vous recevez un code par SMS pour confirmer votre inscription. Vous pouvez ensuite enregistrer vos favoris et vos recherches.",
  },
  {
    q: 'Dans quelles villes AutoPlace est-il disponible ?',
    a: "AutoPlace est actif à Abidjan, Yamoussoukro et Bouaké. Le réseau de vendeurs et de prestataires s'étend progressivement à d'autres villes de Côte d'Ivoire.",
  },
  {
    q: 'Le dépannage fonctionne-t-il vraiment la nuit ?',
    a: "Oui, la demande d'assistance est disponible 24h/24 et 7j/7. Le délai d'intervention dépend de votre position et des dépanneurs disponibles à proximité. En cas de blessé, appelez immédiatement le SAMU (185) ou les sapeurs-pompiers (180).",
  },
  {
    q: 'Je suis garagiste ou concessionnaire, comment rejoindre AutoPlace ?',
    a: "Créez votre compte vendeur depuis l'espace professionnel. Après vérification de votre activité, vous pourrez publier votre stock, apparaître sur la carte et recevoir les demandes des clients.",
  },
];
