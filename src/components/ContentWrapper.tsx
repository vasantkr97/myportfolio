import React from 'react'

interface ContentWrapperProps {
    children: React.ReactNode
    className?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
    children,
    className = '',
    maxWidth = 'lg',
}) => {
    return (
        <div className={`w-full px-4 mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
            {children}
        </div>
    )
}

export default ContentWrapper
