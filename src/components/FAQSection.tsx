import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  delay: number
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, delay }) => {
  const itemRef = useRef<HTMLDivElement>(null)

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

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [delay])

  return (
    <div ref={itemRef} className={cn("border-b border-gray-200 py-4 transition-all duration-700 opacity-0 translate-y-10", "last:border-b-0")}>
      <button className="flex justify-between items-center w-full text-left py-2" onClick={onClick} aria-expanded={isOpen}>
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        {isOpen ? <ChevronUp className="text-university-secondary h-5 w-5" /> : <ChevronDown className="text-university-secondary h-5 w-5" />}
      </button>
      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0")}>
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  )
}

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      },
      {
        threshold: 0.1
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div ref={sectionRef} className="transition-all duration-700 opacity-0 translate-y-10">
      <div className="max-w-4xl mx-auto">
        {[0, 1, 2, 3].map((index) => (
          <FAQItem
            key={index}
            question={t(`faq.questions.${index}.question`)}
            answer={t(`faq.questions.${index}.answer`)}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  )
}

export default FAQSection
