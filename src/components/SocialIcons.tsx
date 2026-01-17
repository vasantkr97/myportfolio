import React from 'react'
import { socials } from '../lib/socials'
import {
  GithubIcon,
  TwitterIcon,
  LinkedInIcon,
  MailIcon,
  InstagramIcon,
  DiscordIcon,
} from './icons/index'

interface SocialIconsProps {
  color?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'button' | 'minimal'
  showLabels?: boolean
  platform?: 'github' | 'twitter' | 'linkedin' | 'mail' | 'instagram' | 'discord' | 'all'
  className?: string
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
}

const containerClasses = {
  default: 'flex gap-4',
  button: 'flex gap-4',
  minimal: 'flex gap-3',
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  color = 'text-[var(--text-secondary)]',
  size = 'md',
  variant = 'default',
  showLabels = false,
  platform = 'all',
  className = '',
}) => {
  const iconSize = sizeClasses[size]

  const getIconWrapperClasses = () => {
    const base = {
      default: `flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-primary)] ${showLabels ? 'gap-2' : ''}`,
      button: `flex items-center justify-center w-12 h-12 rounded-full hover:text-[var(--accent-primary)] ${showLabels ? 'gap-2' : ''}`,
      minimal: `hover:text-[var(--accent-primary)] ${showLabels ? 'flex items-center gap-2' : ''}`,
    }
    return base[variant]
  }

  const platforms =
    platform === 'all'
      ? ['github', 'twitter', 'linkedin', 'mail', 'instagram', 'discord']
      : [platform]

  const iconWrapperClass = getIconWrapperClasses()

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      {platforms.includes('github') && (
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="GitHub Profile"
        >
          <GithubIcon size={iconSize} className={color} />
          {showLabels && <span>GitHub</span>}
        </a>
      )}

      {platforms.includes('twitter') && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="Twitter/X Profile"
        >
          <TwitterIcon size={iconSize} className={color} />
          {showLabels && <span>Twitter</span>}
        </a>
      )}

      {platforms.includes('linkedin') && (
        <a
          href={socials.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="LinkedIn Profile"
        >
          <LinkedInIcon size={iconSize} className={color} />
          {showLabels && <span>LinkedIn</span>}
        </a>
      )}

      {platforms.includes('mail') && (
        <a
          href={socials.mail}
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="Email"
        >
          <MailIcon size={iconSize} className={color} />
          {showLabels && <span>Email</span>}
        </a>
      )}

      {/* {platforms.includes('instagram') && (
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="Instagram Profile"
        >
          <InstagramIcon size={iconSize} className={color} />
          {showLabels && <span>Instagram</span>}
        </a>
      )} */}

      {/* {platforms.includes('discord') && (
        <a
          href={socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconWrapperClass} social-icon-link`}
          aria-label="Discord Profile"
        >
          <DiscordIcon size={iconSize} className={color} />
          {showLabels && <span>Discord</span>}
        </a>
      )} */}
    </div>
  )
}

export default SocialIcons
