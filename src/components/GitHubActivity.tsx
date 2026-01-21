import React, { useState, useEffect, useRef, useCallback } from 'react'
import Badge from './Badge'

interface GitHubActivityProps {
    title?: string
    cellSize?: number
    cellSpacing?: number
    cellRadius?: number
    username?: string
}

interface ContributionDay {
    date: string
    count: number
    level: number
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({
    title = 'GITHUB ACTIVITY',
    cellSize = 13,
    cellSpacing = 2,
    cellRadius = 2,
    username = 'vasantkr97',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [weeks, setWeeks] = useState(52)
    const [activityData, setActivityData] = useState<{ level: number; count: number; date: string }[][]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [totalContributions, setTotalContributions] = useState(0)

    // Use CSS variables for theme-aware colors
    const contributionLevels = [
        'transparent', // Unused (0 is handled separately)
        'var(--github-activity-level1)',
        'var(--github-activity-level4)',
        'var(--github-activity-level8)',
        'var(--github-activity-level12)',
    ]

    const backgroundLevel = 'var(--github-activity-level0)'

    const processContributionData = (contributions: ContributionDay[]) => {
        const result: { level: number; count: number; date: string }[][] = []

        // Create a lookup map from the API contributions
        const contributionMap = new Map<string, { level: number; count: number }>()
        let total = 0

        for (const contribution of contributions) {
            contributionMap.set(contribution.date, {
                level: contribution.level,
                count: contribution.count,
            })
            total += contribution.count
        }

        setTotalContributions(total)

        // Calculate date range: from today going back 'weeks' number of weeks
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Find the end of the current week (Saturday)
        const currentDayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday
        const endOfWeek = new Date(today)
        endOfWeek.setDate(today.getDate() + (6 - currentDayOfWeek))

        // Start from the beginning of the date range
        const startDate = new Date(endOfWeek)
        startDate.setDate(endOfWeek.getDate() - (weeks * 7) + 1)

        // Adjust startDate to the previous Sunday if it's not already a Sunday
        const startDayOfWeek = startDate.getDay()
        if (startDayOfWeek !== 0) {
            startDate.setDate(startDate.getDate() - startDayOfWeek)
        }

        // Build weeks from startDate to endOfWeek
        let currentWeek: { level: number; count: number; date: string }[] = []
        const currentDate = new Date(startDate)

        while (currentDate <= endOfWeek) {
            const year = currentDate.getFullYear()
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')
            const day = String(currentDate.getDate()).padStart(2, '0')
            const dateStr = `${year}-${month}-${day}`

            // Look up this date in our contribution map
            const contribData = contributionMap.get(dateStr)

            currentWeek.push({
                level: contribData ? contribData.level : 0,
                count: contribData ? contribData.count : 0,
                date: dateStr,
            })

            // If we've completed a week (7 days), push it and start a new week
            if (currentWeek.length === 7) {
                result.push([...currentWeek])
                currentWeek = []
            }

            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1)
        }

        // Handle any remaining days in the last partial week
        if (currentWeek.length > 0) {
            result.push(currentWeek)
        }

        return result
    }

    const fetchGitHubContributions = async () => {
        try {
            setLoading(true)
            setError(false)

            // Fetch from third-party contributions API
            const response = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`)
            }

            const data = await response.json()
            let contributions = data.contributions || []

            // Also fetch recent events from GitHub's official Events API
            // This helps catch very recent activity that may not be in the cached data
            try {
                const eventsResponse = await fetch(
                    `https://api.github.com/users/${username}/events/public?per_page=100`
                )
                if (eventsResponse.ok) {
                    const events = await eventsResponse.json()

                    // Count events per day
                    const eventCounts = new Map<string, number>()
                    for (const event of events) {
                        const date = event.created_at?.split('T')[0]
                        if (date) {
                            eventCounts.set(date, (eventCounts.get(date) || 0) + 1)
                        }
                    }

                    // Merge with contributions - use higher of the two counts
                    const contributionMap = new Map<string, { count: number; level: number }>()
                    for (const contrib of contributions) {
                        contributionMap.set(contrib.date, { count: contrib.count, level: contrib.level })
                    }

                    // Update with event counts if higher
                    for (const [date, eventCount] of eventCounts) {
                        const existing = contributionMap.get(date)
                        if (!existing || eventCount > existing.count) {
                            // Calculate level based on count (rough approximation)
                            let level = 0
                            if (eventCount >= 1) level = 1
                            if (eventCount >= 3) level = 2
                            if (eventCount >= 5) level = 3
                            if (eventCount >= 8) level = 4

                            contributionMap.set(date, { count: eventCount, level })
                        }
                    }

                    // Convert back to array
                    contributions = Array.from(contributionMap.entries()).map(([date, data]) => ({
                        date,
                        count: data.count,
                        level: data.level,
                    }))
                }
            } catch (eventsErr) {
                console.log('Could not fetch GitHub events (continuing with contribution data):', eventsErr)
            }

            if (contributions.length > 0) {
                const processedData = processContributionData(contributions)
                setActivityData(processedData)
            }

            setLoading(false)
        } catch (err) {
            console.error('Error fetching GitHub data:', err)
            setError(true)
            setErrorMessage((err as Error).message || 'Failed to load GitHub data')
            setLoading(false)
        }
    }

    // Calculate responsive weeks based on container width
    const calculateWeeks = useCallback(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth
            // Each week column = cellSize + gap (2px)
            const weekWidth = cellSize + 2
            // Calculate how many weeks can fit, with some padding
            const calculatedWeeks = Math.floor((containerWidth - 60) / weekWidth)
            // Clamp between 20 and 70 weeks (roughly 5 months to 1.3 years)
            const newWeeks = Math.max(20, Math.min(70, calculatedWeeks))
            setWeeks(newWeeks)
        }
    }, [cellSize])

    // Listen to container resize
    useEffect(() => {
        calculateWeeks()

        const resizeObserver = new ResizeObserver(() => {
            calculateWeeks()
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [calculateWeeks])

    // Fetch data when weeks changes
    useEffect(() => {
        const abortController = new AbortController()

        const fetchData = async () => {
            try {
                setLoading(true)
                setError(false)

                // Fetch from third-party contributions API
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
                    { signal: abortController.signal }
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`)
                }

                const data = await response.json()
                let contributions = data.contributions || []

                // Also fetch recent events from GitHub's official Events API
                try {
                    const eventsResponse = await fetch(
                        `https://api.github.com/users/${username}/events/public?per_page=100`,
                        { signal: abortController.signal }
                    )
                    if (eventsResponse.ok) {
                        const events = await eventsResponse.json()

                        const eventCounts = new Map<string, number>()
                        for (const event of events) {
                            const date = event.created_at?.split('T')[0]
                            if (date) {
                                eventCounts.set(date, (eventCounts.get(date) || 0) + 1)
                            }
                        }

                        const contributionMap = new Map<string, { count: number; level: number }>()
                        for (const contrib of contributions) {
                            contributionMap.set(contrib.date, { count: contrib.count, level: contrib.level })
                        }

                        for (const [date, eventCount] of eventCounts) {
                            const existing = contributionMap.get(date)
                            if (!existing || eventCount > existing.count) {
                                let level = 0
                                if (eventCount >= 1) level = 1
                                if (eventCount >= 3) level = 2
                                if (eventCount >= 5) level = 3
                                if (eventCount >= 8) level = 4

                                contributionMap.set(date, { count: eventCount, level })
                            }
                        }

                        contributions = Array.from(contributionMap.entries()).map(([date, data]) => ({
                            date,
                            count: data.count,
                            level: data.level,
                        }))
                    }
                } catch (eventsErr) {
                    if ((eventsErr as Error).name !== 'AbortError') {
                        console.log('Could not fetch GitHub events:', eventsErr)
                    }
                }

                if (contributions.length > 0) {
                    const processedData = processContributionData(contributions)
                    setActivityData(processedData)
                }

                setLoading(false)
            } catch (err) {
                if ((err as Error).name === 'AbortError') {
                    return // Request was cancelled, don't update state
                }
                console.error('Error fetching GitHub data:', err)
                setError(true)
                setErrorMessage((err as Error).message || 'Failed to load GitHub data')
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            abortController.abort()
        }
    }, [username, weeks])

    return (
        <div ref={containerRef} className="github-activity-wrapper w-full">
            {title && (
                <div className="flex mb-4">
                    <Badge size="sm">{title}</Badge>
                </div>
            )}
            <div
                className="activity-graph-container overflow-x-auto pt-14 -mt-10 pb-4 scrollbar-hide"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15px, black calc(100% - 15px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15px, black calc(100% - 15px), transparent)',
                }}
            >
                {loading ? (
                    <div className="loading-container flex flex-col items-center justify-center h-24">
                        <div className="loading-spinner border-2 border-gray-200 border-t-gray-700 rounded-full w-6 h-6 animate-spin mb-2"></div>
                        <p className="text-sm text-[var(--text-secondary)]">Loading GitHub activity...</p>
                    </div>
                ) : error ? (
                    <div className="error-container flex flex-col items-center justify-center h-24 text-center">
                        <p className="text-sm text-red-500">Failed to load GitHub activity.</p>
                        <p className="text-xs text-red-400 mb-2">{errorMessage}</p>
                        <button
                            onClick={fetchGitHubContributions}
                            className="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="w-max pr-10 pl-6">
                        {/* Month Labels */}
                        <div className="flex flex-row flex-nowrap gap-[2px] mb-2">
                            {(() => {
                                // Calculate potential labels
                                const labels: string[] = new Array(activityData.length).fill('')
                                activityData.forEach((week, i) => {
                                    const firstDay = week[0]
                                    const currentMonth = firstDay.date ? new Date(firstDay.date).toLocaleDateString('en-US', { month: 'short' }) : ''
                                    const prevMonth = i > 0 && activityData[i - 1][0].date ? new Date(activityData[i - 1][0].date).toLocaleDateString('en-US', { month: 'short' }) : ''
                                    if (i === 0 || (currentMonth !== prevMonth && currentMonth !== '')) {
                                        labels[i] = currentMonth
                                    }
                                })

                                // Filter collisions (prefer later labels)
                                for (let i = 0; i < labels.length; i++) {
                                    if (labels[i]) {
                                        for (let j = 1; j < 3; j++) {
                                            if (i + j < labels.length && labels[i + j]) {
                                                labels[i] = ''
                                                break
                                            }
                                        }
                                    }
                                }

                                // Render
                                return activityData.map((week, i) => {
                                    return (
                                        <div
                                            key={i}
                                            style={{ width: cellSize }}
                                            className="text-xs text-gray-400 relative h-4"
                                        >
                                            {labels[i] && (
                                                <span className="absolute top-0 left-0 whitespace-nowrap text-[10px]">
                                                    {labels[i]}
                                                </span>
                                            )}
                                        </div>
                                    )
                                })
                            })()}
                        </div>

                        {/* Contribution Grid */}
                        <div
                            className="activity-graph flex flex-row flex-nowrap gap-[2px]"
                            style={{
                                ['--cell-size' as any]: `${cellSize}px`,
                                ['--cell-spacing' as any]: `${cellSpacing}px`,
                                ['--cell-radius' as any]: `${cellRadius}px`,
                            }}
                        >
                            {activityData.map((week, w) => (
                                <div key={w} className="week flex flex-col gap-[2px]">
                                    {week.map((day, d) => (
                                        <div
                                            key={d}
                                            className="day-cell group relative cursor-pointer"
                                            style={{
                                                width: cellSize,
                                                height: cellSize,
                                            }}
                                        >
                                            {/* The actual cell */}
                                            <div
                                                className="day w-full h-full transition-all duration-200 group-hover:scale-125 group-hover:z-10"
                                                style={{
                                                    borderRadius: cellRadius,
                                                    backgroundColor: day.level === 0 ? backgroundLevel : contributionLevels[day.level],
                                                }}
                                            />

                                            {/* Custom Tooltip */}
                                            {day.date && (
                                                <div className="tooltip-container absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                                    <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10 whitespace-nowrap">
                                                        <div className="font-semibold text-center">
                                                            {day.count === 0 ? 'No contributions' :
                                                                day.count === 1 ? '1 contribution' :
                                                                    `${day.count} contributions`}
                                                        </div>
                                                        <div className="text-gray-400 text-[10px] text-center mt-0.5">
                                                            {new Date(day.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                        {/* Arrow */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Row: Total Contributions & Legend */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                <div className="contributions-count text-xs text-[var(--text-secondary)]">
                    This year, I achieved <span className="text-white font-medium">{totalContributions.toLocaleString()}</span> contributions
                </div>

                <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <span>Less</span>
                    <div className="flex gap-[2px]">
                        <div className="w-3 h-3 rounded-[2px]" style={{ background: backgroundLevel }}></div>
                        {contributionLevels.slice(1).map((color, i) => (
                            <div key={i} className="w-3 h-3 rounded-[2px]" style={{ background: color }}></div>
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    )
}

export default GitHubActivity
