import { useRef, useState, type FormEvent } from 'react';
import { Icon } from '../components/Icon';
import { SosBlock } from '../components/SosBlock';
import { Turnstile, type TurnstileHandle } from '../components/Turnstile';
import { usePageMeta } from '../components/usePageMeta';
import { config, telHref } from '../config';

type Fields = { name: string; email: string; phone: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const SUBJECTS = [
  'Question sur un service',
  'Devenir vendeur / partenaire',
  'Assurance auto',
  'Signaler un problème',
  'Presse et partenariats',
  'Autre demande',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s.-]{8,20}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Indiquez votre nom (au moins 2 caractères).';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Indiquez une adresse e-mail valide, par exemple nom@exemple.ci.';
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = 'Le numéro de téléphone semble incorrect.';
  if (!f.subject) e.subject = 'Choisissez un sujet.';
  if (f.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  return e;
}

export function Contact() {
  usePageMeta(
    'Contact',
    "Une question, un partenariat ou besoin d'aide ? Contactez l'équipe AutoEburni. En cas d'urgence sur la route : SAMU 185, sapeurs-pompiers 180, police 170.",
  );
  const [fields, setFields] = useState<Fields>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState('');
  const turnstile = useRef<TurnstileHandle>(null);

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFailure('');
    const e = validate(fields);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (!captcha) return setFailure('Merci de valider la vérification anti-robot ci-dessus.');
    setSending(true);
    try {
      // Envoi direct à l'équipe (e-mail) ; « Répondre » dans notre messagerie vous écrit directement.
      const response = await fetch(`${config.apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: fields.name.trim(),
          email: fields.email.trim(),
          telephone: fields.phone.trim() || null,
          sujet: fields.subject,
          message: fields.message.trim(),
          captcha,
        }),
      });
      if (!response.ok) {
        const detail = ((await response.json().catch(() => null)) as { detail?: unknown } | null)?.detail;
        throw new Error(typeof detail === 'string' ? detail : '');
      }
      setSent(true);
      setFields({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : '';
      setFailure(
        `${message || 'Envoi impossible pour le moment.'} Vous pouvez aussi nous écrire directement à ${config.contactEmail}.`,
      );
    } finally {
      setSending(false);
      turnstile.current?.reset(); // un jeton ne sert qu'une fois
    }
  };

  const fieldProps = (k: keyof Fields) => ({
    id: `f-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `f-${k}-err` : undefined,
  });

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="field__err" id={`f-${k}-err`}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Contact</p>
          <h1>Parlons de votre projet</h1>
          <p className="page-hero__lead">
            Une question sur un service, une envie de rejoindre le réseau ou une remarque : écrivez-nous, nous vous
            répondons au plus vite.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <form className="form card" noValidate onSubmit={(ev) => void onSubmit(ev)} aria-labelledby="form-title">
            <h2 id="form-title">Envoyer un message</h2>
            <p className="muted">
              Les champs marqués d'un <span aria-hidden="true">*</span>
              <span className="sr-only">astérisque</span> sont obligatoires. Nous vous répondons par e-mail.
            </p>
            <div className="form__row">
              <div className="field">
                <label htmlFor="f-name">Nom complet *</label>
                <input type="text" autoComplete="name" required {...fieldProps('name')} />
                {err('name')}
              </div>
              <div className="field">
                <label htmlFor="f-email">E-mail *</label>
                <input type="email" autoComplete="email" required {...fieldProps('email')} />
                {err('email')}
              </div>
            </div>
            <div className="form__row">
              <div className="field">
                <label htmlFor="f-phone">Téléphone (facultatif)</label>
                <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+225 …" {...fieldProps('phone')} />
                {err('phone')}
              </div>
              <div className="field">
                <label htmlFor="f-subject">Sujet *</label>
                <select required {...fieldProps('subject')}>
                  <option value="">Choisir un sujet…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {err('subject')}
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-message">Message *</label>
              <textarea rows={6} required {...fieldProps('message')} />
              {err('message')}
            </div>
            <Turnstile ref={turnstile} onToken={setCaptcha} />
            <button type="submit" className="btn btn--primary" disabled={sending}>
              <Icon name="mail" size={18} /> {sending ? 'Envoi…' : 'Envoyer le message'}
            </button>
            <p className="form__status" role="status" aria-live="polite">
              {sent && 'Message envoyé, merci ! L’équipe AutoEburni vous répondra par e-mail rapidement.'}
            </p>
            {failure && (
              <p className="field__err" role="alert">
                {failure}
              </p>
            )}
          </form>

          <div className="contact-side">
            <div className="card">
              <h2>Nos coordonnées</h2>
              <ul className="contact-list">
                <li>
                  <Icon name="mail" size={20} />
                  <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
                </li>
                {config.contactPhone && (
                  <li>
                    <Icon name="phone" size={20} />
                    <a href={telHref(config.contactPhone)}>{config.contactPhone}</a>
                  </li>
                )}
              </ul>
            </div>
            <SosBlock />
          </div>
        </div>
      </section>
    </>
  );
}
