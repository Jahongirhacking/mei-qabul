import { httpService } from '@/api/http'
import { BaseResponse } from '@/types/IRequest'

export type UploadFileType = {
  url: string
  fileName: string
}

export const uploadFile = async (file: File): Promise<UploadFileType> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await httpService.post<BaseResponse<UploadFileType>, FormData>(
    '/public/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}
