import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import ThemeChanger from '../components/ThemeChanger'

// Blog data
const blogPosts = [
    {
        title: 'AI Driven Web Development',
        pubDate: '2024-12-15',
        description: 'Exploring how AI is transforming the way we build web applications.',
        heroImage: '/blog-images/ai-web-dev.webp',
        tags: ['AI', 'Web Development'],
        readingTime: '5 min',
        slug: 'ai-driven-web-development',
    },
    {
        title: 'Claude AI: Frontier Intelligence',
        pubDate: '2024-12-10',
        description: "A deep dive into Anthropic's Claude and its capabilities.",
        heroImage: '/blog-images/claude-ai.webp',
        tags: ['AI', 'Claude'],
        readingTime: '8 min',
        slug: 'claude-ai-frontier-intelligence',
    },
    {
        title: 'Progressive Web Apps in 2025',
        pubDate: '2024-11-20',
        description: 'The future of PWAs and what developers need to know.',
        heroImage: '/blog-images/pwa-2025.webp',
        tags: ['PWA', 'Web Development'],
        readingTime: '6 min',
        slug: 'progressive-web-apps-2025',
    },
    {
        title: 'Vibe Engineering vs Traditional Coding',
        pubDate: '2024-11-15',
        description: 'Comparing modern vibe engineering approaches with traditional coding methods.',
        heroImage: '/blog-images/vibe-engineering.webp',
        tags: ['Development', 'Trends'],
        readingTime: '7 min',
        slug: 'vibe-engineering-vs-traditional-coding',
    },
    {
        title: 'E2B Daytona Integration',
        pubDate: '2024-11-10',
        description: 'How to integrate E2B with Daytona for cloud development environments.',
        heroImage: '/blog-images/e2b-daytona.webp',
        tags: ['DevOps', 'Cloud'],
        readingTime: '10 min',
        slug: 'e2b-daytona-integration',
    },
]

const BlogList: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Blog - Vasanth Kumar</title>
                <meta name="description" content="Read my thoughts on web development, AI, and technology." />
            </Helmet>

            <Navbar />

            <main className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto mt-24 mb-16">
                <div className="mb-12">
                    <Badge size="sm" className="mb-4">Blog</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                        Thoughts & Ideas
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        Writing about web development, AI, and the things I learn along the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((blog, index) => (
                        <Link
                            key={index}
                            to={`/blogs/${blog.slug}`}
                            className="blog-card flex flex-col border border-[var(--border-color)] hover:border-[var(--accent-primary)] overflow-hidden bg-[var(--card-bg)] group transition-colors"
                        >
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={blog.heroImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Blog'
                                    }}
                                />
                            </div>
                            <div className="p-4 sm:p-5 flex flex-col flex-1">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-base sm:text-lg font-medium mb-2 group-hover:text-[var(--accent-primary)] line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                                    {blog.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-xs text-[var(--text-secondary)]">
                                    <span>{blog.readingTime} read</span>
                                    <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />

            <div className="sticky bottom-8 right-8 z-50">
                <div className="flex justify-end sm:pr-8 pr-5">
                    <ThemeChanger />
                </div>
            </div>
        </>
    )
}

export default BlogList
