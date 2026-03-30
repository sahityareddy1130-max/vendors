
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VendorFormPage from './pages/VendorFormPage';
import VendorLandingPage from './pages/VendorLandingPage';
import NotFoundPage from './pages/NotFoundPage';
import LogoIntro from './components/LogoIntro';


function App() {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {showIntro && <LogoIntro onEnter={() => setShowIntro(false)} />}
      {!showIntro && (
        <>
          <Navbar />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<VendorFormPage />} />
              <Route path="/vendor/:shopname" element={<VendorLandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
