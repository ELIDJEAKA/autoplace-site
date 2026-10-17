import { config } from '../config';

function StoreButton({ href, store, label }: { href: string; store: string; label: string }) {
  const content = (
    <>
      <svg className="store-btn__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {store === 'Google Play' ? (
          <path fill="currentColor" d="M4 2.6v18.8c0 .4.4.6.7.4l10.6-9.4a.5.5 0 0 0 0-.8L4.7 2.2c-.3-.2-.7 0-.7.4zM16.6 13.2l2.8 2.4 1.9-1.1a1.3 1.3 0 0 0 0-2.3l-1.9-1.1-2.8 2.4z" />
        ) : (
          <path fill="currentColor" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8a4.4 4.4 0 0 0-3.7 2.3c-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3s1.6-.7 3-.7 1.8.7 3 .7 2-1.1 2.8-2.2a9.6 9.6 0 0 0 1.3-2.6 3.9 3.9 0 0 1-2.5-3.6zM14.1 5.8a4 4 0 0 0 .9-2.9 4 4 0 0 0-2.6 1.3 3.8 3.8 0 0 0-.9 2.8 3.3 3.3 0 0 0 2.6-1.2z" />
        )}
      </svg>
      <span className="store-btn__text">
        <small>{href ? label : 'Bientôt disponible sur'}</small>
        <strong>{store}</strong>
      </span>
    </>
  );
  return href ? (
    <a className="store-btn" href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <span className="store-btn store-btn--soon" aria-label={`Application bientôt disponible sur ${store}`}>
      {content}
    </span>
  );
}

export function AppButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`store-btns ${className}`.trim()}>
      <StoreButton href={config.playStoreUrl} store="Google Play" label="Disponible sur" />
      <StoreButton href={config.appStoreUrl} store="App Store" label="Télécharger sur" />
    </div>
  );
}
