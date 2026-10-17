const clean = (v: string | undefined) => (v ?? '').trim();
const dashboard = (clean(import.meta.env.VITE_DASHBOARD_URL) || 'http://45.90.161.191:5173').replace(/\/+$/, '');

export const config = {
  dashboardUrl: dashboard,
  dashboardLogin: `${dashboard}/login`,
  dashboardRegister: `${dashboard}/register`,
  playStoreUrl: clean(import.meta.env.VITE_PLAY_STORE_URL),
  appStoreUrl: clean(import.meta.env.VITE_APP_STORE_URL),
  contactEmail: clean(import.meta.env.VITE_CONTACT_EMAIL) || 'contact@autoplace.ci',
  contactPhone: clean(import.meta.env.VITE_CONTACT_PHONE),
} as const;

/** Numéro au format tel: (chiffres et + uniquement). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
