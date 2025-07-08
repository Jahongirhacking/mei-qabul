import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  icon?: React.ReactNode
  label?: string
  selected?: boolean
} & React.ComponentProps<"button">

export function StepButton({ className, icon, label, selected = false, disabled = false, ...props }: Props) {
  return (
    <button
      disabled={disabled}
      type="button"
      className={cn(
        "shadow-sm p-4 flex justify-center items-center rounded-xl border-2 border-transparent bg-white hover:border-university-primary hover:bg-university-primary/10",
        {
          "border-university-primary bg-university-primary/10": selected,
          "cursor-not-allowed opacity-50 hover:border-transparent hover:bg-white": disabled
        },
        className
      )}
      {...props}
    >
      <div className="font-medium flex items-center gap-2">
        <p className="size-10 bg-gray-200 rounded-full flex justify-center items-center">{icon}</p>
        <span>{label}</span>
      </div>
    </button>
  )
}
