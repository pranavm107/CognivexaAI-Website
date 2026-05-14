import React, { useEffect } from 'react';
import SEO from '../components/layout/SEO';
import PortfolioHero from '../components/portfolio/PortfolioHero';
import CapabilitiesGrid from '../components/portfolio/CapabilitiesGrid';
import OurApproach from '../components/portfolio/OurApproach';
import WhyWorkWithUs from '../components/portfolio/WhyWorkWithUs';
import SampleWorks from '../components/portfolio/SampleWorks';
import PortfolioCTA from '../components/portfolio/PortfolioCTA';

const Portfolio = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <SEO 
                title="Portfolio | Engineering & AI Solutions" 
                description="Explore our technical capabilities in AI automation, SaaS, and digital product engineering. Professional solutions built for modern businesses."
                keywords="AI agency portfolio, software capabilities, automation concepts, digital transformation"
            />
            
            <PortfolioHero />
            
            <CapabilitiesGrid />
            
            <OurApproach />
            
            <WhyWorkWithUs />

            <SampleWorks />
            
            <PortfolioCTA />
        </div>
    );
};


export default Portfolio;
