import { useState } from 'react'

import { Container } from '@/admin/components/Container'
import { Tabs, TabsProps } from 'antd'

import FailedExams from './FailedExams'
import PassedExams from './PassedExams'
import PlannedExams from './PlannedExams'
import RejectedApplications from './RejectedApplications'

export default function OflineExamsPage() {
  const [tab, setTab] = useState<string>('NEW')
  const items: TabsProps['items'] = [
    {
      key: 'REJECTED',
      label: 'Bekor qilingan arizalar',
      children: <RejectedApplications />
    },
    {
      key: 'PLANNED',
      label: 'Imtihoni belgilanganlar',
      children: <PlannedExams examStatus={tab} />
    },

    {
      key: 'FAILED',
      label: "Imtihondan o'tmaganlar",
      children: <FailedExams examStatus={tab} />
    },
    {
      key: 'SUCCESS',
      label: "Imtihondan o'tganlar",
      children: <PassedExams examStatus={tab} />
    }
  ]

  return (
    <Container title="Offline imtihonlar">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(value) => {
          if (value !== 'REJECTED') setTab(value)
        }}
      />
    </Container>
  )
}
