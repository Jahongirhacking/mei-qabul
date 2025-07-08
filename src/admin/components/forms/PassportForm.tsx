import { useTranslation } from 'react-i18next'

import { useGetUserPassportInfo } from '@/admin/api/services/user.service'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { BaseResponse } from '@/admin/types/IRequest'
import { PassportResponse } from '@/admin/types/User'
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
      <div className="flex gap-x-4 items-end">
        <Form.Item name="pinfl" style={{ marginBottom: 0 }}>
          <TextInput placeholder="PINFL" />
        </Form.Item>
        <Form.Item name="serialAndNumber" style={{ marginBottom: 0 }}>
          <TextInput placeholder="Passport seriya va raqami" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button loading={checkByPassportLoading} htmlType="submit" color="green">
            {t('action.search')}
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
