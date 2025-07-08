import type { FallbackProps } from 'react-error-boundary'

import { Button, Space } from 'antd'

export const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: '3rem'
      }}
    >
      <Space
        direction="vertical"
        size="large"
        align={'center'}
        style={{ padding: '1rem', textAlign: 'center' }}
      >
        <h3>There was an error</h3>
        <p style={{ color: 'red' }}>Error: {error?.message}</p>
        <Space>
          <Button
            onClick={() => {
              window.location.reload()
            }}
          >
            Orqaga qaytish
          </Button>
          <Button
            onClick={() => {
              window.location.href = '/'
            }}
            type="primary"
          >
            Bosh sahifaga qaytish
          </Button>
        </Space>
      </Space>
    </div>
  )
}
