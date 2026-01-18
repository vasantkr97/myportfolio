import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SocialIcons from '../components/SocialIcons'
import ThemeChanger from '../components/ThemeChanger'
import { socials } from '../lib/socials'

const Socials: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Contact & Socials - Vasanth Kumar</title>
                <meta name="description" content="Connect with Vasanth Kumar on social media." />
            </Helmet>

            <Navbar />

            <main className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto mt-24 mb-16">
                <div className="mb-12">
                    <Badge size="sm" className="mb-4">Contact</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        Feel free to reach out for collaborations, questions, or just to say hi!
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="border border-[var(--border-color)] p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                        <div className="space-y-4">
                            <a
                                href={socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                                <span className="text-lg">GitHub</span>
                                <span className="text-sm">→</span>
                            </a>
                            <a
                                href={socials.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                                <span className="text-lg">LinkedIn</span>
                                <span className="text-sm">→</span>
                            </a>
                            <a
                                href={socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                                <span className="text-lg">Twitter / X</span>
                                <span className="text-sm">→</span>
                            </a>
                        </div>
                    </div>

                    <div className="border border-[var(--border-color)] p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-4">Email Me</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Have a project in mind or want to collaborate? Drop me an email!
                        </p>
                        <a
                            href={socials.mail}
                            className="inline-flex items-center justify-center px-6 py-3 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                        >
                            Send Email 📧
                        </a>
                    </div>
                </div>

                <div className="mt-12 border border-[var(--border-color)] p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <div className="flex flex-wrap gap-4">
                        <SocialIcons size="lg" />
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

export default Socials
