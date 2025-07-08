import { useGet } from '@/api/services/crud.service'
import {
  AcademicYearType,
  AdmissionType,
  CertificateSubject,
  CertificateType,
  ContractSumType,
  ContractTemplateType,
  EduDegree,
  EduInstitutionType,
  EduLanguage,
  EduLevel,
  EduSubject,
  EduType
} from '@/types/Classificatory'

const classifierCacheTime = 60 * 60 * 1000 // 1 hour

export const useGetEduSubjectsList = () =>
  useGet<EduSubject[]>(`/classificatory/subjects`, {}, { staleTime: classifierCacheTime })

export const useGetEduDegreesList = () =>
  useGet<EduDegree[]>(`/classificatory/degrees`, {}, { staleTime: classifierCacheTime })

export const useGetEduTypesList = () =>
  useGet<EduType[]>(`/classificatory/edu-types`, {}, { staleTime: classifierCacheTime })

export const useGetCertificateSubjects = () =>
  useGet<CertificateSubject[]>(
    `/classificatory/certificate-subjects`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetEduLevelsList = (enabled: boolean = true) =>
  useGet<EduLevel[]>(`/classificatory/edu-levels`, {}, { enabled, staleTime: classifierCacheTime })

export const useGetEduLanguagesList = () =>
  useGet<EduLanguage[]>(`/classificatory/languages`, {}, { staleTime: classifierCacheTime })

export const useGetEduInstitutionTypesList = () =>
  useGet<EduInstitutionType[]>(
    `/classificatory/edu-institution-types`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetAcademicYearsList = () =>
  useGet<AcademicYearType[]>(
    `/classificatory/academic-years`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetCertificateTypesList = () =>
  useGet<CertificateType[]>(
    `/classificatory/certificate-types`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetContractSumTypesList = () =>
  useGet<ContractSumType[]>(
    `/classificatory/contract-sum-types`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetContractTemplateTypesList = () =>
  useGet<ContractTemplateType[]>(
    `/classificatory/contract-template-types`,
    {},
    { staleTime: classifierCacheTime }
  )

export const useGetAdmissionTypes = () =>
  useGet<AdmissionType[]>(`/classificatory/admission-types`, {}, { staleTime: classifierCacheTime })
