import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { BackButton } from '@/admin/components/buttons/BackButton'
import { useMenu } from '@/admin/hooks/useMenu'

interface TableContainerProps {
  title?: string
  hideTitle?: boolean
  extra?: ReactNode
  children?: ReactNode
  hasGoBack?: boolean
  padding?: string
  hasBg?: boolean
}

export const Container = ({
  hideTitle = false,
  hasGoBack = false,
  extra,
  children,
  title,
  hasBg = true,
  padding = 'p-4'
}: TableContainerProps) => {
  return (
    <div className={`${hasBg && 'bg-white'} ${padding} rounded-xl`}>
      <div className="flex justify-between items-center min-h-10 mb-2 gap-4 flex-wrap">
        <h3 className="text-xl font-semibold">{title || hideTitle || <PageTitle />}</h3>

        <div className="flex items-center gap-2">
          {extra}
          {hasGoBack && <BackButton />}
        </div>
      </div>

      {children}
    </div>
  )
}

function PageTitle() {
  const location = useLocation()
  const menu = useMenu()

  const title = menu?.find((item) => item?.key === location.pathname)?.label

  return <span>{title}</span>
}
