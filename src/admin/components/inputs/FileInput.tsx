import { FILE_SIZE_LIMIT } from '@/admin/config/const'
import { generateFile } from '@/admin/utils/generators'
import { Button, GetProp, Upload, UploadProps } from 'antd'
import { UploadIcon } from 'lucide-react'
import { toast } from 'sonner'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const beforeUpload = (file: FileType) => {
  const isValidSize = file.size <= FILE_SIZE_LIMIT

  if (!isValidSize) {
    toast.warning('Max file size is 5MB!')
    return Upload.LIST_IGNORE
  }

  return true
}

const defaultContent = (
  <Button className="w-full" type="dashed">
    <UploadIcon size={18} />
    Yuklash
  </Button>
)

export const FileInput = ({ children, maxCount = 1, fileList: value, ...props }: UploadProps) => {
  const fileList = value ? value : typeof value === 'string' ? [generateFile(value)] : []

  const shouldSHowInput = fileList?.length < maxCount

  return (
    <Upload
      // action={`${HOST}/file/upload`}
      accept="application/pdf"
      listType="picture"
      beforeUpload={beforeUpload}
      fileList={fileList}
      {...props}
    >
      {shouldSHowInput && (children || defaultContent)}
    </Upload>
  )
}
