import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll } from "framer-motion";
import Navbar from './Navbar';
import Footer from './Footer';

// Lazy load the heavy overlay component
const EnquiryOverlay = lazy(() => import('./EnquiryOverlay'));

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[99999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, #7c3aed, #a855f7, #3b82f6)"
      }}
    />
  );
}

const Layout = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const location = useLocation();

    // Close overlay on route change
    useEffect(() => {
        setIsOverlayOpen(false);
    }, [location.pathname]);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isOverlayOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOverlayOpen]);

    const openOverlay = () => setIsOverlayOpen(true);
    const closeOverlay = () => setIsOverlayOpen(false);

    return (
        <div className="font-sans antialiased text-[#0b1220] bg-white">
            <ScrollProgressBar />
            <Navbar onOpenOverlay={openOverlay} />
            <main className="relative overflow-x-hidden scroll-smooth">
                <Outlet context={{ openOverlay }} />
            </main>
            <Footer />

            {/* Lazy Loaded Overlay - Only mounts when needed (or preloaded) */}
            <Suspense fallback={null}>
                {isOverlayOpen && (
                    <EnquiryOverlay
                        isOpen={isOverlayOpen}
                        onClose={closeOverlay}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default Layout;
