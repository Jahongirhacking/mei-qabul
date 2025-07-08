export type CommonType = {
  id: number
  name: string
}

export type EduSubject = CommonType

export type EduLanguage = CommonType

export type EduType = CommonType

export type EduLevel = CommonType

export type EduDegree = CommonType

export type EduInstitutionType = CommonType & {
  availableAdmissionTypes: AdmissionType['id'][]
}

export type ContractTemplateType = CommonType

export type ContractSumType = CommonType

export type CertificateType = CommonType

export type AcademicYearType = CommonType

export type AdmissionType = {
  id: number
  eduTypeId: number
  name: string
  eduLevels: EduLevel[]
}

export interface CertificateSubject {
  id: number
  name: string
  certificateTypes: CertificateType[]
}
