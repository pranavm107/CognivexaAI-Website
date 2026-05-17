/**
 * Reusable metadata templates for pricing plan inquiry workflow automation.
 * Maps pricing keys to their service category, budget, timeline, and message templates.
 */
export const pricingInquiryTemplates = {
    starterWebsite: {
        service: "Web Development",
        budget: "< $5k",
        timeline: "Immediate",
        message: "I am interested in the Starter Website package. Please share implementation details, pricing confirmation, delivery timeline, and next steps."
    },
    businessWebsite: {
        service: "Web Development",
        budget: "$5k - $20k",
        timeline: "1-3 Months",
        message: "I am interested in the Business Website package and would like to discuss project scope, customization options, timeline, and deployment process."
    },
    webAppSaas: {
        service: "Custom Software",
        budget: "$20k - $50k",
        timeline: "3-6 Months",
        message: "I am interested in developing a scalable Web App / SaaS platform similar to your pricing offering. Please share technical consultation details and estimated roadmap."
    },
    aiStarter: {
        service: "AI & Automation",
        budget: "$5k - $20k",
        timeline: "1-3 Months",
        message: "I am interested in the AI Starter package for automation and AI integration. Please share implementation details and available customization options."
    },
    aiGrowth: {
        service: "AI & Automation",
        budget: "$20k - $50k",
        timeline: "1-3 Months",
        message: "I am interested in the AI Growth package including dashboards, workflow automation, and AI integrations. Please contact me with a consultation plan."
    },
    aiEnterprise: {
        service: "AI & Automation",
        budget: "$50k+",
        timeline: "3-6 Months",
        message: "I am interested in enterprise-grade AI systems and would like to schedule a strategic consultation regarding architecture, implementation, and scaling."
    },
    iotStarter: {
        service: "IoT Systems",
        budget: "$20k - $50k",
        timeline: "1-3 Months",
        message: "I am interested in the IoT Starter package and would like more information regarding sensors, dashboards, integrations, and deployment."
    },
    iotGrowth: {
        service: "IoT Systems",
        budget: "$20k - $50k",
        timeline: "3-6 Months",
        message: "I am interested in the IoT Growth solution with analytics and real-time monitoring. Please contact me regarding implementation strategy and pricing."
    },
    iotAdvanced: {
        service: "IoT Systems",
        budget: "$50k+",
        timeline: "3-6 Months",
        message: "I am interested in enterprise IoT infrastructure and advanced automation systems. Please schedule a consultation for architecture planning."
    },
    smartSystemPackage: {
        service: "Custom Software",
        budget: "$50k+",
        timeline: "3-6 Months",
        message: "I am interested in the Smart System Package including IoT systems, AI integration, analytics dashboard, mobile app, and backend infrastructure. Please share a strategic consultation plan."
    },
    consultation: {
        service: "AI & Automation",
        budget: "$5k - $20k",
        timeline: "1-3 Months",
        message: "I am interested in scheduling a free strategy consultation to discuss my business requirements and explore suitable solutions."
    }
};

/**
 * Dynamically retrieves a pricing plan template based on the pricing key.
 * If no key matches, provides safe dynamic defaults.
 * 
 * @param {string} pricingKey 
 * @returns {{ service: string, budget: string, timeline: string, message: string }}
 */
export const getPricingTemplate = (pricingKey) => {
    if (pricingKey && pricingInquiryTemplates[pricingKey]) {
        return pricingInquiryTemplates[pricingKey];
    }
    
    // High-quality defaults fallback
    return {
        service: "Custom Software",
        budget: "$5k - $20k",
        timeline: "1-3 Months",
        message: "I am interested in exploring customized pricing packages for my project requirements. Please contact me to discuss details."
    };
};
