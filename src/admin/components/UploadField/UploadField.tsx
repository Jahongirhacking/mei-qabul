import { useState } from 'react'

import { deleteFile } from '@/admin/api/services/common.service'
import { uploadSingleFile } from '@/admin/api/services/file.service'
import { IServerFile } from '@/admin/utils/generators'
import { getBase64, successHandler } from '@/admin/utils/lib'
import { PlusOutlined } from '@ant-design/icons'
import {
  Form,
  type FormItemProps,
  Modal,
  Upload,
  type UploadFile,
  type UploadProps,
  message
} from 'antd'
import { toast } from 'sonner'

export type TUploadFile = (UploadFile & { isMain?: boolean; isServer?: boolean }) | IServerFile

export interface UploadFieldProps extends FormItemProps {
  uploadProps?: UploadProps
  maxCount: number
  multiple?: boolean
  logo: string | undefined
  refetch: () => void
  onRemove?: (file: TUploadFile) => void
}

export type TUploadEvent = {
  file: TUploadFile
  fileList: TUploadFile[]
}
const maxFileSize = 2 * 1024 * 1024 // 2 MB

const uploadEvent = ({ fileList }: TUploadEvent) => fileList

export const UploadField = ({
  name,
  label,
  maxCount,
  multiple = true,
  rules = [],
  required,
  uploadProps = {},
  logo,
  refetch
}: UploadFieldProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileList, setFileList] = useState<TUploadFile[]>([])
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string }>({
    url: '',
    title: ''
  })

  const beforeUpload = (file: UploadFile) => {
    if (file.type === 'application/pdf') {
      return false
    }

    const isLtMaxSize = file?.size && file?.size <= maxFileSize
    if (!isLtMaxSize) {
      message.error(`Rasm o'lchami  ${maxFileSize / 1024 / 1024} mb dan oshmasligi lozim`)
      return Upload.LIST_IGNORE
    }

    return true
  }

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File)
    }

    setPreviewImage({ url: file.url || (file.preview as string), title: file.name })
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList }: { fileList: TUploadFile[] }) => {
    if (fileList.length <= maxCount) {
      setFileList(fileList)
    }
  }

  return (
    <div>
      <Form.Item
        rules={[
          {
            required,
            message: 'Iltimos ${label} ni kiriting!'
          },
          ...rules
        ]}
        label={label}
        name={name}
        valuePropName="fileList"
        getValueFromEvent={uploadEvent}
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture-card"
          customRequest={({ file, onProgress, onError, onSuccess }) => {
            uploadSingleFile(file as File, {
              onUploadProgress: ({ total = 100, loaded }) => {
                onProgress!({ percent: Math.round((loaded / total) * 100) })
              }
            })
              .then((result) => {
                if (result) {
                  toast.success('File muvaffaqiyatli yuklandi')
                }
                onSuccess!(result)
              })
              .catch(onError)
          }}
          accept="image/png, image/jpeg"
          maxCount={maxCount}
          multiple={multiple}
          onRemove={(file) => {
            deleteFile(file.response.fileName).then((data) => {
              refetch()
              successHandler(data)
            })
          }}
          onChange={handleChange}
          onPreview={handlePreview}
          {...uploadProps}
        >
          {fileList.length < maxCount && !logo && (
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined style={{ color: 'var(--color_text)' }} />
              <div style={{ marginTop: 8, color: 'var(--color_text)' }}>Logo yuklash</div>
            </button>
          )}
        </Upload>
      </Form.Item>
      <Modal open={previewOpen} title={previewImage.title} footer={null} onCancel={handleCancel}>
        <img alt="preview" src={previewImage.url} />
      </Modal>
    </div>
  )
}
