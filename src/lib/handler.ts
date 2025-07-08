import { BaseError } from '@/types/IRequest'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const errorHandler = (error: AxiosError<BaseError>): void => {
  toast.error(error?.response?.data.message || "Tizimda xatolik, qayta urinib ko'ring")
}
