import { uploadFile } from '@/admin/api/services/upload.service'
import { FileInput } from '@/admin/components/inputs/FileInput'
import { generateFile } from '@/admin/utils/generators'
import { GetProp, Upload, UploadProps } from 'antd'
import { toast } from 'sonner'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

type QuestionInputProps = {
  value?: string
  onChange?: (value?: string) => void
}

const FILE_SIZE_LIMIT = 3 // MB

const beforeUpload = (file: FileType) => {
  const isValidSize = file.size <= FILE_SIZE_LIMIT * 1024 * 1024

  if (!isValidSize) {
    toast.warning(`Max file size is ${FILE_SIZE_LIMIT}MB!`)
    return Upload.LIST_IGNORE
  }

  return false
}

export const QuestionInput = ({ value = '', onChange, ...props }: QuestionInputProps) => {
  return (
    <div className="flex w-full gap-2">
      <FileInput
        className="grow"
        fileList={value ? [generateFile(value)] : []}
        accept="image/*"
        beforeUpload={beforeUpload}
        onChange={async ({ file }) => {
          if (file.status === 'removed') {
            onChange!(undefined)
            return
          }

          const response = await uploadFile(file as unknown as File)
          onChange!(response.url)
        }}
        {...props}
      />
    </div>
  )
}
