/**
 * Carte générique « autour de vous » (aucun lieu réel) : position de repères de vendeurs autour du point
 * « vous êtes ici », en coordonnées normalisées (-1 … 1, x vers la droite, y vers le bas).
 * Partagé par la carte SVG de la page d'accueil et la scène 3D du héros.
 */
export type NearbyPin = { x: number; y: number; kind: 'vendeur' | 'garage' | 'depanneur'; route?: boolean };

export const NEARBY_PINS: NearbyPin[] = [
  { x: -0.62, y: -0.42, kind: 'vendeur', route: true },
  { x: 0.55, y: -0.5, kind: 'garage' },
  { x: 0.7, y: 0.28, kind: 'vendeur', route: true },
  { x: -0.3, y: 0.62, kind: 'depanneur', route: true },
  { x: 0.12, y: -0.78, kind: 'vendeur' },
  { x: -0.82, y: 0.18, kind: 'garage' },
];

/** Rayon (normalisé) du plateau organique à l'angle `a`. */
export function terrainRadius(a: number): number {
  return 1 + 0.07 * Math.sin(3 * a + 0.6) + 0.045 * Math.cos(5 * a);
}
