import { useTranslation } from 'react-i18next'

import { Form, Input } from 'antd'

export const FilterInputPin = () => {
  const { t } = useTranslation()
  return (
    <Form.Item label={t('title.pinfl')} name="pinfl" className="Mb">
      <Input placeholder={t('title.pinfl')} allowClear maxLength={14} />
    </Form.Item>
  )
}
