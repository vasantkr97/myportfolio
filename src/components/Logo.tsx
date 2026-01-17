import React from 'react'

interface LogoProps {
    size?: string
    className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'w-6 h-6', className = '' }) => (
    <svg className={`${size} ${className}`} viewBox="0 0 16 23" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 23L0 0.617188H3.5L8 14.5L12.5 0.617188H16L8 23Z"
            fill="currentColor"
        />
    </svg>
)

export default Logo
