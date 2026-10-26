import { Link } from 'react-router-dom';
import { config, telHref } from '../config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/brand/logo-dark.svg" alt="AutoEburni" width="152" height="52" loading="lazy" />
          <p>
            La plateforme qui réunit tout ce dont votre véhicule a besoin en Côte d'Ivoire : achat, location, pièces,
            assurance, entretien et dépannage.
          </p>
        </div>
        <nav aria-label="Liens du site">
          <h2 className="site-footer__title">Découvrir</h2>
          <ul>
            <li><Link to="/services">Nos services</Link></li>
            <li><Link to="/vendeurs">Espace vendeur</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="site-footer__title">Professionnels</h2>
          <ul>
            <li><a href={config.dashboardLogin}>Espace vendeur</a></li>
            <li><a href={config.dashboardRegister}>Créer un compte vendeur</a></li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Nous joindre</h2>
          <ul>
            <li><a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></li>
            {config.contactPhone && (
              <li><a href={telHref(config.contactPhone)}>{config.contactPhone}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {year} AutoEburni. Tous droits réservés.</p>
        <ul>
          <li><Link to="/mentions-legales">Mentions légales</Link></li>
          <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
        </ul>
      </div>
    </footer>
  );
}
