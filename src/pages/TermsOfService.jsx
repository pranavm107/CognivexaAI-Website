import React from 'react';

const TermsOfService = () => {
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
                    <h1 className="text-4xl font-bold text-[#0b1220] mb-4">Terms of Service</h1>
                    <p className="text-gray-500">Last Updated: January 28, 2026</p>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
                    <h2 className="text-lg font-semibold text-[#0b1220] mb-4">Table of Contents</h2>
                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {[
                            { id: 'overview', title: '1. Overview of Services' },
                            { id: 'acceptance', title: '2. Acceptance of Terms' },
                            { id: 'availability', title: '3. Service Access' },
                            { id: 'obligations', title: '4. User Obligations' },
                            { id: 'payment', title: '5. Payment Terms' },
                            { id: 'intellectual-property', title: '6. IP Rights & Licensing' },
                            { id: 'restrictions', title: '7. Restrictions' },
                            { id: 'liability', title: '8. Limitation of Liability' },
                            { id: 'indemnification', title: '9. Indemnification' },
                            { id: 'termination', title: '10. Termination' },
                            { id: 'distputes', title: '11. Dispute Resolution' },
                            { id: 'changes', title: '12. Changes to Terms' },
                            { id: 'contact', title: '13. Contact Information' },
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
                    <section id="overview" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">1. Overview of Services</h2>
                        <p>CognivexaAI provides various AI and software solutions ("Services") designed to enhance business operations. These Terms of Service ("Terms") govern your use of our Services.</p>
                    </section>

                    <section id="acceptance" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">2. Acceptance of Terms</h2>
                        <p>By accessing or using our Services, you agree to be legally bound by these Terms and all terms incorporated by reference.</p>
                    </section>

                    <section id="availability" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">3. Service Access and Availability</h2>
                        <p>We strive to ensure our Services are available 24/7, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the Services at any time.</p>
                    </section>

                    <section id="obligations" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">4. User Obligations and Responsibilities</h2>
                        <p>You agree to use the Services responsibly and in compliance with all applicable laws. You shall not use the Services for any illegal or unauthorized purpose.</p>
                    </section>

                    <section id="payment" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">5. Payment Terms</h2>
                        <p>Certain aspects of the Services may be provided for a fee. You agree to pay all applicable fees in connection with your use of such Services. All payments are non-refundable unless otherwise stated.</p>
                    </section>

                    <section id="intellectual-property" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">6. Intellectual Property Rights and Licensing</h2>
                        <p>CognivexaAI retains all rights, title, and interest in and to the Services. We grant you a limited, non-exclusive, non-transferable license to strictly use the Services for your internal business purposes.</p>
                    </section>

                    <section id="restrictions" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">7. Restrictions</h2>
                        <p>You may not reverse engineer, decompile, or disassemble any aspect of the Services, or attempt to derive source code from the Services.</p>
                    </section>

                    <section id="liability" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">8. Disclaimers and Limitation of Liability</h2>
                        <p>To the maximum extent permitted by law, CognivexaAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
                    </section>

                    <section id="indemnification" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">9. Indemnification Clause</h2>
                        <p>You agree to indemnify and hold harmless CognivexaAI and its affiliates, officers, agents, and employees from any claim or demand arising out of your use of the Services or violation of these Terms.</p>
                    </section>

                    <section id="termination" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">10. Termination and Suspension</h2>
                        <p>We may terminate or suspend your access to the Services immediately, without prior notice, if you breach these Terms. Upon termination, your right to use the Services will cease immediately.</p>
                    </section>

                    <section id="distputes" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">11. Dispute Resolution and Governing Law</h2>
                        <p>Any disputes arising out of or related to these Terms shall be resolved through binding arbitration in accordance with the laws of our operating jurisdiction.</p>
                    </section>

                    <section id="changes" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">12. Changes to Service Terms</h2>
                        <p>We reserve the right to modify these Terms at any time. We will notify you of any material changes via email or through a prominent notice on our Services.</p>
                    </section>

                    <section id="contact" className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#0b1220] mb-4">13. Contact Information</h2>
                        <p>For any questions regarding these Terms of Service, please contact us at:</p>
                        <p className="mt-2 font-medium">hello@cognivexa.ai</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
