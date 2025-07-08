import { cn } from '@/lib/utils'
import { ContractStatusEnum } from '@/types/enum'

const statuses = {
  [ContractStatusEnum.APPROVED]: 'Tasdiqlangan',
  [ContractStatusEnum.CANCELLED]: 'Bekor qilindi',
  [ContractStatusEnum.REQUESTED_CANCELLATION]: "Bekor qilish ko'rib chiqilmoqda"
}

export const ContractStatusText = ({ status }: { status: ContractStatusEnum }) => {
  return (
    <span
      className={cn('text-lg', {
        'text-green-500': status === ContractStatusEnum.APPROVED,
        'text-red-500': status === ContractStatusEnum.CANCELLED,
        'text-orange-500': status === ContractStatusEnum.REQUESTED_CANCELLATION
      })}
    >
      {statuses[status]}
    </span>
  )
}
