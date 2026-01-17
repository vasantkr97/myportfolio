import React, { useState, useEffect } from 'react'

const LiveClock: React.FC = () => {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return <span className="tabular-nums">{time} IST</span>
}

export default LiveClock
