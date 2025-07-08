import { UploadFileType } from '@/admin/api/services/upload.service'
import { GeneratedFileType } from '@/admin/utils/generators'
import { UploadFile } from 'antd'

export type Option<T = string | number | null> = {
  label: string
  value: T
}

export interface FormItemChildrenProps<T> {
  value?: T
  onChange?: (value: T) => void
}

export type FormFileType = UploadFile<UploadFileType> | GeneratedFileType
