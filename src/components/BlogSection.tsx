import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'

// Blog data - in a real app, this would come from an API or content files
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
        description: 'A deep dive into Anthropic\'s Claude and its capabilities.',
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
]

const BlogSection: React.FC = () => {
    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')

            gsap.registerPlugin(ScrollTrigger)

            const blogSection = document.getElementById('blog')
            if (blogSection) {
                gsap.fromTo(
                    blogSection,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        scrollTrigger: {
                            trigger: blogSection,
                            start: 'top 80%',
                            end: 'top 50%',
                            scrub: 1,
                            once: true,
                        },
                    }
                )

                gsap.fromTo(
                    '.blog-item',
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: '.blog-grid',
                            start: 'top 85%',
                            end: 'bottom 70%',
                            scrub: 1,
                            once: true,
                        },
                    }
                )
            }
        }

        initAnimations()
    }, [])

    return (
        <section
            className="blog-section my-16 sm:my-24 md:my-32 opacity-0 relative scroll-reveal"
            id="blog"
        >
            <div className="blog-section-container w-[90%] md:w-[80%] lg:w-[65%] mx-auto">
                <div className="blog-heading-container flex flex-col gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-8">
                    <Badge size="sm">Blogs</Badge>
                    <div className="flex items-center justify-between my-6">
                        <div className="blog-subheading text-base sm:text-xl md:text-3xl">
                            Learning, Building & Documenting...
                        </div>
                        <Link
                            to="/blogs"
                            className="all-blogs-link border p-2 px-4 border-[var(--border-color)] text-xs sm:text-base text-[var(--text-secondary)] font-medium hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
                        >
                            All Blogs
                        </Link>
                    </div>
                </div>

                <div className="blog-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
                    {blogPosts.map((blog, index) => (
                        <div key={index} className="blog-item h-full flex flex-col">
                            <Link
                                to={`/blogs/${blog.slug}`}
                                className="blog-card flex flex-col h-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] overflow-hidden bg-[var(--card-bg)] group"
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
                                    <h3 className="text-base sm:text-lg font-medium mb-2 group-hover:text-[var(--accent-primary)] line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                                        {blog.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between text-xs text-[var(--text-secondary)]">
                                        <span>{blog.readingTime} read</span>
                                        <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .blog-section {
          will-change: transform;
        }

        .blog-item {
          height: 100%;
          will-change: auto;
          display: flex;
          flex-direction: column;
        }

        .blog-card {
          transition: border-color 0.3s ease-in-out;
        }
      `}</style>
        </section>
    )
}

export default BlogSection
