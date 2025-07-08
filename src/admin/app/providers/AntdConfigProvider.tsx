import { ReactNode } from 'react'

import { theme } from '@/admin/app/styles/theme'
import { ConfigProvider } from 'antd'

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>
}
