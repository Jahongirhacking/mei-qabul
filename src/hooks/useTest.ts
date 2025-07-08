import { TestResult } from '@/api/services/exam.service'
import { TEST_DURATION } from '@/app/config'

const getCurrentRemainedTime = (remainedTime: number) => {
  // Ensure remainedTime is not negative
  const time = Math.max(0, remainedTime)

  // convert time to to minutes
  return Math.floor(time / 60)
}

const calculateRemainedTimeInMinutes = (startTime?: string) => {
  if (!startTime) return 120

  const start = new Date(startTime).getTime()
  const now = new Date().getTime()
  const elapsedTime = Math.floor((now - start) / 1000) // Convert to seconds
  const newRemainingTime = TEST_DURATION - elapsedTime

  return getCurrentRemainedTime(newRemainingTime)
}

type Response = {
  isTestEnded: boolean
  isTestStarted: boolean
  remainedTimeInMinutes: number
}

export const useTest = (test?: TestResult): Response => {
  const isTestStarted = !!test?.startTime
  const remainedTimeInMinutes = calculateRemainedTimeInMinutes(test?.startTime)
  const isTestEnded = remainedTimeInMinutes === 0

  return {
    isTestEnded,
    isTestStarted,
    remainedTimeInMinutes
  }
}
