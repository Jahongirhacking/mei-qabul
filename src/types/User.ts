import { AdmissionStepState } from '@/app/store/admissionStore'
import { ExamTypeEnum } from '@/types/enum'

export type User = {
  id: number
  phoneNumber: string
  lastName: string
  firstName: string
  fatherName: string
  serialAndNumber: string
  birthDate: string
  givenDate: string
  universityId: number
  pinfl: string
  isActive: boolean
  gender: string
  examType: ExamTypeEnum
  citizenship: string
  nationality: string
  contractUrl: string
  photo: string
  applicantRegistrationForm?: string
  step?: AdmissionStepState
}

export type AuthResponse = {
  token: string
} & User

export type AuthParams = {
  code: string | null
  state: string | null
}

export type SignInResponse = User & {
  token: string
}

export type PassportResponse = {
  pinfl: string
  gender: string
  photo: string
  citizenship: string
  nationality: string
  birthDate: string
  lastName: string
  serialAndNumber: string
  fatherName: string
  passportExpireDate: string
  firstName: string
  givenDate: string
  country: string
  region: string
  district: string
  address: string
}

export interface IContractInfoResponseForQrCode {
  id: number
  language: string
  status: string
  phoneNumber: unknown
  university: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  speciality: string
  degree: string
  contractUrl: string
  eduType: string
  bill: unknown
  academicYear: string
  eduPeriod: string
  contractNumber: string
  contractSum: number
  specialityCode: string
  contractTemplateTypeId: unknown
  contractRegisterDate: string
  eduLevel: string
  contractTemplateType: string
}

export interface IApplicationInfoResponseForQrCode {
  id: number
  language: string
  comment: unknown
  url: string
  status: string
  phoneNumber: unknown
  university: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  specialityId: unknown
  examType: string
  speciality: string
  degree: string
  score: unknown
  examDate: unknown
  examTime: unknown
  eduType: string
  specialityCode: string
  admissionType: string
  examStatus: unknown
  examComment: unknown
}
