import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface StepCardProps {
  number: number
  title: string
  description: string
  delay?: number
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <div ref={cardRef} className={cn("bg-white rounded-xl p-6 blue-card-shadow card-hover", "border border-gray-100 transition-all duration-700 opacity-0 translate-y-10 flex-1 min-w-52")}>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-university-secondary text-white font-bold mb-4">{number}</div>
        <h3 className="text-lg font-semibold text-university-secondary-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default StepCard
