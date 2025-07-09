import { useGet } from './crud.service'

export interface IStudent {
  name: string
  count: number
}

export const useGetAppCountByExamType = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-exam-type`, params)
export const useGetAppCountByGender = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-gender`, params)
export const useGetAppCountBySpeciality = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-speciality`, params)
export const useGetAppCountByEduForm = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-edu-form`, params)
export const useGetAppCountByLanguage = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-language`, params)
export const useGetAppCountByLastTenDay = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-last-ten-days`, params)
export const useGetAppCountByRegion = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`statistic/report/by-region`, params)
export const useGetAppCountByAdmissionType = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-admission-type`, params)

export const useGetAppCountEduOrg = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-edu-institution`, params)

export const useGetAppCountSchoolGraduated = (params: { universityCode?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-school-graduated-year`, params)
