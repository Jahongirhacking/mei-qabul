import { ExamTypeEnum } from '@/types/enum'

const statuses = {
  [ExamTypeEnum.OFFLINE]: 'Offline',
  [ExamTypeEnum.ONLINE]: 'Online',
  [ExamTypeEnum.RECOMMENDATION]: 'Maqsadli qabul',
  [ExamTypeEnum.INTERVIEW]: 'Suhbat'
}

export const ExamTypeText = ({ type }: { type?: ExamTypeEnum }) => {
  if (!type) return null

  return <span>{statuses[type]}</span>
}
