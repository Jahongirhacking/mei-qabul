import React from "react"

import { cn } from "@/lib/utils"

export interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
  loading?: boolean
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <span className="size-3.5 bg-white rounded-full animate-[bounce_1s_infinite] [animation-delay:-0.3s]"></span>
      <span className="size-3.5 bg-white rounded-full animate-[bounce_1s_infinite] [animation-delay:-0.15s]"></span>
      <span className="size-3.5 bg-white rounded-full animate-[bounce_1s_infinite]"></span>
    </span>
  )
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, variant = "primary", onClick, className, disabled, type = "button", loading = false }) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-full font-medium",
        {
          "transform hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300": !disabled,
          "text-white teal-glow bg-glow": variant === "primary",
          "bg-university-primary border text-white": variant === "secondary",
          "cursor-not-allowed opacity-50 bg-teal-800": disabled
        },
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">{loading ? <LoadingDots /> : children}</div>
      <div
        className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10", {
          "bg-white": variant === "primary",
          "bg-university-secondary": variant === "secondary"
        })}
      />
    </button>
  )
}

export default AnimatedButton
