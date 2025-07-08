import { useTranslation } from 'react-i18next'

import { Button, ButtonProps } from 'antd'
import { Plus } from 'lucide-react'

export const AddButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button type="primary" {...props}>
      <Plus size={18} />
      {children || t('action.add')}
    </Button>
  )
}
