import React from 'react';

const TermsOfUse = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white py-10 md:py-undefined">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-[#0b1220] mb-4">Terms of Use</h1>
                    <p className="text-gray-500">Last Updated: January 28, 2026</p>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
                    <h2 className="text-lg font-semibold text-[#0b1220] mb-4">Table of Contents</h2>
                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {[
                            { id: 'introduction', title: '1. Introduction' },
                            { id: 'eligibility', title: '2. Eligibility' },
                            { id: 'account-terms', title: '3. Account Terms' },
                            { id: 'use-of-services', title: '4. Use of Services' },
                            { id: 'intellectual-property', title: '5. Intellectual Property Rights' },
                            { id: 'user-content', title: '6. User Content' },
                            { id: 'disclaimers', title: '7. Disclaimers' },
                            { id: 'termination', title: '8. Termination' },
                            { id: 'governing-law', title: '9. Governing Law' },
                            { id: 'changes', title: '10. Changes to Terms' },
                            { id: 'contact', title: '11. Contact Information' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left text-[#475467] hover:text-[#6C4CF0] transition-colors text-sm"
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="space-y-12 text-[#475467] leading-relaxed">
                    <section id="introduction" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">1. Introduction</h2>
                        <p>Welcome to CognivexaAI. By accessing or using our website, services, or applications (collectively, the "Services"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our Services.</p>
                    </section>

                    <section id="eligibility" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">2. Eligibility</h2>
                        <p>You must be at least 18 years old or the age of majority in your jurisdiction to use our Services. By using CognivexaAI, you represent and warrant that you meet this requirement.</p>
                    </section>

                    <section id="account-terms" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">3. Account Terms</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You are solely responsible for all activities that occur under your account.</li>
                            <li>You agree to provide accurate, current, and complete information during the registration process.</li>
                        </ul>
                    </section>

                    <section id="use-of-services" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">4. Use of Services</h2>
                        <p>You agree to use the Services only for lawful purposes. You are prohibited from:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Violating any applicable local, state, national, or international law.</li>
                            <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
                            <li>Harassing, abusing, insulting, or harming others.</li>
                            <li>Uploading or transmitting viruses or any other type of malicious code.</li>
                        </ul>
                    </section>

                    <section id="intellectual-property" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">5. Intellectual Property Rights</h2>
                        <p>All content, features, and functionality regarding the Services, including but not limited to text, graphics, logos, icons, and images, are the property of CognivexaAI or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                    </section>

                    <section id="user-content" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">6. User Content</h2>
                        <p>You retain ownership of any content you submit or upload to the Services ("User Content"). However, by submitting User Content, you grant CognivexaAI a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content in connection with providing the Services.</p>
                    </section>

                    <section id="disclaimers" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">7. Disclaimers</h2>
                        <p>The Services are provided on an "as is" and "as available" basis. CognivexaAI makes no representations or warranties of any kind, express or implied, regarding the operation of the Services or the information, content, or materials included therein.</p>
                    </section>

                    <section id="termination" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">8. Termination</h2>
                        <p>We reserve the right to suspend or authenticate your account and restrict access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </section>

                    <section id="governing-law" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">9. Governing Law</h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which CognivexaAI operates, without regard to its conflict of law provisions.</p>
                    </section>

                    <section id="changes" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">10. Changes to Terms</h2>
                        <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                    </section>

                    <section id="contact" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">11. Contact Information</h2>
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <p className="mt-2 font-medium">hello@cognivexa.ai</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
