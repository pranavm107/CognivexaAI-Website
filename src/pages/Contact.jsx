import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ContactSection from '../components/sections/ContactSection';
import '../styles/ContactPremium.css';

const Contact = () => {
    const location = useLocation();
    const heroRef = useRef(null);

    // Scroll restoration and handling
    React.useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        if (location.state?.scrollToContact) {
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 600);
        }
    }, [location]);

    // Intersection Observer for animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const currentHero = heroRef.current;
        if (currentHero) observer.observe(currentHero);

        return () => {
            if (currentHero) observer.unobserve(currentHero);
        };
    }, []);

    return (
        <div className="contact-premium-page pt-32 pb-0 min-h-screen">
            {/* Hero Section */}
            <div ref={heroRef} className="animate-on-scroll animate-hero max-w-7xl mx-auto px-6 text-center mb-20">
                <span className="hero-label block mb-4">GET IN TOUCH</span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0a0a0a] mb-6 tracking-tight">
                    Let's Build Something <span className="premium-gradient-text">Meaningful</span>
                </h1>
                <p className="text-[#6b7280] text-[17px] leading-relaxed mx-auto max-w-[600px] mb-8">
                    Have an idea, a problem, or a system that needs improvement? Let's discuss how we can help you design, build, and scale it.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                    <div className="response-pill">
                        <span>⚡ We typically respond within 24 hours</span>
                    </div>
                    <p className="text-[#9ca3af] text-[13px]">
                        No spam. No unnecessary calls. Just clear communication.
                    </p>
                </div>
            </div>

            {/* Main Section - Uses the premium ContactSection component */}
            <ContactSection />
        </div>
    );
};

export default Contact;



