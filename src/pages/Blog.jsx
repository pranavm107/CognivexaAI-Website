import React from 'react';

const BlogPost = ({ title, category, date, excerpt, image, author, authorImage }) => (
    <div className="group cursor-pointer flex flex-col h-full">
        <div className="relative overflow-hidden rounded-xl mb-4 h-64">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#6C4CF0] uppercase tracking-wide">
                {category}
            </div>
        </div>
        <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-[#0b1220] mb-2 group-hover:text-[#6C4CF0] transition-colors line-clamp-2">
                {title}
            </h3>
            <p className="text-[#475467] text-sm mb-4 line-clamp-3 flex-1">
                {excerpt}
            </p>
            <div className="flex items-center gap-3 mt-auto">
                <img src={authorImage} alt={author} className="w-8 h-8 rounded-full object-cover" />
                <div>
                    <p className="text-sm font-medium text-[#0b1220]">{author}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
            </div>
        </div>
    </div>
);

const Blog = () => {
    const posts = [
        {
            title: " The Future of Generative AI in Enterprise",
            category: "Technology",
            date: "Mar 15, 2026",
            excerpt: "How large language models are reshaping internal workflows and customer interactions across Fortune 500 companies.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
            author: "Dr. David Chen",
            authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
        },
        {
            title: "Optimizing Neural Networks for Edge Devices",
            category: "Engineering",
            date: "Mar 10, 2026",
            excerpt: "Techniques for pruning and quantization that allow powerful models to run locally on mobile hardware without sacrificing accuracy.",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
            author: "Michael Chang",
            authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
        },
        {
            title: "Designing for AI Trust and Transparency",
            category: "Design",
            date: "Feb 28, 2026",
            excerpt: "Why explaining 'why' an AI made a decision is just as important as the decision itself in user interface design.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            author: "Emily Rodriguez",
            authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
        },
        {
            title: "The Ethics of Synthetic Data Generation",
            category: "Ethics",
            date: "Feb 15, 2026",
            excerpt: "Exploring the implications of training models on AI-generated content and the potential for preserving privacy while maintaining data utility.",
            image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
            author: "Sarah Jenkins",
            authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
        },
        {
            title: "Scaling Production ML Pipelines",
            category: "DevOps",
            date: "Jan 30, 2026",
            excerpt: "Best practices for MLOps when moving from a research prototype to a global application serving millions of requests.",
            image: "https://images.unsplash.com/photo-1558486012-8181480d423f?auto=format&fit=crop&q=80&w=800",
            author: "James Wilson",
            authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
        }
    ];

    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[#6C4CF0] font-semibold tracking-wide uppercase text-sm mb-3">Our Blog</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0b1220] mb-6">Latest Insights & News</h1>
                    <p className="text-xl text-[#475467] max-w-2xl mx-auto">
                        Thoughts on AI, technology, and the future of work from the Evolvex team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, index) => (
                        <BlogPost key={index} {...post} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-[#0b1220] text-white rounded-lg font-medium hover:bg-[#1a2b4b] transition-colors">
                        View All Posts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
