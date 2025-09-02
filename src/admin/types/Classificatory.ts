import { PaginationOptions } from './IRequest'
import { ExamStatusEnum } from './enum'

type Common = {
  id: number
  name: string
}

export type EduSubject = Common

export type EduLanguage = Common

export type EduType = Common

export type EduLevel = Common

export type EduDegree = Common

export type EduInstitutionType = {
  id: number
  name: string
  availableAdmissionTypes: number[]
}

export type ContractTemplateType = Common

export type ContractSumType = Common

export type CertificateType = Common

export type AcademicYearType = Common

export interface ISpecialtyList {
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
  universityCode: unknown
  isActive: unknown
  eduPeriod: unknown
}

export type FormEducation = Common

export type Role = {
  id: number
  name: string
}

export interface IUniversityInfoResponse {
  id: number
  code: string
  name: string
  nameRu: string
  nameEng: string
  tin: string
  regionId: number
  region: string
  districtId: number
  district: string
  email: string
  address: string
  chiefAccountant: string
  logo: string
  rector: string
  phoneNumber: string
  location: string
  isActive: boolean
}

export interface IUniversityDto {
  id: number
  code: string
  name: string
  nameRu: string
  nameEng: string
  tin: string
  regionId: number
  region: string
  districtId: number
  district: string
  email: string
  address: string
  chiefAccountant: string
  logo: string | null
  rector: string
  phoneNumber: string
  location: string
  isActive: boolean
}

export interface IUniversityFormValues {
  id: number
  code: string
  name: string
  nameRu: string
  nameEng: string
  tin: string
  regionId: number
  region: string
  districtId: number
  district: string
  email: string
  address: string
  chiefAccountant: string
  logo: {
    response: {
      id: number
      fileName: string
      url: string
    }
  }[]
  rector: string
  phoneNumber: string
  location: string
  isActive: boolean
}

export interface ICreateAdmissionDeadlinesDto {
  id: number
  admissionStartDate: string
  admissionEndDate: string
}

export type IGetApplicationsForCallCenterOptions = {
  examType?: string
  admissionTypeId?: number
  examStatus?: ExamStatusEnum
  specialityId?: number
  search?: string
  eduTypeId?: number
  languageId?: number
  degreeId?: number
  statusId?: number
} & PaginationOptions

export type IGetCertificatesOptions = {
  search?: string
  subjectId?: number
} & PaginationOptions

export type IGetReportApplicationsOptions = {
  admissionTypeId?: number
  specialityId?: number
} & PaginationOptions

export interface IGetApplicationsForCallCenterResponse {
  id: number
  language: string
  comment: string
  url: string
  status: string
  phoneNumber: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  specialityId: number
  examType: string
  speciality: string
  degree: string
  examDate: string
  examTime: string
  specialityCode: string
  existsContract: boolean
  userId: number
  degreeId: number
  languageId: number
  admissionTypeId: number
  eduLevelId: number
  eduTypeId: number
  availableRecommendation: boolean
}

export interface IGetCertificatesResponse {
  subject: string
  id: number
  number: string
  url: string
  phoneNumber: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  givenDate: string
  serialAndNumber: string
  certificateType: string
  score: string
  isActive: boolean
}

export interface IGetReportsApplicationsResponse {
  language: string
  speciality: string
  degree: string
  specialityCode: string
  admissionType: string
  total: number
  todayApplicationCount: number
  certificateCount: number
}

export type IDownloadExcelReportApplicationsOptions = {
  admissionTypeId?: number
}

export interface IDegreeOptions {
  params: {
    eduTypeId?: number
    eduLevelId?: number
    admissionTypeId?: number
  }
  enabled: boolean
}

export interface ILanguageOptions {
  params: {
    eduTypeId?: number
    eduLevelId?: number
    admissionTypeId?: number
    degreeId?: number
  }
  enabled: boolean
}

export interface ISpecialityOptions {
  params: {
    eduTypeId?: number
    eduLevelId?: number
    languageId?: number
    degreeId?: number
    admissionTypeId?: number
  }
  enabled: boolean
}

export interface ISpecialityListResponse {
  specialityId: number
  examType: string
  speciality: string
  specialityCode: string
}
