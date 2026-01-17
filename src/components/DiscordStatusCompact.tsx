import React, { useState, useEffect } from 'react'

interface DiscordStatusCompactProps {
  userId?: string
}

interface DiscordUser {
  id: string
  username: string
  global_name?: string
  avatar: string
  discriminator: string
}

interface DiscordActivity {
  name: string
  type: number
  details?: string
  state?: string
  assets?: {
    large_image?: string
    small_image?: string
  }
}

interface SpotifyData {
  song: string
  artist: string
  album_art_url: string
}

interface LanyardData {
  discord_user: DiscordUser
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: DiscordActivity[]
  listening_to_spotify: boolean
  spotify?: SpotifyData
}

const DiscordStatusCompact: React.FC<DiscordStatusCompactProps> = ({
  userId = '743173584935190620',
}) => {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#23a55a'
      case 'idle':
        return '#f0b232'
      case 'dnd':
        return '#f23f43'
      default:
        return '#80848e'
    }
  }

  const getAvatarUrl = (user: DiscordUser) => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
    }
    const defaultAvatar = parseInt(user.discriminator) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`
  }

  useEffect(() => {
    const fetchLanyardData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        const json = await response.json()
        if (json.success) {
          setData(json.data)
        }
      } catch (err) {
        console.error('Error fetching Lanyard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLanyardData()

    // Set up WebSocket for real-time updates
    const ws = new WebSocket('wss://api.lanyard.rest/socket')
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: userId }
      }))
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.op === 0 && message.d) {
        setData(message.d)
        setLoading(false)
      }
    }

    return () => ws.close()
  }, [userId])

  const statusColor = data ? getStatusColor(data.discord_status) : '#80848e'
  const statusText = data?.discord_status || 'offline'
  const isListening = data?.listening_to_spotify && data?.spotify
  const currentActivity = !isListening
    ? data?.activities?.find((a) => a.type !== 4)
    : null

  const activityImage = isListening && data?.spotify
    ? data.spotify.album_art_url
    : null

  const activityName = isListening && data?.spotify
    ? data.spotify.song
    : currentActivity?.details || currentActivity?.name

  const activityDetails = isListening && data?.spotify
    ? `by ${data.spotify.artist}`
    : currentActivity?.state

  const activityLabel = isListening
    ? 'Listening to Spotify'
    : currentActivity
    ? 'Playing'
    : null

  return (
    <a
      href={`https://discord.com/users/${userId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="discord-compact flex items-center gap-3 text-[var(--text-secondary)] no-underline pl-1"
      title={activityName || `Discord: ${statusText}`}
    >
      <div className="image-wrapper relative flex-shrink-0">
        {loading ? (
          <div className="w-10 h-10 bg-gray-200 animate-pulse" />
        ) : activityImage && !imageError ? (
          <img
            src={activityImage}
            alt={activityName || 'Activity'}
            className="w-10 h-10 object-cover"
            onError={() => setImageError(true)}
          />
        ) : data?.discord_user ? (
          <img
            src={getAvatarUrl(data.discord_user)}
            alt="Discord"
            className="w-10 h-10 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200" />
        )}
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-secondary)]"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      <div className="info flex flex-col gap-0 leading-tight min-w-0 flex-1">
        {activityLabel ? (
          <span className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)] opacity-80">
            {activityLabel}
          </span>
        ) : (
          <span className="text-[11px] capitalize text-[var(--text-secondary)]">
            {statusText}
          </span>
        )}

        {activityName ? (
          <span className="text-[13px] font-semibold text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
            {activityName}
          </span>
        ) : data?.discord_user ? (
          <span className="flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
            <svg className="w-3 h-3 text-[#5865f2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            {data.discord_user.global_name || data.discord_user.username}
          </span>
        ) : null}

        {activityDetails && (
          <span className="text-[11px] text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
            {activityDetails}
          </span>
        )}
      </div>
    </a>
  )
}

export default DiscordStatusCompact
