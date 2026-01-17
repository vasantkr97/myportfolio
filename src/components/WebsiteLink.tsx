import React from 'react'

export interface Website {
    name: string
    url: string
    icon?: string
    favicon?: string
}

interface WebsiteLinkProps {
    website: Website
    showName?: boolean
    className?: string
    iconSize?: string
}

const WebsiteLink: React.FC<WebsiteLinkProps> = ({
    website,
    showName = true,
    className = '',
    iconSize = '24',
}) => {
    return (
        <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`website-link flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] no-underline text-[var(--text-primary)] rounded-lg hover:translate-y-[-3px] hover:border-[var(--accent-primary)] hover:shadow-md transition-all ${className}`}
            title={website.name}
        >
            <span className="website-icon flex items-center justify-center">
                {website.favicon ? (
                    <img
                        src={website.favicon}
                        alt={website.name}
                        width={iconSize}
                        height={iconSize}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${website.url}&sz=32`
                        }}
                    />
                ) : (
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${website.url}&sz=32`}
                        alt={website.name}
                        width={iconSize}
                        height={iconSize}
                        className="object-contain"
                    />
                )}
            </span>
            {showName && <span className="website-name font-medium">{website.name}</span>}
        </a>
    )
}

export default WebsiteLink
