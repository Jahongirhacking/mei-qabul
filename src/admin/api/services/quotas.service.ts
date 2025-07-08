import { MutationOptions } from '@/admin/api/query'
import { useCreate, useGet } from '@/admin/api/services/crud.service'
import { BaseResponse, QueryParam } from '@/admin/types/IRequest'

export type QuotaByEduType = {
  degreeId: number
  specialityId: number
  languageId: number
  speciality: string
  specialityCode: string
  quota: number
}

// export interface Degree {
//   degreeId: number
//   languages: Language[]
// }

// export interface Language {
//   languageId: number
//   quota: number
// }

export type QuotaDto = Pick<QuotaByEduType, 'specialityId' | 'degreeId' | 'languageId' | 'quota'>

export const useGetQuotasByEduTypeId = (eduTypeId: QueryParam) =>
  useGet<QuotaByEduType[]>(`/quota/speciality/edu-type/${eduTypeId}`)

export const useCreateQuota = (options: MutationOptions<QuotaDto[], BaseResponse>) =>
  useCreate<BaseResponse, QuotaDto[]>('/quota/speciality', options)
