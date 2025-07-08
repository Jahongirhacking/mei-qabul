import { memo, useEffect, useState } from "react"

import { TEST_DURATION } from "@/app/config"
import { TimerIcon } from "lucide-react"

type TimerProps = {
  startTime?: string
  onTimeEnd: () => void
}

const getCurrentRemainedTime = (remainedTime: number) => {
  // Ensure remainedTime is not negative
  const time = Math.max(0, remainedTime)

  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0")
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0")

  return `${hours}:${minutes}:${seconds}`
}

export const TestTimer = memo(({ startTime, onTimeEnd }: TimerProps) => {
  const [remainedTime, setRemainedTime] = useState(TEST_DURATION)

  useEffect(() => {
    if (!startTime) return

    const start = new Date(startTime).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const elapsedTime = Math.floor((now - start) / 1000) // Convert to seconds
      const newRemainingTime = TEST_DURATION - elapsedTime

      setRemainedTime(newRemainingTime)

      // Stop timer when it reaches 0
      if (newRemainingTime <= 0) {
        setRemainedTime(0)
        clearInterval(interval)
        onTimeEnd()
      }
    }

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    // Set initial time
    updateTimer()

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [startTime, onTimeEnd])

  return (
    <h2 className="text-3xl flex items-center gap-2 font-bold text-university-secondary-700">
      <TimerIcon size={30} /> {getCurrentRemainedTime(remainedTime)}
    </h2>
  )
})
