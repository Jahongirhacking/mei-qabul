import { MutationOptions } from '@/api/query'
import { useCreate, useGet } from '@/api/services/crud.service'
import { checkIsValidValues } from '@/lib/utils'
import { EduDegree, EduLanguage } from '@/types/Classificatory'
import { BaseResponse } from '@/types/IRequest'
import { ExamTypeEnum } from '@/types/enum'

export type Specialty = {
  specialityId: number
  speciality: string
  specialityCode: string
  contractPrice: number
  examType: ExamTypeEnum
}

export interface FormEducation {
  id: number
  name: string
}

export interface EduType {
  id: number
  name: string
}

export type ApplyDto = {
  specialityId: number
  degreeId: number
  admissionTypeId: number
  languageId: number
  examType: ExamTypeEnum
  eduLevelId: number
}

export interface SpecialtyLanguage {
  languages: EduLanguage[]
  contractPrice: number
}

type AdmissionParams = {
  degreeId?: number
  eduLevelId?: number
  eduTypeId?: number
  languageId?: number
  admissionTypeId?: number
}

export const useGetAdmissionDegrees = ({
  admissionTypeId
}: Pick<AdmissionParams, 'admissionTypeId'>) =>
  useGet<EduDegree[]>(`/admission/degrees`, { admissionTypeId })

export const useGetAdmissionLanguages = (
  params: Pick<AdmissionParams, 'eduTypeId' | 'eduLevelId' | 'degreeId' | 'admissionTypeId'>
) =>
  useGet<EduLanguage[]>('/admission/languages', params, {
    enabled: checkIsValidValues(params)
  })

export const useGetAdmissionSpecialties = (params: AdmissionParams) =>
  useGet<Specialty[]>('/admission/specialities/by-classificatory', params, {
    enabled: !!params.degreeId
  })

export const useApply = (options: MutationOptions<ApplyDto, BaseResponse<string>>) =>
  useCreate<BaseResponse<string>, ApplyDto>('/application', options)
