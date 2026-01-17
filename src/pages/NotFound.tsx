import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ThemeChanger from '../components/ThemeChanger'

const NotFound: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you're looking for doesn't exist." />
            </Helmet>

            <Navbar />

            <main className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto mt-24 mb-16 min-h-[50vh] flex flex-col items-center justify-center text-center">
                <div className="mb-8">
                    <h1 className="text-8xl sm:text-9xl font-bold text-[var(--accent-primary)] opacity-20 mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent-primary)] text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/blogs"
                            className="inline-flex items-center justify-center px-6 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                        >
                            Read Blog
                        </Link>
                    </div>
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

export default NotFound
