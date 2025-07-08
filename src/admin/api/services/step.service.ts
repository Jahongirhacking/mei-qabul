import { useGet } from '@/admin/api/services/crud.service'
import { EduLevel } from '@/admin/types/Classificatory'
import { Pagination, PaginationOptions, QueryParam } from '@/admin/types/IRequest'
import { ExamTypeEnum } from '@/admin/types/enum'

export type StepState = {
  eduTypeId: number
  eduLevelId: number
  specialtyId: number
  degreeId: number
  examType: ExamTypeEnum
  admissionTypeId: number
  eduInstitutionTypeId: number
  languageId: number
  graduatedYear: number
  eduLevels: EduLevel[]
  speciality: string
  university: string
  diplomaUrl: string
}

export type AdmissionStepState = {
  stepState: Partial<StepState>
  currentStep: number
}

export type StepUser = {
  id: number
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  phoneNumber: string
  gender: string
  serialAndNumber: string
  step: unknown
}

export type UserStepsQuery = {
  step?: QueryParam
} & PaginationOptions

export const useGetUserSteps = ({ step, ...options }: UserStepsQuery) =>
  useGet<Pagination<StepUser[]>, UserStepsQuery>(`/user/not-completed/${step}`, options)
