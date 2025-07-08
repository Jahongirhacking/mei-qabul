import { PropsWithChildren } from 'react'

import { Card, Descriptions, type DescriptionsProps } from 'antd'

export interface PreviewCardProps {
  list?: DescriptionsProps['items']
  loading?: boolean
}

export const PreviewCard = ({ list, loading, children }: PropsWithChildren<PreviewCardProps>) => {
  return (
    <Card bordered={false} loading={loading}>
      {children}
      {list && (
        <Descriptions
          column={1}
          size="small"
          bordered
          style={{ marginTop: '16px' }}
          title={null}
          items={list}
          labelStyle={{
            fontWeight: 'bold'
          }}
        />
      )}
    </Card>
  )
}
