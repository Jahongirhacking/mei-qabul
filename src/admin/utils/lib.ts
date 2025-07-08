import { BaseError, BaseResponse } from '@/admin/types/IRequest'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { toast } from 'sonner'

export function calculateCountdown(deletionDate?: string, totalDays = 30) {
  if (!deletionDate) {
    return
  }

  const today = dayjs()
  const deletionDateParsed = dayjs(deletionDate)
  const daysPassed = today.diff(deletionDateParsed, 'day')
  const countdownDays = totalDays - daysPassed

  return countdownDays < 0 ? 0 : countdownDays
}

const message = 'Error occurred. Please try again.'

export const errorHandler = (error: AxiosError<BaseError>): void => {
  toast.error(error?.response?.data.message || message)
}

const successMessage = 'Success'
export const successHandler = (data: BaseResponse): void => {
  toast.success(data.message || successMessage)
}

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
