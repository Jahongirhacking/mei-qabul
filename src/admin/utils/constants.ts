import {
  ApplicationStatusIdEnum,
  ContractStatusEnum,
  ExamStatusEnum,
  ExamTypeEnum
} from '@/admin/types/enum'

export const examTypeList = [
  {
    label: ExamTypeEnum.OFFLINE,
    value: ExamTypeEnum.OFFLINE
  },
  {
    label: ExamTypeEnum.ONLINE,
    value: ExamTypeEnum.ONLINE
  },
  {
    label: ExamTypeEnum.RECOMMENDATION,
    value: ExamTypeEnum.RECOMMENDATION
  }
]

export const examStatusList = [
  {
    label: 'Yangi',
    value: ExamStatusEnum.NEW
  },
  {
    label: 'Imtihoni belgilangan',
    value: ExamStatusEnum.PLANNED
  },
  {
    label: "Imtihondan o'tgan",
    value: ExamStatusEnum.SUCCESS
  },
  {
    label: "Imtihondan o'tmagan",
    value: ExamStatusEnum.FAILED
  }
]

export const applicationStatusList = [
  {
    label: 'Tasdiqlangan',
    value: ApplicationStatusIdEnum.APPROVED
  },
  {
    label: 'Yangi',
    value: ApplicationStatusIdEnum.NEW
  },
  {
    label: 'Bekor qilingan',
    value: ApplicationStatusIdEnum.CANCELLED
  }
]

export const getApplicationStatusName = (status: string): string => {
  switch (status) {
    case ContractStatusEnum.REQUESTED_CANCELLATION:
      return "Bekor qilish uchun so'rov"
    case ContractStatusEnum.APPROVED:
      return 'Tasdiqlangan'
    case ContractStatusEnum.CANCELLED:
      return 'Bekor qilingan'
    case ContractStatusEnum.NEW:
      return 'Yangi'
    default:
      return ''
  }
}

export const getExamStatusName = (status: string): string => {
  switch (status) {
    case ExamStatusEnum.NEW:
      return 'Yangi'
    case ExamStatusEnum.PLANNED:
      return 'Imtihon kuni belgilangan'
    case ExamStatusEnum.SUCCESS:
      return 'Tavsiya etildi'
    case ExamStatusEnum.FAILED:
      return 'Tavsiya etilmadi'
    default:
      return ''
  }
}

export const getExamStatusColor = (status: string): string => {
  switch (status) {
    case ExamStatusEnum.NEW:
      return 'new'
    case ExamStatusEnum.SUCCESS:
      return 'confirmed'
    case ExamStatusEnum.FAILED:
      return 'rejected'
    case ExamStatusEnum.PLANNED:
      return 'pending'
    default:
      return ''
  }
}

export const getApplicationStatusColor = (status: string): string => {
  switch (status) {
    case ContractStatusEnum.REQUESTED_CANCELLATION:
      return 'pending'
    case ContractStatusEnum.APPROVED:
      return 'confirmed'
    case ContractStatusEnum.CANCELLED:
      return 'rejected'
    case ContractStatusEnum.NEW:
      return 'new'
    default:
      return ''
  }
}

export function openLink(url: string, fileName: string) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.download = fileName
  link.style.display = 'none'
  document.body.append(link)
  link.click()
  link.remove()
}

export const otmListForTiuSuperAdmin = [
  { value: 9, label: 'Qo‘qon universiteti' },
  { value: 99, label: 'Tashkent international university' },
  { value: 101, label: "Qo'qon universiteti Andijon filiali" }
]

export const otmListForMenejmentSuperAdmin = [
  { value: 43, label: 'Toshkent menedjment va iqtisodiyot instituti' },
  { value: 1000, label: 'Toshkent menedjment va iqtisodiyot instituti Farg‘ona kampus' }
]
