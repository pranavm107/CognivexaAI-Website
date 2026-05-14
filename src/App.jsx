import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Booking = lazy(() => import('./pages/Booking'))
const ConceptBuildDetail = lazy(() => import('./pages/ConceptBuildDetail'))

const TermsOfUse = lazy(() => import('./pages/TermsOfUse'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const OurTeam = lazy(() => import('./pages/OurTeam'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Blog = lazy(() => import('./pages/Blog'))

// Simple Loading Fallback
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-[#0b1220]">
        <div className="w-10 h-10 border-4 border-[#6C4CF4]/30 border-t-[#6C4CF4] rounded-full animate-spin"></div>
    </div>
)

const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes'));
const ClientRoutes = lazy(() => import('./client/routes/ClientRoutes'));

function App() {
    return (
        <>
            <ScrollToTop />
            <Toaster position="top-right" />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="/client/*" element={<ClientRoutes />} />
                    
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Services />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="portfolio/builds/:slug" element={<ConceptBuildDetail />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="booking" element={<Booking />} />

                        <Route path="terms-of-use" element={<TermsOfUse />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="terms-of-service" element={<TermsOfService />} />
                        <Route path="our-team" element={<OurTeam />} />
                        <Route path="faq" element={<FAQ />} />
                        <Route path="blog" element={<Blog />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default App
