import React from 'react';

const PrivacyPolicy = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-[#0b1220] mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last Updated: January 28, 2026</p>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
                    <h2 className="text-lg font-semibold text-[#0b1220] mb-4">Table of Contents</h2>
                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {[
                            { id: 'introduction', title: '1. Introduction' },
                            { id: 'info-collect', title: '2. Information We Collect' },
                            { id: 'how-use', title: '3. How We Use Your Information' },
                            { id: 'legal-basis', title: '4. Legal Basis for Processing' },
                            { id: 'sharing', title: '5. Data Sharing and Disclosure' },
                            { id: 'cookies', title: '6. Cookies and Tracking' },
                            { id: 'security', title: '7. Data Security Measures' },
                            { id: 'rights', title: '8. User Rights' },
                            { id: 'third-party', title: '9. Third-Party Links' },
                            { id: 'children', title: '10. Children’s Privacy' },
                            { id: 'retention', title: '11. Data Retention Policy' },
                            { id: 'changes', title: '12. Changes to Policy' },
                            { id: 'contact', title: '13. Contact Details' },
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
                        <p>CognivexaAI is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                    </section>

                    <section id="info-collect" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Personal Information:</strong> We may collect personal information such as your name, email address, and phone number when you register or contact us.</li>
                            <li><strong>Usage Data:</strong> We automatically collect information about your interactions with our Services, including IP address, browser type, and pages visited.</li>
                            <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and analyze usage patterns.</li>
                        </ul>
                    </section>

                    <section id="how-use" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">3. How We Use Your Information</h2>
                        <p>We use the information we collect for various purposes, including:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>To provide, operate, and maintain our Services.</li>
                            <li>To improve, personalize, and expand our Services.</li>
                            <li>To communicate with you, including for customer service and marketing purposes.</li>
                            <li>To detect and prevent fraud and ensure security.</li>
                        </ul>
                    </section>

                    <section id="legal-basis" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">4. Legal Basis for Processing</h2>
                        <p>We process your personal data based on the following legal grounds:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Your consent.</li>
                            <li>Performance of a contract with you.</li>
                            <li>Compliance with legal obligations.</li>
                            <li>Our legitimate business interests.</li>
                        </ul>
                    </section>

                    <section id="sharing" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">5. Data Sharing and Disclosure</h2>
                        <p>We may share your information with:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our business.</li>
                            <li><strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities.</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or asset transfer.</li>
                        </ul>
                    </section>

                    <section id="cookies" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">6. Cookies and Tracking Technologies</h2>
                        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.</p>
                    </section>

                    <section id="security" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">7. Data Security Measures</h2>
                        <p>We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                    </section>

                    <section id="rights" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">8. User Rights</h2>
                        <p>Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal data. You may also have the right to object to processing and to data portability.</p>
                    </section>

                    <section id="third-party" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">9. Third-Party Links and Services</h2>
                        <p>Our Services may contain links to designated third-party websites. We are not responsible for the privacy practices or content of such third-party sites.</p>
                    </section>

                    <section id="children" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">10. Children’s Privacy</h2>
                        <p>Our Services are not intended for use by children under the age of 13. We do not knowingly collect personal identifiable information from children under 13.</p>
                    </section>

                    <section id="retention" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">11. Data Retention Policy</h2>
                        <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or as required by law.</p>
                    </section>

                    <section id="changes" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">12. Changes to Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    </section>

                    <section id="contact" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">13. Contact Details</h2>
                        <p>If you have any questions solely about this Privacy Policy, please contact us at:</p>
                        <p className="mt-2 font-medium">privacy@cognivexa.ai</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
