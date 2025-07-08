import { MutationOptions } from '@/admin/api/query'
import { useCreate, useGet, useUpdate } from '@/admin/api/services/crud.service'
import { EduType, FormEducation } from '@/admin/types/Classificatory'
import {
  BaseResponse,
  Pagination,
  PaginationOptions,
  QueryParam,
  WithId
} from '@/admin/types/IRequest'

export type Specialty = {
  id: number
  code: string
  hemisId: string
  specialityName: string
  specialityNameRu: string
  specialityNameEng: string
  formEducation: FormEducation
  eduType: EduType
  universityId: number
  universityName: string
  universityCode: string
  admissionStartDate: string
  admissionEndDate: string
  isActive: boolean
  availableRecommendation: boolean
  eduPeriod: string
} & SpecialtyDto

export type SpecialtyDto = {
  educationLevels: EducationLevel[]
  subjects: Subject[]
  description?: string
  admissionTypeId?: QueryParam
  availableRecommendation: boolean
}

export interface EducationLevel {
  educationLevelId: number
  degrees: Degree[]
}

export interface Degree {
  degreeId: number
  languageIds: number[]
}

export interface Subject {
  id: number
  score: number
  priority: number
}

export interface IGetEducationPeriodsParams {
  eduTypeId: number
}

export interface IGetEducationPeriodResponse {
  specialityId: number
  specialityName: string
  specialityCode: string
  eduPeriods: EduPeriod[]
}

export interface EduPeriod {
  degreeId: number
  eduPeriod: number
}

export type IGetSpecialtiesOption = {
  eduTypeId?: number
  search?: string
  admissionTypeId?: number
} & PaginationOptions

export const useGetSpecialties = (options: IGetSpecialtiesOption) =>
  useGet<Pagination<Specialty[]>, IGetSpecialtiesOption>('/speciality', options)

export const useGetSpecialty = (id: QueryParam, admissionTypeId: QueryParam) =>
  useGet<BaseResponse<Specialty>>(`/speciality/${id}?admissionTypeId=${admissionTypeId}`)

export const useSynchronizeSpecialies = (options: MutationOptions<void, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, void>('/speciality/synchronize', options)

export const useUpdateSpecialty = (options: MutationOptions<WithId<SpecialtyDto>, void>) =>
  useUpdate<void, SpecialtyDto>('/speciality', options)

export const useGetEducationPeriods = (options: IGetEducationPeriodsParams) =>
  useGet<IGetEducationPeriodResponse[], IGetEducationPeriodsParams>('/education-period', options)

export const useSynchronizeEducationPeriod = (options: MutationOptions<void, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, void>('/education-period/synchronize', options)

export const useGetSpecialtiesList = () => useGet<Specialty[]>('/speciality/list')
