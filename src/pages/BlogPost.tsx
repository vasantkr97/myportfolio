import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ThemeChanger from '../components/ThemeChanger'

// Placeholder blog content
const blogData: Record<string, { title: string; content: string; pubDate: string }> = {
    'ai-driven-web-development': {
        title: 'AI Driven Web Development',
        pubDate: '2024-12-15',
        content: `
      <h2>Introduction</h2>
      <p>AI is revolutionizing how we build web applications. From code generation to automated testing, the landscape is changing rapidly.</p>
      <h2>Key Benefits</h2>
      <ul>
        <li>Faster development cycles</li>
        <li>Improved code quality</li>
        <li>Better user experiences</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Embracing AI in web development isn't about replacing developers—it's about empowering them to build better, faster.</p>
    `,
    },
    'claude-ai-frontier-intelligence': {
        title: 'Claude AI: Frontier Intelligence',
        pubDate: '2024-12-10',
        content: `
      <h2>What is Claude?</h2>
      <p>Claude is Anthropic's AI assistant, designed with safety and helpfulness in mind.</p>
      <h2>Capabilities</h2>
      <p>Claude excels at coding, analysis, and creative writing tasks.</p>
    `,
    },
    'progressive-web-apps-2025': {
        title: 'Progressive Web Apps in 2025',
        pubDate: '2024-11-20',
        content: `
      <h2>PWAs Continue to Evolve</h2>
      <p>Progressive Web Apps are becoming more powerful with new browser APIs.</p>
    `,
    },
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const blog = slug ? blogData[slug] : null

    if (!blog) {
        return (
            <>
                <Navbar />
                <div className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] mx-auto mt-24 mb-16 text-center">
                    <h1 className="text-3xl font-semibold mb-4">Blog Post Not Found</h1>
                    <p className="text-[var(--text-secondary)] mb-8">
                        The blog post you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/blogs"
                        className="inline-block px-6 py-3 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                    >
                        Back to Blog
                    </Link>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>{blog.title} - Vasanth Kumar</title>
                <meta name="description" content={blog.title} />
            </Helmet>

            <Navbar />

            <main className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] mx-auto mt-24 mb-16">
                <article>
                    <header className="mb-12">
                        <Link
                            to="/blogs"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm mb-4 inline-block"
                        >
                            ← Back to Blog
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                            {blog.title}
                        </h1>
                        <time className="text-[var(--text-secondary)] text-sm">
                            {new Date(blog.pubDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </header>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>
            </main>

            <Footer />

            <div className="sticky bottom-8 right-8 z-50">
                <div className="flex justify-end sm:pr-8 pr-5">
                    <ThemeChanger />
                </div>
            </div>

            <style>{`
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .prose p {
          margin-bottom: 1rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
      `}</style>
        </>
    )
}

export default BlogPost
