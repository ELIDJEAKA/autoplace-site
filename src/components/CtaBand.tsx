import { Link } from 'react-router-dom';
import { config } from '../config';
import { AppButtons } from './AppButtons';
import { Reveal } from './Reveal';

export function CtaBand() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band" variant="scale">
          <div>
            <h2>Votre prochain trajet commence ici</h2>
            <p>
              Téléchargez l'application pour trouver un véhicule, une pièce ou un dépanneur près de chez vous. Vous
              êtes professionnel ? Rejoignez le réseau de vendeurs AutoPlace.
            </p>
          </div>
          <div className="cta-band__actions">
            <AppButtons />
            <div className="btn-row">
              <a className="btn btn--signal" href={config.dashboardRegister}>
                Devenir vendeur
              </a>
              <Link className="btn btn--ghost-light" to="/contact">
                Nous contacter
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
