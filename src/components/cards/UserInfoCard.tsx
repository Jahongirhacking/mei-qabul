import React, { ReactElement, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface InfoItemProps {
  label: string
  value: ReactNode
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex items-baseline">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="flex-1 mx-2 border-b border-dotted border-gray-300" />
    <div className="text-gray-900 text-end">{value}</div>
  </div>
)

interface UserInfoCardProps {
  items: InfoItemProps[];
  title?: string | ReactElement;
  className?: string;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ items, title, className }) => {
  return (
    <div className={cn('bg-white rounded-2xl p-8 w-full', className)}>
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
      <div className="space-y-3">
        {items.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
