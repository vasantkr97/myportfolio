import React, { useRef, useEffect } from 'react'

interface TextRevealProps {
  text: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  stagger?: number
  duration?: number
  delay?: number
  from?: 'bottom' | 'top' | 'left' | 'right'
  splitBy?: 'chars' | 'words' | 'lines'
  once?: boolean
  id?: string
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  element: Element = 'p',
  className = '',
  stagger = 0.05,
  duration = 1,
  delay = 0,
  from = 'bottom',
  splitBy = 'words',
  once = true,
  id,
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      if (!ref.current) return

      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const element = ref.current

      // Create split content based on splitBy
      let splitContent = ''
      if (splitBy === 'chars') {
        splitContent = text
          .split('')
          .map((char) =>
            char === ' ' ? ' ' : `<span class="sr-char">${char}</span>`
          )
          .join('')
      } else if (splitBy === 'words') {
        splitContent = text
          .split(' ')
          .map(
            (word) =>
              `<span class="sr-word"><span class="sr-word-inner">${word}</span></span>`
          )
          .join(' ')
      } else {
        splitContent = `<span class="sr-line"><span class="sr-line-inner">${text}</span></span>`
      }

      element.innerHTML = splitContent

      // Select targets
      const targets =
        splitBy === 'chars'
          ? element.querySelectorAll('.sr-char')
          : splitBy === 'words'
          ? element.querySelectorAll('.sr-word-inner')
          : element.querySelectorAll('.sr-line-inner')

      // Set initial state
      let fromProps: Record<string, string | number> = {}
      switch (from) {
        case 'bottom':
          fromProps = { y: '100%', opacity: 0 }
          break
        case 'top':
          fromProps = { y: '-100%', opacity: 0 }
          break
        case 'left':
          fromProps = { x: '-100%', opacity: 0 }
          break
        case 'right':
          fromProps = { x: '100%', opacity: 0 }
          break
      }

      gsap.set(targets, {
        ...fromProps,
        transformOrigin: 'center center',
      })

      // Create animation
      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }).to(targets, {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      })
    }

    setTimeout(initAnimation, 100)
  }, [text, splitBy, from, stagger, duration, delay, once])

  const ElementTag = Element as any

  return (
    <>
      <ElementTag ref={ref} className={`text-reveal ${className}`} id={id}>
        {text}
      </ElementTag>

      <style>{`
        .text-reveal {
          overflow: hidden;
        }
        .sr-word,
        .sr-line {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        }
        .sr-word:not(:last-child) {
          margin-right: 0.25em;
        }
        .sr-line {
          display: block;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default TextReveal
