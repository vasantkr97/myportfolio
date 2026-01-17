import React from 'react'
import Badge from './Badge'

interface TechCommunityProps {
    title?: string
    learnMoreUrl?: string
}

const TechCommunity: React.FC<TechCommunityProps> = ({
    title = 'Tech Community',
    learnMoreUrl = '#',
}) => {
    return (
        <div className="border border-[var(--border-color)] p-6 flex flex-col bg-[var(--card-bg)]">
            <Badge size="sm" className="mb-4">
                <span className="uppercase text-xs">{title}</span>
            </Badge>

            <div className="flex items-start gap-4 mb-4">
                <img
                    src="/images/dialogh.png"
                    alt="Dialogh"
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64?text=D'
                    }}
                />
                <div>
                    <h3 className="text-lg font-medium mb-1">Dialogh</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                        I am a member of Dialogh, a tech community focused on building
                        and sharing knowledge.
                    </p>
                </div>
            </div>

            <div className="mt-auto border-t border-[var(--border-color)] pt-4">
                <a
                    href={learnMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-primary)] relative group inline-flex items-center"
                >
                    Learn more
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all"></span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-0 ml-0 group-hover:w-3 group-hover:ml-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default TechCommunity
