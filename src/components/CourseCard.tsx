import React from "react"

import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  title: string
  price: number
  degree: string
  className?: string
}

export const CourseCard: React.FC<CourseCardProps> = ({ title, price, degree, className }) => {
  return (
    <div className={cn("bg-white rounded-3xl py-5 px-6 border border-gray-200 card-hover h-[160px] flex flex-col justify-between", "transition-all duration-700", className)}>
      <h3 className="text-lg font-semibold text-university-secondary-700 overflow-hidden text-ellipsis line-clamp-2">{title}</h3>

      <div>
        <div className="text-university-primary font-bold text-xl">{formatPrice(price)} so‘m</div>

        <div className="flex items-center">
          <span className="inline-block size-2 rounded-full bg-university-primary mr-2"></span>
          <span className="text-gray-600">{degree}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
