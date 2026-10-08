/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { Manifesto } from './components/Manifesto';
import { ArtworkDetails } from './components/ArtworkDetails';
import { ManifestoPage } from './components/ManifestoPage';
import { ArtistsPage } from './components/ArtistsPage';
import { ArtistDetails } from './components/ArtistDetails';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollToTop } from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { CartDrawer } from './components/CartDrawer';
import { FeaturedArtist } from './components/FeaturedArtist';
import { PageReveal } from './components/PageTransition';

import { CheckoutPage } from './components/CheckoutPage';
import { OrdersPage } from './components/OrdersPage';
import { SettingsPage } from './components/SettingsPage';
import { ExhibitionsPage } from './components/ExhibitionsPage';
import { ExhibitionDetailsPage } from './components/ExhibitionDetailsPage';
import { ContactsPage } from './components/ContactsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { CookiePolicyPage } from './components/CookiePolicyPage';
import { TermsPage } from './components/TermsPage';
import { PageTransition, Versione2MotionSystem } from './versione2/Versione2Motion';

const Versione2Page = lazy(() => import('./versione2/Versione2Page'));
const Versione2ProjectPage = lazy(() => import('./versione2/Versione2ProjectPage'));
const Versione2ArchivePage = lazy(() => import('./versione2/Versione2ArchivePage'));

function Versione2Route({ children }: { children: ReactNode }) {
  return (
    <Versione2MotionSystem>
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen bg-[#f0ece3]" />}>
          {children}
        </Suspense>
      </PageTransition>
    </Versione2MotionSystem>
  );
}

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageReveal />
      <Hero />
      <Manifesto />
      <FeaturedArtist />
      <Gallery />
    </motion.div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Router>
            <AppShell />
          </Router>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const isVersione2 = location.pathname.startsWith('/versione2');

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black">
        {!isVersione2 && <Header />}
        {!isVersione2 && <CartDrawer />}
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/opera/:id" element={<ArtworkDetails />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/artisti" element={<ArtistsPage />} />
            <Route path="/artisti/:id" element={<ArtistDetails />} />
            <Route path="/mostre" element={<ExhibitionsPage />} />
            <Route path="/mostre/:id" element={<ExhibitionDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ordini" element={<OrdersPage />} />
            <Route path="/impostazioni" element={<SettingsPage />} />
            <Route path="/contatti" element={<ContactsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/termini-e-condizioni" element={<TermsPage />} />
            <Route path="/versione2" element={<Versione2Route><Versione2Page /></Versione2Route>} />
            <Route path="/versione2/archivio" element={<Versione2Route><Versione2ArchivePage /></Versione2Route>} />
            <Route path="/versione2/progetti/:slug" element={<Versione2Route><Versione2ProjectPage /></Versione2Route>} />
          </Routes>
        </AnimatePresence>
        {!isVersione2 && <Footer />}
      </div>
    </>
  );
}
