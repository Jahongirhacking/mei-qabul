import { HOST } from '@/api/http'
import { generateFileList } from '@/lib/generators'
import { Button, GetProp, Upload, UploadProps } from 'antd'
import { UploadIcon } from 'lucide-react'
import { toast } from 'sonner'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const beforeUpload = (file: FileType) => {
  const isValidSize = file.size <= 5 * 1024 * 1024

  if (!isValidSize) {
    toast.error('Max file size is 5MB!')
    return Upload.LIST_IGNORE
  }

  return true
}

const defaultContent = (
  <Button size="large" className="w-full" type="dashed">
    <UploadIcon size={18} />
    Yuklash
  </Button>
)

export const FileInput = ({
  children,
  maxCount = 1,
  fileList: defaultFileList,
  ...props
}: UploadProps) => {
  const fileList = generateFileList(defaultFileList)
  const shouldSHowInput = fileList.length < maxCount

  return (
    <Upload
      action={`${HOST}/file/upload`}
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
