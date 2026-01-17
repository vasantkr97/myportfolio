import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'

interface BlogCardProps {
    title: string
    pubDate: Date | string
    updatedDate?: Date | string
    description: string
    heroImage: string
    tags?: string[]
    readingTime?: number
    url: string
    slug?: string
}

const BlogCard: React.FC<BlogCardProps> = ({
    title,
    pubDate,
    updatedDate,
    description,
    heroImage,
    tags = [],
    readingTime,
    url,
    slug,
}) => {
    const formatDate = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const displayDate = updatedDate || pubDate
    const primaryTag = tags.length > 0 ? tags[0] : 'Blog'

    return (
        <div className="blog-card-wrapper group h-full flex flex-col">
            <Link
                to={url}
                className="blog-card flex flex-col h-full border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] overflow-hidden relative bg-[var(--card-bg)]"
            >
                <div className="blog-card-image-container relative overflow-hidden w-full aspect-video">
                    <img
                        src={heroImage}
                        alt={title}
                        className="blog-card-image grayscale group-hover:grayscale-0 w-full h-full object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Blog'
                        }}
                    />
                    <div className="blog-card-category absolute top-3 left-3 z-10">
                        <Badge className="bg-opacity-50" text={primaryTag.toUpperCase()} size="sm" />
                    </div>
                </div>
                <div className="blog-card-content p-4 sm:p-5 relative flex flex-col flex-1">
                    <div className="blog-card-date text-xs text-[var(--text-secondary)] mb-2 font-medium">
                        {formatDate(displayDate)}
                        {readingTime && <span className="ml-2">{readingTime} min read</span>}
                    </div>
                    <h3 className="blog-card-title text-base sm:text-lg mt-2 mb-2 sm:mb-3 font-medium group-hover:text-[var(--accent-primary)] line-clamp-2 leading-tight">
                        {title}
                    </h3>
                    <p className="blog-card-description text-xs sm:text-sm text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed line-clamp-5">
                        {description}
                    </p>
                    <div className="mt-auto">
                        <div className="blog-card-read-more mt-8 text-xs sm:text-sm font-medium text-[var(--text-secondary)] flex items-center group-hover:text-[var(--accent-primary)]">
                            Read more{' '}
                            <span className="arrow ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </div>
                </div>
            </Link>

            <style>{`
        .blog-card-wrapper {
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
          will-change: transform;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card {
          background-color: var(--card-bg);
          border-color: var(--border-color);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          border-color: var(--accent-primary);
        }

        .blog-card-content {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
      `}</style>
        </div>
    )
}

export default BlogCard
