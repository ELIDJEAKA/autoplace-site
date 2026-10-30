/** Widget anti-robot Cloudflare Turnstile (rendu explicite, thème auto, en français). */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

/** Clé de site de test officielle de Cloudflare : toujours valide (développement, sans domaine). */
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;
/** Action contrôlée par l'API (`TURNSTILE_EXPECTED_ACTION`). */
const TURNSTILE_ACTION = 'contact';
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type RenderOptions = {
  sitekey: string;
  action?: string;
  theme?: 'auto' | 'light' | 'dark';
  language?: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => boolean | void;
};

type TurnstileApi = {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) {
    loading = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
      script.onerror = () => {
        loading = null;
        script.remove();
        reject(new Error('turnstile'));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

export type TurnstileHandle = { reset: () => void };

/** `onToken(null)` quand le jeton expire, échoue ou est réinitialisé (un jeton ne sert qu'une fois). */
export const Turnstile = forwardRef<TurnstileHandle, { onToken: (token: string | null) => void }>(function Turnstile(
  { onToken },
  ref,
) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const callback = useRef(onToken);
  callback.current = onToken;
  const [failed, setFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      callback.current(null);
      if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !box.current) return;
        widget.current = turnstile.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: TURNSTILE_ACTION,
          theme: 'auto',
          language: 'fr',
          callback: (token) => callback.current(token),
          'expired-callback': () => callback.current(null),
          'error-callback': () => {
            callback.current(null);
          },
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  return (
    <div className="turnstile">
      <div ref={box} />
      {failed && (
        <p className="field__err" role="alert">
          Vérification anti-robot indisponible : vérifiez votre connexion puis rechargez la page.
        </p>
      )}
    </div>
  );
});
