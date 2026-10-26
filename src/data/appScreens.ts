/**
 * Captures réelles de l'application mobile AutoEburni (thème sombre), converties en WebP 360 / 720 px.
 * « recherche » provient d'une capture sur téléphone (barres système retirées).
 */
import accueil360 from '../assets/app/accueil-360.webp';
import accueil720 from '../assets/app/accueil-720.webp';
import connexion360 from '../assets/app/connexion-360.webp';
import connexion720 from '../assets/app/connexion-720.webp';
import location360 from '../assets/app/location-360.webp';
import location720 from '../assets/app/location-720.webp';
import piece360 from '../assets/app/piece-360.webp';
import piece720 from '../assets/app/piece-720.webp';
import profil360 from '../assets/app/profil-360.webp';
import profil720 from '../assets/app/profil-720.webp';
import recherche360 from '../assets/app/recherche-360.webp';
import recherche720 from '../assets/app/recherche-720.webp';
import vehicule360 from '../assets/app/vehicule-360.webp';
import vehicule720 from '../assets/app/vehicule-720.webp';

export type AppScreen = { src: string; srcSet: string; width: number; height: number; alt: string };

const shot = (s360: string, s720: string, height720: number, alt: string): AppScreen => ({
  src: s360,
  srcSet: `${s360} 360w, ${s720} 720w`,
  width: 720,
  height: height720,
  alt,
});

export const APP_SCREENS = {
  accueil: shot(
    accueil360,
    accueil720,
    1558,
    "Écran d'accueil de l'application AutoEburni : barre de recherche, services (assurance, dépannage, entretien), derniers véhicules et pièces",
  ),
  recherche: shot(
    recherche360,
    recherche720,
    1603,
    "Écran de recherche de l'application : carte des vendeurs à proximité et offres de pièces disponibles",
  ),
  vehicule: shot(
    vehicule360,
    vehicule720,
    1558,
    "Fiche d'un véhicule d'occasion dans l'application : photo, prix en FCFA, description et bouton « Je suis intéressé »",
  ),
  piece: shot(
    piece360,
    piece720,
    1558,
    "Fiche d'une pièce détachée dans l'application : prix, marques compatibles, vendeur et ajout au panier",
  ),
  location: shot(
    location360,
    location720,
    1558,
    "Fiche de location d'un véhicule dans l'application : prix par jour, loueur et choix des dates",
  ),
  connexion: shot(
    connexion360,
    connexion720,
    1558,
    "Écran de connexion de l'application : saisie du numéro de téléphone pour recevoir un code par SMS",
  ),
  profil: shot(
    profil360,
    profil720,
    1558,
    "Écran de profil de l'application : connexion par numéro et lien d'inscription pour les vendeurs",
  ),
} satisfies Record<string, AppScreen>;

export type AppScreenName = keyof typeof APP_SCREENS;
