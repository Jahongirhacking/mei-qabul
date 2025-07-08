import { httpService } from '@/admin/api'
import type { AxiosRequestConfig } from 'axios'

export interface IResponse<T> {
  data: T
  error: {
    timestamp: string
    code: number
    message: string
    path: string
    error: string
  }
  success: true
}

export interface IUploadResponse {
  id: number
  url: string
  fileName: string
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export const uploadSingleFile = (
  file: File,
  options: AxiosRequestConfig = {}
): Promise<IResponse<IUploadResponse>> => {
  return httpService.post<IResponse<IUploadResponse>, { file: File }>(
    '/file/upload',
    { file },
    { ...config, ...options }
  )
}
