import { BaseError } from '@/admin/types/IRequest'
import { AxiosError } from 'axios'

interface ErrorMessageProps {
  error: AxiosError<BaseError, unknown> | null
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <h2>{error?.response?.data?.message || 'Tizimda xatolik'}</h2>
}
