import React, { ReactNode } from 'react'

interface BadgeProps {
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}

const sizeClasses = {
  xs: 'px-2 py-1 text-[9px] gap-2',
  sm: 'px-3 py-1 text-xs gap-1',
  md: 'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm gap-1 sm:gap-2',
  lg: 'p-3 sm:p-4 md:p-4 text-sm sm:text-base gap-2 sm:gap-3',
}

const Badge: React.FC<BadgeProps> = ({ text = '', size = 'md', className = '', children }) => {
  const classes = sizeClasses[size]

  return (
    <div
      className={`badge bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] font-semibold w-fit flex items-center ${classes} ${className}`}
    >
      {children}
      {text}
    </div>
  )
}

export default Badge
