import * as React from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import LogoIntro from "./components/LogoIntro";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VendorFormPage from "./pages/VendorFormPage";
import VendorLandingPage from "./pages/VendorLandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  // Handler to show loader after login
  const handleLoginSuccess = () => {
    setIsLoading(true);
  };

  // Handler for loader complete
  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AnimatePresence mode="wait">
        {showIntro && (
          <LogoIntro onEnter={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!showIntro && isLoading && (
          <LoadingScreen onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>
      <div
        style={{
          opacity: showIntro || isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {!showIntro && !isLoading && (
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
    </div>
  );
}
