import React from 'react'
import WebsiteLink, { type Website } from './WebsiteLink'

interface WebsitesGridProps {
    websites: Website[]
    title?: string
    columns?: number
    showNames?: boolean
}

const WebsitesGrid: React.FC<WebsitesGridProps> = ({
    websites,
    title = 'Websites',
    columns = 2,
    showNames = true,
}) => {
    return (
        <div className="websites-grid-container mb-6">
            {title && (
                <h3 className="websites-grid-title text-xl mb-4 font-semibold text-[var(--text-primary)]">
                    {title}
                </h3>
            )}
            <div
                className="websites-grid grid gap-3"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                {websites.map((website, index) => (
                    <WebsiteLink
                        key={index}
                        website={website}
                        showName={showNames}
                        className={showNames ? 'website-link' : 'website-link website-icon-only'}
                    />
                ))}
            </div>

            <style>{`
        @media (max-width: 640px) {
          .websites-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    )
}

export default WebsitesGrid
