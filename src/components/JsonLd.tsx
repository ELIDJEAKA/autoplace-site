/** Données structurées (schema.org) lues par Google. Bloc de données, non exécutable : compatible avec la CSP. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // `<` échappé pour qu'un texte ne puisse jamais refermer la balise <script>.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
