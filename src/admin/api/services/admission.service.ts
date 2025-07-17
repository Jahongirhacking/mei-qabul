import { useGet } from './crud.service'

export interface IStudent {
  name: string
  count: number
}

// export const useGetAppCountByExamType = (params: { universityCode?: number }) =>
//   useGet<IStudent[]>(`/statistic/report/by-exam-type`, params)
export const useGetAppCountByGender = () => useGet<IStudent[]>(`/statistic/report/by-gender`)
export const useGetAppCountBySpeciality = (params: { eduTypeId?: number }) =>
  useGet<IStudent[]>(`/statistic/report/by-speciality`, params)
// export const useGetAppCountByEduForm = (params: { universityCode?: number }) =>
//   useGet<IStudent[]>(`/statistic/report/by-edu-form`, params)
// export const useGetAppCountByLanguage = (params: { universityCode?: number }) =>
//   useGet<IStudent[]>(`/statistic/report/by-language`, params)
export const useGetAppCountByLastTenDay = () =>
  useGet<IStudent[]>(`/statistic/report/by-last-ten-days`)
export const useGetAppCountByRegion = () => useGet<IStudent[]>(`statistic/report/by-region`)
export const useGetAppCountByAdmissionType = () =>
  useGet<IStudent[]>(`/statistic/report/by-admission-type`)

export const useGetAppCountEduOrg = () => useGet<IStudent[]>(`/statistic/report/by-edu-institution`)

export const useGetAppCountSchoolGraduated = () =>
  useGet<IStudent[]>(`/statistic/report/by-school-graduated-year`)
