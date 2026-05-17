/**
 * Reusable metadata templates for portfolio inquiry workflow automation.
 * Maps portfolio build slugs to their contextual service category and requirement templates.
 */
export const portfolioInquiryTemplates = {
    "ai-customer-support-system": {
        service: "AI & Automation",
        budget: "$5k - $20k",
        timeline: "1-3 Months",
        message: "I am interested in building a solution similar to the AI Customer Support System shown in your portfolio. Please share more details, estimated pricing, implementation timeline, and possible customization options for my business."
    },
    "predictive-analytics-engine": {
        service: "AI & Automation",
        budget: "$20k - $50k",
        timeline: "3-6 Months",
        message: "I am interested in building a solution similar to the Predictive Analytics Engine shown in your portfolio. Please share more details, estimated pricing, implementation timeline, and possible customization options for my business."
    },
    "autonomous-agent-workflow": {
        service: "AI & Automation",
        budget: "$20k - $50k",
        timeline: "1-3 Months",
        message: "I am interested in building a solution similar to the Autonomous Agent Workflow shown in your portfolio. Please share more details, estimated pricing, implementation timeline, and possible customization options for my business."
    }
};

/**
 * Dynamically retrieves a template or generates a tailored one on the fly for any build.
 * This guarantees the system scales automatically for all current and future portfolio builds.
 * 
 * @param {string} slug - The slug of the portfolio build.
 * @param {string} buildTitle - The title of the portfolio build.
 * @param {string} buildBadge - The badge/category of the portfolio build.
 * @returns {{ service: string, budget: string, timeline: string, message: string }}
 */
export const getPortfolioTemplate = (slug, buildTitle, buildBadge) => {
    if (slug && portfolioInquiryTemplates[slug]) {
        return portfolioInquiryTemplates[slug];
    }
    
    // Dynamic fallback generation based on badge/category mapping
    let service = "AI & Automation"; // Default fallback
    const badgeLower = (buildBadge || "").toLowerCase();
    
    if (badgeLower.includes("software") || badgeLower.includes("custom")) {
        service = "Custom Software";
    } else if (badgeLower.includes("web") || badgeLower.includes("frontend") || badgeLower.includes("backend")) {
        service = "Web Development";
    } else if (badgeLower.includes("mobile") || badgeLower.includes("app") || badgeLower.includes("ios") || badgeLower.includes("android")) {
        service = "Mobile App";
    } else if (badgeLower.includes("iot") || badgeLower.includes("hardware")) {
        service = "IoT Solutions";
    } else if (badgeLower.includes("design") || badgeLower.includes("ui") || badgeLower.includes("ux")) {
        service = "UI/UX Design";
    } else if (badgeLower.includes("devops") || badgeLower.includes("cloud") || badgeLower.includes("infra")) {
        service = "DevOps";
    } else if (badgeLower.includes("mvp") || badgeLower.includes("startup")) {
        service = "Startup MVP";
    } else if (badgeLower.includes("ai") || badgeLower.includes("automation") || badgeLower.includes("model")) {
        service = "AI & Automation";
    }

    const title = buildTitle || "portfolio build";
    const budget = "$5k - $20k"; // Intelligent dynamic default budget
    const timeline = "1-3 Months"; // Intelligent dynamic default timeline
    const message = `I am interested in building a solution similar to the ${title} shown in your portfolio. Please share more details, estimated pricing, implementation timeline, and possible customization options for my business.`;

    return { service, budget, timeline, message };
};
