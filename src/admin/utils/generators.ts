import { UploadFileType } from '@/admin/api/services/upload.service'
import { UploadFile } from 'antd'

export type GeneratedFileType = UploadFile<UploadFileType>

export interface IServerFile extends UploadFile {
  isServer: boolean
  isMain?: boolean
  url: string
  fileName: string
}

export const generateFile = (url: string): GeneratedFileType => {
  const name = url.split('/').pop() || 'file'
  return {
    uid: url,
    name: name,
    status: 'done',
    url,
    thumbUrl: url,
    response: { url, fileName: name }
  }
}

export const generateFileList = (fileList?: string[]): GeneratedFileType[] => {
  if (!fileList) return []

  return fileList.map((file) => generateFile(file))
}
