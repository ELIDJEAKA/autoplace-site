import { Icon } from './Icon';

/** Maquette de téléphone en CSS : aperçu illustratif de l'application mobile (aucune donnée réelle). */
export function PhoneMockup() {
  return (
    <div className="phone" role="img" aria-label="Aperçu de l'application AutoPlace : carte des vendeurs à proximité et annonces de véhicules contrôlés">
      <div className="phone__notch" />
      <div className="phone__screen" aria-hidden="true">
        <div className="phone__bar">
          <img src="/brand/mark.svg" alt="" width="22" height="22" />
          <span>AutoPlace</span>
          <Icon name="search" size={16} />
        </div>
        <div className="phone__map">
          <span className="phone__road phone__road--a" />
          <span className="phone__road phone__road--b" />
          <span className="phone__road phone__road--c" />
          <span className="phone__pin" style={{ top: '28%', left: '22%' }} />
          <span className="phone__pin phone__pin--teal" style={{ top: '52%', left: '62%' }} />
          <span className="phone__pin" style={{ top: '70%', left: '34%' }} />
          <span className="phone__me" style={{ top: '46%', left: '42%' }} />
          <span className="phone__chip">
            <Icon name="pin" size={12} /> Vendeurs à proximité
          </span>
        </div>
        <div className="phone__list">
          {[
            { t: 'Berline · Diesel', s: 'Contrôle 30 points', tag: 'Vérifié' },
            { t: 'SUV · Essence', s: 'Historique disponible', tag: 'Location' },
          ].map((c) => (
            <div className="phone__card" key={c.t}>
              <div className="phone__thumb">
                <Icon name="car" size={22} />
              </div>
              <div className="phone__meta">
                <b>{c.t}</b>
                <small>{c.s}</small>
              </div>
              <span className="phone__tag">{c.tag}</span>
            </div>
          ))}
        </div>
        <div className="phone__tabs">
          <Icon name="home" size={16} />
          <Icon name="pin" size={16} />
          <Icon name="heart" size={16} />
          <Icon name="user" size={16} />
        </div>
      </div>
    </div>
  );
}
