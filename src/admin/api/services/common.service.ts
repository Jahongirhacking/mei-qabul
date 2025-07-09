import { useCreate, useDownloadExcel, useGet, useUpdate } from '@/admin/api/services/crud.service'
import {
  AcademicYearType,
  CertificateType,
  ContractSumType,
  ContractTemplateType,
  EduDegree,
  EduInstitutionType,
  EduLanguage,
  EduLevel,
  EduSubject,
  EduType,
  ICreateAdmissionDeadlinesDto,
  IDegreeOptions,
  IDownloadExcelReportApplicationsOptions,
  IGetApplicationsForCallCenterOptions,
  IGetApplicationsForCallCenterResponse,
  IGetCertificatesOptions,
  IGetCertificatesResponse,
  IGetReportApplicationsOptions,
  IGetReportsApplicationsResponse,
  ILanguageOptions,
  ISpecialityListResponse,
  ISpecialityOptions,
  ISpecialtyList,
  IUniversityDto,
  IUniversityInfoResponse,
  Role
} from '@/admin/types/Classificatory'
import { BaseResponse, Pagination, WithId } from '@/admin/types/IRequest'

import { httpService } from '../http'
import { MutationOptions } from '../query'

export const useGetEduSubjectsList = () => useGet<EduSubject[]>(`/classificatory/subjects`)

export const useGetUniversitiesList = ({ enabled = true }: { enabled: boolean }) =>
  useGet<EduSubject[]>(`/classificatory/universities`, undefined, { enabled })

export const useGetEduDegreesList = () => useGet<EduDegree[]>(`/classificatory/degrees`)
export const useGetEduDegreesListByFilter = (options: IDegreeOptions) =>
  useGet<EduDegree[]>(`/admission/degrees`, options.params, { enabled: options.enabled })

export const useGetSpecialtiesList = () => useGet<ISpecialtyList[]>(`/speciality/list`)
export const useGetSpecialtiesListByFilter = (options: ISpecialityOptions) =>
  useGet<ISpecialityListResponse[]>(`/admission/by-classificatory/specialities`, options.params, {
    enabled: options.enabled
  })

export const useGetEduLanguagesList = () => useGet<EduLanguage[]>(`/classificatory/languages`)
export const useGetEduLanguagesListByFilter = (options: ILanguageOptions) =>
  useGet<EduLanguage[]>(`/admission/languages`, options.params, { enabled: options.enabled })

export const useGetEduTypesList = () => useGet<EduType[]>(`/classificatory/edu-types`)
export const useGetRegionsList = () => useGet<EduType[]>(`/classificatory/regions`)
export const useGetDistrictsList = () => useGet<EduType[]>(`/classificatory/districts`)

export const useSpecialtyListByEduTypeId = (id: number) =>
  useGet<ISpecialtyList[]>(`/edu-type/${id}/specialities`)

export const useGetEduLevelsList = () => useGet<EduLevel[]>(`/classificatory/edu-levels`)

export const useGetEduInstitutionTypesList = () =>
  useGet<EduInstitutionType[]>(`/classificatory/edu-institution-types`)

export const useGetAcademicYearsList = () =>
  useGet<AcademicYearType[]>(`/classificatory/academic-years`)

export const useGetAdmissionTypeList = () =>
  useGet<AcademicYearType[]>(`/classificatory/admission-types`)

export const useGetCertificateTypesList = () =>
  useGet<CertificateType[]>(`/classificatory/certificate-types`)

export const useGetContractSumTypesList = () =>
  useGet<ContractSumType[]>(`/classificatory/contract-sum-types`)

export const useGetContractTemplateTypesList = () =>
  useGet<ContractTemplateType[]>(`/classificatory/contract-template-types`)

export const useGetRolesList = ({ enabled = true }: { enabled: boolean }) =>
  useGet<Role[]>(`/classificatory/roles`, undefined, { enabled })

export const useGetUniversityInfo = () =>
  useGet<BaseResponse<IUniversityInfoResponse>>(`/admin/university`)

export const useUpdateUniversiy = (
  options: MutationOptions<WithId<IUniversityDto>, BaseResponse<void>>
) => useUpdate<BaseResponse<void>, IUniversityDto>('/admin/university', options)

export const deleteFile = async (fileName: string) =>
  httpService.delete<BaseResponse<void>>(`/file/delete?fileName=${fileName}`)

export const useCreateAdmissionDeadlines = (
  options: MutationOptions<ICreateAdmissionDeadlinesDto[], BaseResponse<void>>
) =>
  useCreate<BaseResponse<void>, ICreateAdmissionDeadlinesDto[]>(
    '/speciality/admission-deadline',
    options
  )

export const useGetApplicationsForCallCenter = (options: IGetApplicationsForCallCenterOptions) =>
  useGet<Pagination<IGetApplicationsForCallCenterResponse[]>, IGetApplicationsForCallCenterOptions>(
    '/admin/applications',
    options
  )

export const useGetCertificates = (options: IGetCertificatesOptions) =>
  useGet<Pagination<IGetCertificatesResponse[]>, IGetCertificatesOptions>('/certificates', options)

export const useGetReportApplications = (options: IGetReportApplicationsOptions) =>
  useGet<Pagination<IGetReportsApplicationsResponse[]>, IGetReportApplicationsOptions>(
    '/report/application-count/by-speciality',
    options
  )

export const useDownloadExcelReportApplications = (
  options: MutationOptions<IDownloadExcelReportApplicationsOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelReportApplicationsOptions>(
    '/report/application-count/by-speciality/excel',
    options
  )

export const useRejectSertificates = (options: MutationOptions<number[], BaseResponse>) =>
  useCreate<BaseResponse, number[]>('/certificate/cancel', options)
