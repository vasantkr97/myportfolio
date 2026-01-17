import React from 'react'

interface QuoteProps {
    text?: string
    author?: string
    className?: string
}

const Quote: React.FC<QuoteProps> = ({
    text = 'The best way to predict the future is to create it.',
    author = 'Peter Drucker',
    className = '',
}) => {
    return (
        <div className={`border border-[#7B7B7B] p-4 h-full w-full ${className}`}>
            <p>
                <span className="text-[#7B7B7B] font-bold text-3xl">"{text}"</span>
                <br />
                <span className="text-[#7B7B7B]">- {author}</span>
            </p>
        </div>
    )
}

export default Quote
