import { UploadFileType } from '@/api/services/upload.service'
import { UploadFile } from 'antd'

export type GeneratedFileType = UploadFile<UploadFileType>

const extractFileName = (url: string): string => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export const generateFile = (url: string): GeneratedFileType => {
  const fileName = extractFileName(url)

  return {
    uid: url,
    name: fileName,
    status: 'done',
    url,
    thumbUrl: url,
    response: { url, fileName }
  }
}

type FileListType = string | string[] | GeneratedFileType[]

export const generateFileList = (fileList?: FileListType): GeneratedFileType[] => {
  if (!fileList) return []

  if (typeof fileList === 'string') {
    return [generateFile(fileList)]
  }

  if (typeof fileList === 'object' && Array.isArray(fileList)) {
    return fileList.map((file) => {
      if (typeof file === 'string') {
        return generateFile(file)
      }

      return file
    })
  }

  return fileList
}

export function extractFileFromValue(value?: string | GeneratedFileType[]) {
  if (!value) return ''

  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value?.[0]?.response?.url as string
  }

  return ''
}
