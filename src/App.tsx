import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Confidentialite, MentionsLegales, SuppressionCompte } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { Services } from './pages/Services';
import { Vendeurs } from './pages/Vendeurs';

// Toute nouvelle route publique doit aussi être ajoutée à ROUTES dans vite.config.ts (sitemap.xml).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="vendeurs" element={<Vendeurs />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentions-legales" element={<MentionsLegales />} />
        <Route path="confidentialite" element={<Confidentialite />} />
        <Route path="suppression-compte" element={<SuppressionCompte />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
