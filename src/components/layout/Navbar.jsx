import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuItem, Menu, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";

const Navbar = ({ onOpenOverlay }) => {
    // Basic mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const location = useLocation();

    // Scroll Logic for Smart Navbar
    const [isVisible, setIsVisible] = useState(true);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // Update visible state
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false); // Hide on scroll down
                } else {
                    setIsVisible(true); // Show on scroll up
                }
            } else {
                setIsVisible(true); // Always show at top
            }

            // Update scrolled state for style
            setIsScrolled(currentScrollY > 20);

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const moveIndicator = (target) => {
        const indicator = indicatorRef.current;
        const nav = navRef.current;
        if (!indicator || !target || !nav) return;

        const targetRect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        const relativeLeft = targetRect.left - navRect.left;
        const targetWidth = targetRect.width;
        const indicatorWidth = indicator.offsetWidth;

        const newLeft = relativeLeft + (targetWidth / 2) - (indicatorWidth / 2);

        indicator.style.left = `${newLeft}px`;
        indicator.style.opacity = '1';
    };

    const resetIndicator = () => {
        const nav = navRef.current;
        if (!nav) return;
        const activeLink = nav.querySelector('.nav-link.nav-link-active');
        if (activeLink) {
            moveIndicator(activeLink);
        } else {
            // Maybe hide if no active link?
            if (indicatorRef.current) indicatorRef.current.style.opacity = '0';
        }
    };

    useEffect(() => {
        // Initial positioning and on location change
        // Timeout to ensure DOM is ready/fonts loaded (similar to legacy)
        const activeLink = navRef.current?.querySelector('.nav-link.nav-link-active');

        if (activeLink) {
            moveIndicator(activeLink);
        } else {
            // If we are on a page not in nav (e.g. open-roles), we might want to hide it
            if (indicatorRef.current) indicatorRef.current.style.opacity = '0';
        }

        // Add minimal delay for safety
        setTimeout(resetIndicator, 50);

        window.addEventListener('resize', resetIndicator);
        return () => window.removeEventListener('resize', resetIndicator);
    }, [location.pathname]);

    const handleEnquireClick = (e) => {
        e.preventDefault();
        if (onOpenOverlay) {
            onOpenOverlay();
        } else {
            // Fallback for legacy behavior if prop not provided (though ID might be missing now)
            const overlay = document.getElementById('enquireOverlay');
            if (overlay) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    };

    const [active, setActive] = useState(null);

    return (
        <motion.header
            className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white border-b border-gray-200'}`}
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between h-[72px] relative">

                {/* Logo */}
                <div className="flex items-center z-50">
                    <Link to="/" className="flex items-center">
                        <img 
                            src="/assets/images/cognivexaai-logo.png" 
                            alt="CognivexaAI" 
                            className="h-14 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Nav Menu */}
                <nav
                    ref={navRef}
                    className={`
                        ${isOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white p-6 shadow-xl border-t border-gray-100' : 'hidden'}
                        md:flex md:flex-row md:items-center
                        md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                        md:w-auto md:bg-transparent md:p-0 md:shadow-none md:border-none
                        z-40
                    `}
                    id="mainNav" role="navigation" aria-label="Main"
                >
                    <div className="nav-indicator" id="navIndicator" ref={indicatorRef} style={{ opacity: 0 }}>
                        <div className="nav-indicator-dot"></div>
                        <div className="nav-indicator-bar"></div>
                    </div>

                    <Menu setActive={setActive} onMouseLeave={resetIndicator}>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => `nav-link font-medium text-sm transition-all duration-300 ${isActive ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700 hover:text-[#7c3aed]'} ${active === 'Home' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => {
                                moveIndicator(e.currentTarget);
                                setActive('Home');
                            }}
                        >
                            Home
                        </NavLink>

                        <MenuItem 
                            setActive={setActive} 
                            active={active} 
                            item="Services"
                            to="/services"
                            className={`font-medium text-sm ${location.pathname.startsWith('/services') ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700'} ${active === 'Services' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                            menuClassName="bg-[#ffffff] rounded-[20px] overflow-hidden border border-[#e5e7eb] shadow-[0_20px_50px_rgba(0,0,0,0.08),0_10px_30px_rgba(124,58,237,0.08)] w-full max-w-[580px] md:min-w-[580px]"
                        >
                            <div className="w-full md:w-[580px] p-2 pointer-events-auto">
                                {/* Header row */}
                                <div className="px-3 py-2 mb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[12px] font-[600] tracking-wide uppercase text-[#7c3aed]">
                                                Our Services
                                            </p>
                                            <p className="text-[12px] text-[#64748b] mt-0.5">
                                                10 specialized solutions for your business
                                            </p>
                                        </div>
                                        <span className="text-[11px] bg-[#f1f5f9] text-[#475569] px-2 py-1 rounded-[12px] font-[600]">
                                            10 Services
                                        </span>
                                    </div>
                                    <div className="h-px bg-[#e5e7eb] mt-3" />
                                </div>

                                {/* 2x2 Service Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-3">
                                    {[
                                        {
                                            title: "AI & Automation",
                                            desc: "Chatbots, workflow automation, AI agents & LLM integrations.",
                                            href: "/services#ai-automation",
                                            img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=120&h=70&fit=crop",
                                            badge: "AI",
                                            color: "bg-[#7c3aed]",
                                            textColor: "group-hover:text-[#7c3aed]"
                                        },
                                        {
                                            title: "Custom Software",
                                            desc: "Full-stack web apps, SaaS platforms & enterprise solutions.",
                                            href: "/services#custom-software",
                                            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&h=70&fit=crop",
                                            badge: "DEV",
                                            color: "bg-[#6366f1]",
                                            textColor: "group-hover:text-[#6366f1]"
                                        },
                                        {
                                            title: "Mobile App Development",
                                            desc: "Cross-platform iOS & Android apps with React Native & Flutter.",
                                            href: "/services#mobile-apps",
                                            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=120&h=70&fit=crop",
                                            badge: "DEV",
                                            color: "bg-[#6366f1]",
                                            textColor: "group-hover:text-[#6366f1]"
                                        },
                                        {
                                            title: "IoT Solutions",
                                            desc: "Smart devices, real-time monitoring & industrial IoT systems.",
                                            href: "/services#iot",
                                            img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=70&fit=crop",
                                            badge: "IOT",
                                            color: "bg-[#14b8a6]",
                                            textColor: "group-hover:text-[#14b8a6]"
                                        }
                                    ].map((service, i) => (
                                        <Link
                                            key={i}
                                            to={service.href}
                                            onClick={() => setActive(null)}
                                            className="group flex gap-3 p-3 bg-transparent rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]"
                                        >
                                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-r-full group-hover:h-1/2 transition-all duration-300 ${service.color}`} />
                                            <div className="relative shrink-0 pl-1">
                                                <img
                                                    src={service.img}
                                                    alt={service.title}
                                                    className="w-[88px] h-[56px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <span className="absolute top-1 left-1 text-[9px] font-[600] bg-[#f1f5f9] text-[#475569] px-1.5 py-0.5 rounded-md">
                                                    {service.badge}
                                                </span>
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <h4 className={`text-[13px] font-[600] text-[#0f172a] transition-colors duration-200 leading-tight mb-1 ${service.textColor}`}>
                                                    {service.title}
                                                </h4>
                                                <p className="text-[11px] text-[#64748b] leading-relaxed line-clamp-2">
                                                    {service.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-[#e5e7eb] mb-3 mx-3" />

                                {/* More services row — small pills */}
                                <div className="px-3 mb-3">
                                    <p className="text-[10px] text-[#64748b] uppercase font-[600] tracking-wider mb-2">
                                        Also Available
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["Web Development", "Startup MVP", "AI Tools & Integrations", "UI/UX Design", "DevOps", "Maintenance"].map((s) => (
                                            <Link
                                                key={s}
                                                to="/services"
                                                onClick={() => setActive(null)}
                                                className="text-[11px] text-[#475569] bg-[#f8fafc] border border-[#e5e7eb] hover:border-[#7c3aed] hover:text-[#7c3aed] px-2.5 py-1 rounded-[12px] transition-all duration-200 font-[500]"
                                            >
                                                {s}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom CTA */}
                                <div className="mt-2 -mx-2 -mb-2 p-4 bg-[#f8fafc] border-t border-[#e5e7eb] flex items-center justify-center rounded-b-[20px]">
                                    <Link
                                        to="/services"
                                        onClick={() => setActive(null)}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[12px] bg-[linear-gradient(135deg,#7c3aed,#6366f1)] text-white text-sm font-[600] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 group"
                                    >
                                        <span>View All 10 Services</span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                    </Link>
                                </div>
                            </div>
                        </MenuItem>

                        <NavLink
                            to="/portfolio"
                            className={({ isActive }) => `nav-link font-medium text-sm transition-all duration-300 ${isActive ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700 hover:text-[#7c3aed]'} ${active === 'Portfolio' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => {
                                moveIndicator(e.currentTarget);
                                setActive('Portfolio');
                            }}
                        >
                            Portfolio
                        </NavLink>

                        <MenuItem 
                            setActive={setActive} 
                            active={active} 
                            item="Pricing"
                            to="/pricing"
                            className={`font-medium text-sm ${location.pathname.startsWith('/pricing') ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700'} ${active === 'Pricing' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                            menuClassName="bg-[rgba(255,255,255,0.85)] backdrop-blur-[16px] rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_25px_60px_rgba(0,0,0,0.08),_0_25px_60px_rgba(124,58,237,0.10)] w-full max-w-[760px] md:min-w-[760px]"
                        >
                            <div className="w-full flex flex-col pointer-events-auto">
                                {/* Columns */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8">
                                    {/* Web Column */}
                                    <div className="flex flex-col">
                                        <p className="text-[12px] tracking-[0.1em] text-[#94a3b8] font-bold uppercase mb-3 pl-1">Web & Apps</p>
                                        <div className="flex flex-col gap-1">
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#6366f1] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#6366f1] transition-colors">Starter Website</span>
                                                    <span className="text-[#6366f1] text-[10px] font-[600]">from ₹10k</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">3-5 Pages, basic SEO</span>
                                            </Link>
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#6366f1] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#6366f1] transition-colors">Business Website</span>
                                                    <span className="text-[#6366f1] text-[10px] font-[600]">from ₹25k</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">Custom UI, CMS, Analytics</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* AI Column */}
                                    <div className="flex flex-col">
                                        <p className="text-[12px] tracking-[0.1em] text-[#94a3b8] font-bold uppercase mb-3 pl-1">AI Solutions</p>
                                        <div className="flex flex-col gap-1">
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#7c3aed] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#7c3aed] transition-colors">AI Starter</span>
                                                    <span className="text-[#7c3aed] text-[10px] font-[600]">from ₹30k</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">Basic workflows & GPT</span>
                                            </Link>
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#7c3aed] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#7c3aed] transition-colors">AI Growth</span>
                                                    <span className="text-[#7c3aed] text-[10px] font-[600]">from ₹80k</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">Dashboards & AI Memory</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* IoT Column */}
                                    <div className="flex flex-col">
                                        <p className="text-[12px] tracking-[0.1em] text-[#94a3b8] font-bold uppercase mb-3 pl-1">IoT Systems</p>
                                        <div className="flex flex-col gap-1">
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#14b8a6] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#14b8a6] transition-colors">IoT Starter</span>
                                                    <span className="text-[#14b8a6] text-[10px] font-[600]">from ₹40k</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">Sensors & basic display</span>
                                            </Link>
                                            <Link to="/pricing" onClick={() => setActive(null)} className="group flex flex-col p-3 rounded-[12px] hover:bg-[#f8fafc] hover:-translate-y-[2px] transition-all duration-300 relative border border-transparent hover:border-black/[0.04]">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#14b8a6] rounded-r-full group-hover:h-1/2 transition-all duration-300" />
                                                <div className="flex justify-between items-baseline mb-1 pl-1">
                                                    <span className="text-[#0f172a] font-[600] text-[13px] group-hover:text-[#14b8a6] transition-colors">IoT Growth</span>
                                                    <span className="text-[#14b8a6] text-[10px] font-[600]">from ₹1L</span>
                                                </div>
                                                <span className="text-[#64748b] text-[11px] leading-tight pl-1">Multi-device tracking</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom CTA */}
                                <div className="p-4 px-6 sm:px-8 bg-[linear-gradient(135deg,rgba(124,58,237,0.05),rgba(99,102,241,0.05))] flex flex-col sm:flex-row items-center justify-between border-t border-black/[0.04] gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-[600] text-[#0f172a]">Not sure what you need?</span>
                                        <span className="text-[11px] text-[#64748b]">Compare all packages side-by-side on our pricing page.</span>
                                    </div>
                                    <Link to="/pricing" onClick={() => setActive(null)} className="shrink-0 px-6 py-2.5 bg-gradient-to-br from-[#7c3aed] to-[#6366f1] text-white rounded-[10px] text-xs font-[700] shadow-md hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)] transition-all duration-300">
                                        View Full Pricing →
                                    </Link>
                                </div>
                            </div>
                        </MenuItem>

                        <NavLink
                            to="/about"
                            className={({ isActive }) => `nav-link font-medium text-sm transition-all duration-300 ${isActive ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700 hover:text-[#7c3aed]'} ${active === 'About' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => {
                                moveIndicator(e.currentTarget);
                                setActive('About');
                            }}
                        >
                            About
                        </NavLink>
 
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `nav-link font-medium text-sm transition-all duration-300 ${isActive ? 'nav-link-active text-[#7c3aed]' : 'text-gray-700 hover:text-[#7c3aed]'} ${active === 'Contact' ? '!text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]' : ''}`}
                            onMouseEnter={(e) => {
                                moveIndicator(e.currentTarget);
                                setActive('Contact');
                            }}
                        >
                            Contact
                        </NavLink>
                    </Menu>
                </nav>
                <a 
                    href="#" 
                    className="hidden md:inline-flex btn-enquire items-center justify-center whitespace-nowrap px-8 min-w-[160px] hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg hover:shadow-indigo-500/25" 
                    id="openEnquire" 
                    onClick={handleEnquireClick}
                >
                    Book a Free Call
                </a>

                <button id="navToggle" aria-expanded={isOpen} onClick={toggleMenu}
                    className="md:hidden text-[#0b1220] font-semibold text-[15px]">Menu</button>
            </div>
        </motion.header>
    );
};

export default Navbar;
