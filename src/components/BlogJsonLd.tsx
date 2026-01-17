import React from 'react'
import { Helmet } from 'react-helmet-async'

interface BlogJsonLdProps {
    title: string
    description: string
    pubDate: string
    updatedDate?: string
    author?: string
    image?: string
    url: string
}

const BlogJsonLd: React.FC<BlogJsonLdProps> = ({
    title,
    description,
    pubDate,
    updatedDate,
    author = 'Vasanth Kumar',
    image,
    url,
}) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: pubDate,
        dateModified: updatedDate || pubDate,
        author: {
            '@type': 'Person',
            name: author,
        },
        image: image || '/images/og.webp',
        url,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    )
}

export default BlogJsonLd
