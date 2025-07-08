import { ReactNode } from 'react'

import s from './PreviewList.module.css'

export interface PreviewListItem {
  title: string
  value: ReactNode
}

interface PreviewListProps {
  items: PreviewListItem[]
}

export const PreviewList = ({ items }: PreviewListProps) => {
  return (
    <div className={s.PreviewList}>
      {items.map((item) => (
        <div className={s.PreviewListItem} key={item.title}>
          <span>{item.title}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
