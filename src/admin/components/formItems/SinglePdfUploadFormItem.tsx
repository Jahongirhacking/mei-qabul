import { useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, message } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
import { FormInstance } from 'antd/lib'

interface Props {
  name: string
  label: string
  required?: boolean
  form: FormInstance
}

export const SinglePdfUploadFormItem = ({ name, label, required = true, form }: Props) => {
  const [fileList, setFileList] = useState<RcFile[]>([])

  const beforeUpload = (file: RcFile) => {
    const isPdf = file.type === 'application/pdf'
    if (!isPdf) {
      message.error('Faqat PDF fayl yuklanadi!')
      return Upload.LIST_IGNORE
    }

    const isLt5MB = file.size / 1024 / 1024 < 5
    if (!isLt5MB) {
      message.error('Fayl hajmi 5MB dan oshmasligi kerak!')
      return Upload.LIST_IGNORE
    }

    setFileList([file])
    return false
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required: true, message: 'Iltimos, fayl yuklang!' }] : []}
      valuePropName="fileList"
      getValueFromEvent={() => fileList}
    >
      <Upload
        accept=".pdf"
        listType="picture"
        beforeUpload={beforeUpload}
        fileList={fileList}
        onRemove={() => {
          setTimeout(() => {
            setFileList([])
            form.resetFields([name])
          }, 0)
        }}
        maxCount={1}
        showUploadList={{ showRemoveIcon: true }}
      >
        {fileList.length === 0 && (
          <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
            Fayl tanlash
          </Button>
        )}
      </Upload>
    </Form.Item>
  )
}
