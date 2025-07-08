import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button, type ButtonProps } from 'antd'
import { Undo2 } from 'lucide-react'

interface Props extends ButtonProps {
  path?: string
}

export const BackButton = ({ path, ...props }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onBack = () => {
    if (path) {
      navigate(path)
    } else {
      navigate(-1)
    }
  }

  return (
    <Button shape="round" danger htmlType="button" onClick={onBack} {...props}>
      <Undo2 size={18} />
      {t('action.goBack')}
    </Button>
  )
}
