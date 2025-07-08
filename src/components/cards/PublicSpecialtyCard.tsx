import React, { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { DegreeAndContractPrice } from "@/api/services/public.service"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"

interface Props {
  title: string
  features: DegreeAndContractPrice[]
  delay?: number
}

export const PublicSpecialtyCard: React.FC<Props> = ({ title, features, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

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

    const currentCardRef = cardRef.current // Create a local variable to store the current value

    if (currentCardRef) {
      observer.observe(currentCardRef)
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef)
      }
    }
  }, [delay])

  return (
    <div ref={cardRef} className={cn("bg-white rounded-xl p-6 blue-card-shadow card-hover", "transition-all duration-700 opacity-0 translate-y-10")}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-university-secondary-700 mb-1">{title}</h3>
      </div>

      <ul className="space-y-3">
        {features.map(({ contractPrice, degree }) => (
          <li key={degree} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-university-primary mr-2"></span>
              <span className=" text-gray-600">{degree}</span>
            </div>
            <div className="text-university-primary font-bold text-xl">
              {formatPrice(contractPrice)} {t("common.sum")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
