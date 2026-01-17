import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const ComingSoon: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Coming Soon - Vasanth Kumar</title>
                <meta name="description" content="This page is coming soon!" />
            </Helmet>

            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg-primary)]">
                <Logo size="lg" className="mb-8" />

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">
                    Coming Soon
                </h1>

                <p className="text-lg text-[var(--text-secondary)] text-center max-w-md mb-8">
                    This page is under construction. Check back later for updates!
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-[var(--accent-primary)] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/blogs"
                        className="px-6 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                    >
                        Read Blog
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ComingSoon
