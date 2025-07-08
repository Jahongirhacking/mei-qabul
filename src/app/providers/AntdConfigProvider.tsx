import { ReactNode } from 'react'

import { ConfigProvider } from 'antd'

const validateMessages = {
  required: 'Iltimos, ${label}ni kiriting!'
}

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      form={{
        validateMessages
      }}
      theme={{
        token: {
          // colorPrimary: '#33e6c7'
        },
        components: {
          Modal: { borderRadiusLG: 24, borderRadius: 24, borderRadiusXS: 24, borderRadiusSM: 24 }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
