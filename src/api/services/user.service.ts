import { httpService } from '@/api/http'
import { MutationOptions } from '@/api/query'
import { SignUpDto } from '@/api/services/auth.service'
import { useCreate, useGet } from '@/api/services/crud.service'
import { AdmissionStepState } from '@/app/store/admissionStore'
import { BaseResponse } from '@/types/IRequest'
import { User } from '@/types/User'

export type UserPersonalInfo = User

// export type PassportDto = {
//   pinfl: string
//   serialAndNumber: string
// }

export const useGetUserMe = () =>
  useGet<UserPersonalInfo>('/user/info', {}, { staleTime: 60 * 60 * 1000 })

export const getMe = () => httpService.get<UserPersonalInfo>('/user/info')
// export const useGetUserPassportInfo = (
//   options: MutationOptions<PassportDto, BaseResponse<PassportResponse>>
// ) => useCreate<BaseResponse<PassportResponse>, PassportDto>('/admin/getPersonInfo', options)

// export const useChangeUserRole = (roleId: number, options: MutationOptions<void, void>) =>
//   useUpdate<void, void>(`/admin/currentRole/${roleId}`, options)

export const getUserPersonalInfo = (values: Pick<SignUpDto, 'pinfl' | 'serialAndNumber'>) =>
  httpService.post<BaseResponse<UserPersonalInfo>, Pick<SignUpDto, 'pinfl' | 'serialAndNumber'>>(
    '/user/personal-info',
    values
  )

export const useSaveUserPersonalInfo = (options: MutationOptions<UserPersonalInfo, BaseResponse>) =>
  useCreate<BaseResponse, UserPersonalInfo>('/user/identification', options)

// export const saveUserPersonalInfo = (data: UserPersonalInfo) =>
//   httpService.post<BaseResponse, UserPersonalInfo>('/user/identification', data)

export const saveUserStepState = (data: AdmissionStepState) =>
  httpService.post<BaseResponse, AdmissionStepState>('/user/step', data)
