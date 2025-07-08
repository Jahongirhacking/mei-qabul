// hooks/useConfirm.tsx
import { useCallback } from 'react'

import { Modal } from 'antd'

type ConfirmOptions = {
  title: string
  content?: string
  okText?: string
  cancelText?: string
  okType?: 'primary' | 'danger' | 'default'
}

export function useConfirm() {
  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: options.title,
        // icon: <ExclamationCircleOutlined />,
        content: options.content || '',
        okText: options.okText || 'OK',
        cancelText: options.cancelText || 'Cancel',
        okType: options.okType || 'primary',
        onOk: () => resolve(true),
        onCancel: () => resolve(false)
      })
    })
  }, [])

  return confirm
}
