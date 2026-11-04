import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition, Versione2MotionSystem } from './versione2/Versione2Motion';

const Versione2Page = lazy(() => import('./versione2/Versione2Page'));
const AboutPage = lazy(() => import('./versione2/AboutPage'));
const Versione2ArchivePage = lazy(() => import('./versione2/Versione2ArchivePage'));
const CollectionPage = lazy(() => import('./versione2/CollectionPage'));
const PrivacyPage = lazy(() => import('./versione2/PrivacyPage'));

function Versione2Route({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <Versione2MotionSystem>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div className="min-h-screen bg-[#f0ece3]" />}>
          {children}
        </Suspense>
      </PageTransition>
    </Versione2MotionSystem>
  );
}

function LegacyVersione2Redirect() {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/versione2/, '') || '/';
  return <Navigate to={{ pathname, search: location.search, hash: location.hash }} replace />;
}

function LegacyProjectRedirect() {
  const { slug } = useParams();
  const location = useLocation();
  const paths: Record<string, string> = { 'volti-monochrome': '/fotografia/bianco-e-nero', 'editorial-portraits': '/fotografia/sala-posa', 'light-outside': '/fotografia/in-esterna' };
  return <Navigate to={{ pathname: paths[slug ?? ''] ?? '/archivio', search: location.search }} replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Versione2Route><Versione2Page /></Versione2Route>} />
        <Route path="/archivio" element={<Versione2Route><Versione2ArchivePage /></Versione2Route>} />
        <Route path="/chi-sono" element={<Versione2Route><AboutPage /></Versione2Route>} />
        <Route path="/fotografia/:slug" element={<Versione2Route><CollectionPage /></Versione2Route>} />
        <Route path="/geometra/cantieri" element={<Versione2Route><CollectionPage collectionSlug="cantieri" /></Versione2Route>} />
        <Route path="/privacy" element={<Versione2Route><PrivacyPage /></Versione2Route>} />
        <Route path="/progetti/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/versione2/*" element={<LegacyVersione2Redirect />} />
        <Route path="*" element={<Versione2Route><CollectionPage collectionSlug="not-found" /></Versione2Route>} />
      </Routes>
    </Router>
  );
}
