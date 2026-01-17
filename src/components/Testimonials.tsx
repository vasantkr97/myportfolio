import React, { useState, useEffect } from 'react'

interface Testimonial {
  content: string
  name: string
  position: string
}

const testimonials: Testimonial[] = [
  {
    content:
      'Your portfolio showcases not just skills, but a passion for clean, innovative solutions. The attention to detail is remarkable.',
    name: 'Alex Chen',
    position: 'Tech Lead',
  },
  {
    content:
      'Working with you was a game-changer for our project. Your technical knowledge and collaborative approach made all the difference.',
    name: 'Priya Sharma',
    position: 'Project Manager',
  },
  {
    content:
      'A Testimonial will be here with person name not one but 3 Testimonial ofc it will be big but you should definitely add it.',
    name: 'Aasam Jain',
    position: 'Whatever',
  },
]

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <div className="w-full h-full relative border border-[#7B7B7B] p-4 flex flex-col bg-[#C9CDD1]/10">
      <div className="flex-grow flex items-start justify-center">
        <div className="w-full">
          <p className="text-base leading-relaxed text-[#7B7B7B]/80 mb-6 font-mono">
            "{testimonial.content}"
          </p>
          <div className="flex items-center">
            <div className="w-[36px] h-[36px] rounded-full mr-3 flex items-center justify-center text-base font-bold bg-transparent border border-[#7B7B7B]">
              {testimonial.name.charAt(0)}
            </div>
            <div className="text-left">
              <h3 className="text-base font-medium m-0 text-[var(--text-primary)]">
                {testimonial.name}
              </h3>
              <p className="text-xs text-[#7B7B7B] m-0">{testimonial.position}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full border border-[#7B7B7B] p-0 cursor-pointer ${
              i === currentIndex ? 'bg-[#0000CC]' : 'bg-transparent'
            }`}
            onClick={() => goToTestimonial(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
