import { cn } from '@/lib/utils'
import { ApplicationStatusEnum } from '@/types/enum'

const statuses = {
  [ApplicationStatusEnum.APPROVED]: 'Tasdiqlangan',
  [ApplicationStatusEnum.CANCELLED]: 'Bekor qilindi',
  [ApplicationStatusEnum.NEW]: 'Yangi'
}

export const ApplicationStatusText = ({ status }: { status: ApplicationStatusEnum }) => {
  return (
    <span
      className={cn('text-lg', {
        'text-green-500': status === ApplicationStatusEnum.APPROVED,
        'text-red-500': status === ApplicationStatusEnum.CANCELLED,
        'text-blue-500': status === ApplicationStatusEnum.NEW
      })}
    >
      {statuses[status]}
    </span>
  )
}
