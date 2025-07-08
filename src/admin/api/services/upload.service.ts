import { httpService } from '@/admin/api/http'

export type UploadFileType = {
  url: string
  fileName: string
}

export const uploadFile = (file: File): Promise<UploadFileType> => {
  const formData = new FormData()
  formData.append('file', file)

  return httpService.post<UploadFileType, FormData>('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
