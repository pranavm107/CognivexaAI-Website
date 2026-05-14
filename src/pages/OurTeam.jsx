import React from 'react';

const TeamMember = ({ name, role, image, bio }) => (
    <div className="group relative">
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
            <img
                src={image}
                alt={name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {bio}
                </p>
                <div className="flex gap-4 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {/* Social icons could go here */}
                </div>
            </div>
        </div>
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-[#0b1220]">{name}</h3>
            <p className="text-[#6C4CF0] font-medium">{role}</p>
        </div>
    </div>
);

const OurTeam = () => {
    const team = [
        {
            name: "Sarah Jenkins",
            role: "Chief Executive Officer",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
            bio: "Former VP at TechCorp with 15 years of experience in AI strategy and business development."
        },
        {
            name: "David Chen",
            role: "Chief Technology Officer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
            bio: "PhD in Machine Learning from Stanford. Leads our core AI research and infrastructure."
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Product",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
            bio: "Product visionary focused on human-centric AI design and intuitive user experiences."
        },
        {
            name: "Michael Chang",
            role: "Lead AI Engineer",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
            bio: "Specializes in NLP and large language models. Previously at DeepMind."
        },
        {
            name: "Olivia Watson",
            role: "Design Director",
            image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800",
            bio: "Award-winning designer passionate about crafting beautiful, functional interfaces."
        },
        {
            name: "James Wilson",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
            bio: "Ensures smooth execution of company strategy and operational excellence."
        }
    ];

    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#6C4CF0] font-semibold tracking-wide uppercase text-sm mb-3">Our Team</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0b1220] mb-6">Meet the Minds Behind Evolvex</h1>
                    <p className="text-xl text-[#475467]">
                        We’re a diverse group of researchers, engineers, and designers working together to build the future of artificial intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {team.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
