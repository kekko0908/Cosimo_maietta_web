import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
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

function LegacyVersione2Redirect() {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/versione2/, '') || '/';
  return <Navigate to={{ pathname, search: location.search, hash: location.hash }} replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Versione2Route><Versione2Page /></Versione2Route>} />
        <Route path="/archivio" element={<Versione2Route><Versione2ArchivePage /></Versione2Route>} />
        <Route path="/progetti/:slug" element={<Versione2Route><Versione2ProjectPage /></Versione2Route>} />
        <Route path="/versione2/*" element={<LegacyVersione2Redirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
