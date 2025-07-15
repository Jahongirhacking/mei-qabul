import { PaginationOptions } from './IRequest'

export interface IContract {
  id: number
  name: string
  url: string
  type: string
  createdDate: string
  isActive: boolean
  eduType: EduType
  language: Language
  degree: Degree
  universityId: number
}

export interface EduType {
  id: number
  name: string
}

export interface Language {
  id: number
  name: string
}

export interface Degree {
  id: number
  name: string
}

export interface IGetContractPricesResponse {
  id: number
  documentNumber: string
  documentDate: string
  basis: string
  academicYear: AcademicYear
}

export interface AcademicYear {
  id: number
  name: string
}

export interface IGetContractPricesByUniversityResponse {
  id: number
  code: string
  name: string
  contractPrices: ContractPrice[]
}

export interface ContractPrice {
  id: number
  degreeId: number
  withoutScholarship: number
}

export type IGetContractTemplatesOptions = {
  eduTypeId?: number
  degreeId?: number
  languageId?: number
} & PaginationOptions

export type IGetContractPricesOptionsByUniversity = {
  eduTypeId: number
  eduLevelId: number
  contractDetailId: number
  language?: string
}

export type IGetContractsOptions = {
  admissionTypeId: number
  examType?: string
  search?: string
} & PaginationOptions

export type IGetCancellationRequestsOptions = {
  admissionTypeId?: number
  examType?: string
} & PaginationOptions
export interface IGetContractsResponse {
  id: number
  language: string
  status: string
  phoneNumber: string
  pinfl: string
  speciality: string
  lastName: string
  firstName: string
  fatherName: string
  degree: string
  eduType: string
  bill: string
  academicYear: string
  eduPeriod: string
  contractNumber: string
  contractSum: number
  admissionTypeId: number
  degreeId: number
  languageId: number
  eduLevelId: number
  eduTypeId: number
  specialityId: number
  specialityCode: string
  contractRegisterDate: string
  contractUrl: string
  eduLevel: string
  contractTemplateType: string
}

export type IGetApplicationsOptions = {
  examStatus: string
  admissionTypeId: number
  specialityId?: number
  eduTypeId?: number
  languageId?: number
  degreeId?: number
} & PaginationOptions

export type IGetRejectedApplicationsOptions = {
  admissionTypeId: number
  specialityId?: number
  eduTypeId?: number
  languageId?: number
  degreeId?: number
} & PaginationOptions

export interface IGetApplicationsResponse {
  id: number
  language: string
  url: string
  status: string
  phoneNumber: string
  specialityId: unknown
  examType: string
  pinfl: string
  speciality: string
  lastName: string
  firstName: string
  fatherName: string
  degree: string
  specialityCode: string
  examDate: string
  examTime: string
}

export type IExamsParams = {
  examStatus: string
}

export interface PlannedExamDto {
  ids: number[]
  examDate: string
  examTime: string
  comment: string
}

export interface GenerateContractDto {
  applicationId: number
  score: number
}

export interface IUpdateEnContractPrices {
  contractDetailId: number
  eduTypeId: number
  eduLevelId: number
  specialities: Speciality[]
}

export interface Speciality {
  specialityId: number
  degrees: Degree[]
}

export interface Degree {
  degreeId: number
  contractPrice: number
}

export type IDownloadExcelCanceledApplicationsOptions = {
  admissionTypeId: number
  specialityId?: number
  eduTypeId?: number
  languageId?: number
  degreeId?: number
}

export type IDownloadExcelExamsApplicationsOptions = {
  admissionTypeId: number
  examStatus: string
  specialityId?: number
  eduTypeId?: number
  languageId?: number
  degreeId?: number
}

export type IDownloadExcelApplicationForCallCenterOptions = {
  admissionTypeId?: number
  examType?: string
  examStatus?: string
  specialityId?: number
  eduTypeId?: number
  languageId?: number
  degreeId?: number
  statusId?: number
}

export type IDownloadExcelSertificatesOptions = {
  subjectId?: number
}

export type IDownloadExcelOnlineApplicationsResultsOptions = {
  specialityId?: number
  examType?: string
}

export type IDownloadExcelContractsOptions = {
  admissionTypeId?: number
  examType?: string
}

export interface IApproveOrRejectCanecellationRequestDto {
  isApprove: boolean
  ids: number[]
}

export interface IGetOnlineApplicationsResultsResponse {
  id: number
  language: unknown
  comment: unknown
  url: unknown
  status: unknown
  existsCertificate: unknown
  answerSheetUrl: string
  phoneNumber: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  specialityId: unknown
  examType: unknown
  speciality: string
  degree: string
  score: number
  examDate: unknown
  examTime: unknown
  examComment: unknown
  eduType: string
  specialityCode: string
  examStatus: string
  existsContract: unknown
}

export type IGetOnlineApplicationsOptions = {
  specialityId?: number
  examType?: string
  search?: string
} & PaginationOptions

export interface IGetApplicationByIdResponse {
  id: number
  degree: string
  language: string
  speciality: string
  specialityCode: string
  status: string
  examType: string
  admissionType: string
  pinfl: string
  lastName: string
  firstName: string
  fatherName: string
  oldEdu: OldEdu
}

export interface OldEdu {
  diploma: string
  graduatedYear: number
  recommendation: string
  admissionTypeId: number
  eduInstitutionType: string
  eduInstitutionTypeId: number
  targetAdmissionTypeId: number
  workExperienceReference: string
  degree: string
  degreeId: number
  eduLevel: string
  eduLevelId: number
  speciality: string
  transcript: string
  university: string
  schoolCertificate?: string
}

export interface IUpdateApplicationDto {
  specialityId: number
  degreeId: number
  languageId: number
  admissionTypeId: number
  eduLevelId: number
}

export interface IUpdateContractDto {
  specialityId: number
  degreeId: number
  languageId: number
}

export interface ICreateApplicationDto {
  specialityId: number
  degreeId: number
  languageId: number
  examType: string
  comment: string
  graduatedYear: number
  eduInstitutionTypeId: number
  admissionTypeId: number
  user: User
}

export interface User {
  pinfl: string
  gender: string
  photo: string
  citizenship: string
  nationality: string
  nationalityId: number
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
  phoneNumber: string
}
