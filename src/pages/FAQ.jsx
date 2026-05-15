import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-[#0b1220]">{question}</span>
                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-[#6C4CF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-[#475467] leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "What is CognivexaAI?",
            answer: "CognivexaAI is a specialized AI development agency that builds custom automation systems, AI-powered tools, and scalable software solutions for businesses and startups."
        },
        {
            question: "How do you help businesses with AI?",
            answer: "We analyze your business workflows to identify automation opportunities, then design and develop custom AI solutions—from internal tools and chatbots to complex predictive models and automated data pipelines."
        },
        {
            question: "Is my data secure?",
            answer: "Security is our top priority. We implement industry-standard encryption, secure cloud architectures, and follow best practices for data handling to ensure your business information remains private and protected."
        },
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary based on complexity. A simple automation tool might take 2-4 weeks, while a full-scale AI platform can take 3-6 months. We work in agile sprints to ensure you see progress every week."
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes, we provide ongoing maintenance and support packages to ensure your AI systems continue to perform optimally as your business grows and technology evolves."
        },
        {
            question: "How do I get started?",
            answer: "The best way is to book a free consultation call. We'll discuss your business challenges and determine if our AI solutions are the right fit for your goals."
        }
    ];

    return (
        <div className="bg-white py-10 md:py-undefined">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[#6C4CF0] font-semibold tracking-wide uppercase text-sm mb-3">Support</h2>
                    <h1 className="text-4xl font-bold text-[#0b1220] mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-[#475467]">
                        Everything you need to know about the product and billing. Can’t find the answer you’re looking for? <a href="/contact" className="text-[#6C4CF0] font-medium hover:underline">Contact our support team.</a>
                    </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
