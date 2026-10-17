import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { usePageMeta } from '../components/usePageMeta';

export function NotFound() {
  usePageMeta('Page introuvable', "La page demandée n'existe pas ou a été déplacée.");
  return (
    <section className="section not-found">
      <div className="container container--narrow center">
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1>Cette route ne mène nulle part</h1>
        <p>La page que vous cherchez n'existe pas ou a été déplacée. Reprenons depuis un point connu.</p>
        <div className="btn-row btn-row--center">
          <Link className="btn btn--primary" to="/">
            <Icon name="home" size={18} /> Retour à l'accueil
          </Link>
          <Link className="btn btn--outline" to="/services">
            Voir les services
          </Link>
        </div>
      </div>
    </section>
  );
}
