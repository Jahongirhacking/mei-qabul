import { useState } from 'react'

import { Container } from '@/admin/components/Container'
import { Tabs, TabsProps } from 'antd'

import EnContractPricesPage from './EnContractPricesPage'
import UzRuContractPricesPage from './UzRuContractPricesPage'

export default function DetailContractPricesPage() {
  const [tab, setTab] = useState<string>('1')
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: "O'zbek va Rus tili shartnoma narxlari",
      children: <UzRuContractPricesPage tab={tab} />
    },
    {
      key: '2',
      label: 'Ingliz tili shartnoma narxlari',
      children: <EnContractPricesPage tab={tab} />
    }
  ]

  return (
    <Container title="Shartnoma narxlari" hasGoBack>
      <Tabs
        defaultActiveKey={tab}
        items={items}
        onChange={(value) => {
          if (value !== 'REJECTED') setTab(value)
        }}
      />
    </Container>
  )
}
