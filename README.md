# AutoEburni — site vitrine

Site de présentation d'AutoEburni (Côte d'Ivoire) : achat de véhicules d'occasion contrôlés, location, pièces,
assurance, dépannage 24h/24, entretien et historique du véhicule. Site **statique** : aucune donnée n'est lue
depuis l'API.

## Stack

- Vite 5 + React 18 + TypeScript (strict) + React Router 6
- CSS natif (variables, mobile-first), icônes SVG inline, polices Barlow / Barlow Condensed (Google Fonts)
- ESLint 9 (typescript-eslint, react-hooks)
- Docker multi-étapes (build Node → nginx) ; déploiement via GitHub Actions

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil : héros, services, « Comment ça marche », application, « Pourquoi AutoEburni », vendeurs près de chez vous, FAQ, appel à l'action |
| `/services` | Une section détaillée par service (ancres `#achat`, `#location`, `#pieces`, `#assurance`, `#depannage`, `#entretien`, `#fiche`) |
| `/vendeurs` | Avantages pour les professionnels, lien vers l'inscription du dashboard |
| `/a-propos` | Mission, ancrage, valeurs |
| `/contact` | Formulaire validé côté client qui ouvre un `mailto:` (pas de backend) + numéros d'urgence |
| `/mentions-legales`, `/confidentialite` | Modèles **à compléter** (passages surlignés) |
| `*` | Page 404 |

## Scripts

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5174)
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # build de production dans dist/ (+ sitemap.xml et robots.txt)
npm run preview    # prévisualisation du build
```

## Configuration (variables d'environnement)

Copier `.env.example` en `.env`. Les variables sont **figées au moment du build**.

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `VITE_SITE_URL` | `http://45.90.161.191:3000` | URL publique : balises Open Graph, canonical, `sitemap.xml`, `robots.txt` |
| `VITE_DASHBOARD_URL` | `http://45.90.161.191:5173` | Back-office vendeurs : « Espace vendeur » → `/login`, « Devenir vendeur » → `/register` |
| `VITE_PLAY_STORE_URL` | _(vide)_ | Lien Google Play ; vide → bouton « Bientôt disponible » |
| `VITE_APP_STORE_URL` | _(vide)_ | Lien App Store ; vide → bouton « Bientôt disponible » |
| `VITE_CONTACT_EMAIL` | `autoeburni@gmail.com` | Adresse du formulaire de contact et du pied de page |
| `VITE_CONTACT_PHONE` | _(vide)_ | Téléphone affiché ; vide → masqué |

SEO : chaque route met à jour `<title>`, la meta description et le lien canonical (`src/components/usePageMeta.ts`).
Toute nouvelle route publique doit être ajoutée à `ROUTES` dans `vite.config.ts` pour figurer dans le sitemap.

## Docker

```bash
docker build -t autoplace-site \
  --build-arg VITE_DASHBOARD_URL=http://45.90.161.191:5173 \
  --build-arg VITE_CONTACT_EMAIL=autoeburni@gmail.com .
docker run --rm -p 3000:80 autoplace-site   # http://localhost:3000
```

nginx sert les fichiers statiques avec repli SPA sur `index.html`, compression gzip et cache long (1 an,
`immutable`) pour `/assets/`.

## Déploiement (dev)

Workflow `.github/workflows/deploy-dev.yml` :

1. **Lint + build** à chaque push (`dev`, `main`) et pull request.
2. Sur push vers `dev` (ou lancement manuel) : build de l'image et publication sur GHCR
   `ghcr.io/<owner>/autoplace-site:dev-<sha>` et `:dev`.
3. Déploiement SSH sur `45.90.161.191` dans `~/autoplace-site-dev` avec `deploy/docker-compose.dev.yml`
   (conteneur `autoplace-site-dev`, port **3000** → 80), puis vérification `curl http://45.90.161.191:3000/`.

### Configuration GitHub requise

Dans *Settings → Environments*, créer l'environnement **`dev`** avec :

- Secrets : `DEPLOY_SSH_KEY` (clé privée), `DEPLOY_KNOWN_HOSTS` (**obligatoire** : ligne `known_hosts` du serveur, empreinte vérifiée hors bande ; le déploiement échoue sans)
- Variable ou secret : `DEPLOY_SSH_USER`
- Variables facultatives : `VITE_SITE_URL`, `VITE_DASHBOARD_URL`, `VITE_PLAY_STORE_URL`, `VITE_APP_STORE_URL`,
  `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE` (les défauts ci-dessus s'appliquent si elles sont absentes)

Le workflow publie avec le `GITHUB_TOKEN` (permission `packages: write`) ; aucun jeton supplémentaire n'est nécessaire.

### Prérequis serveur

- Docker et le plugin `docker compose` installés, utilisateur SSH membre du groupe `docker`
- Port **3000** libre sur le serveur et ouvert dans le pare-feu : `sudo ufw allow 3000/tcp`
