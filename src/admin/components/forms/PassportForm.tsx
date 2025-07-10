import { useTranslation } from 'react-i18next'

import { useGetUserPassportInfo } from '@/admin/api/services/user.service'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { BaseResponse } from '@/admin/types/IRequest'
import { PassportResponse } from '@/admin/types/User'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, type FormProps } from 'antd'

interface PassportFormProps extends FormProps {
  onSuccess: (data: PassportResponse) => void
}

export const PassportForm = ({ onSuccess, ...props }: PassportFormProps) => {
  const { t } = useTranslation()

  const { create: checkByPassport, isCreating: checkByPassportLoading } = useGetUserPassportInfo({
    onSuccess: (data: BaseResponse<PassportResponse>) => {
      onSuccess(data.data)
    }
  })

  return (
    <Form onFinish={checkByPassport} {...props}>
      <div className="flex gap-x-4 items-center">
        <Form.Item
          name="pinfl"
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: t('required') }]}
        >
          <TextInput placeholder="PINFL" />
        </Form.Item>
        <Form.Item
          name="serialAndNumber"
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: t('required') }]}
        >
          <TextInput placeholder="Passport seriya va raqami" />
        </Form.Item>

        <Form.Item shouldUpdate style={{ marginBottom: 0 }}>
          {({ getFieldValue }) => {
            const pinfl = getFieldValue('pinfl')
            const serialAndNumber = getFieldValue('serialAndNumber')
            const isDisabled = !pinfl || !serialAndNumber
            return (
              <Button
                loading={checkByPassportLoading}
                htmlType="submit"
                color="green"
                icon={<SearchOutlined />}
                disabled={isDisabled}
              >
                Qidirish
              </Button>
            )
          }}
        </Form.Item>
      </div>
    </Form>
  )
}
