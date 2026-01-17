import React, { useState, useEffect } from 'react'

interface LoaderProps {
    onComplete?: () => void
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Check if loader should be skipped
        const skipLoader = sessionStorage.getItem('loaderShown') === 'true'
        if (skipLoader) {
            setIsVisible(false)
            onComplete?.()
            return
        }

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsVisible(false)
                        sessionStorage.setItem('loaderShown', 'true')
                        onComplete?.()
                    }, 300)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 100)

        return () => clearInterval(interval)
    }, [onComplete])

    if (!isVisible) return null

    return (
        <div
            id="loader-wrapper"
            className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex items-center justify-center"
        >
            <div className="loader-content text-center">
                <div className="progress-bar-container w-48 h-1 bg-[var(--bg-secondary)] mb-4 overflow-hidden">
                    <div
                        id="progress-bar"
                        className="h-full bg-[var(--accent-primary)] transition-all duration-100"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <span className="text-sm text-[var(--text-secondary)]">
                    {Math.min(Math.floor(progress), 100)}%
                </span>
            </div>
        </div>
    )
}

export default Loader
