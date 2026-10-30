const clean = (v: string | undefined) => (v ?? '').trim();
const dashboard = (clean(import.meta.env.VITE_DASHBOARD_URL) || 'https://preview-espace-vendeurs.autoeburni.ci').replace(/\/+$/, '');

export const config = {
  dashboardUrl: dashboard,
  dashboardLogin: `${dashboard}/login`,
  dashboardRegister: `${dashboard}/register`,
  playStoreUrl: clean(import.meta.env.VITE_PLAY_STORE_URL),
  appStoreUrl: clean(import.meta.env.VITE_APP_STORE_URL),
  contactEmail: clean(import.meta.env.VITE_CONTACT_EMAIL) || 'autoeburni@gmail.com',
  contactPhone: clean(import.meta.env.VITE_CONTACT_PHONE),
  /** API AutoEburni (formulaire de contact). */
  apiUrl: (clean(import.meta.env.VITE_API_URL) || 'https://preview-api.autoeburni.ci/api/v1').replace(/\/+$/, ''),
} as const;

/** Numéro au format tel: (chiffres et + uniquement). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
