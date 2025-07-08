import { MutationOptions, useMutation } from '@/admin/api/query'
import { useCreate, useGet, useUpdate } from '@/admin/api/services/crud.service'
import { Role } from '@/admin/types/Classificatory'
import {
  BaseResponse,
  Pagination,
  PaginationOptions,
  QueryParam,
  WithId
} from '@/admin/types/IRequest'
import { PassportResponse } from '@/admin/types/User'
import { errorHandler } from '@/admin/utils/lib'

import { httpService } from '../http'

export type Admin = {
  id: number
  phoneNumber: string
  pinfl: string
  givenDate: string
  serialAndNumber: string
  fullName: string
  firstName: string
  lastName: string
  fatherName: string
  birthDate: string
  currentRole: string
  isActive: boolean
  universityId?: number
  university: string
  organizationId?: number
  organization: string
  photoUrl: string
  roleIds: number[]
  role: string
  region: string
  district: string
  address: string
  roles: Role[]
}

export type AdminQuery = {
  search?: string
  isActive?: boolean
  roleId?: string
  organizationId?: string
  universityId?: string
} & PaginationOptions

export type AdminDto = {
  pinfl: string
  phoneNumber: string
  givenDate: string
  serialAndNumber: string
  firstName: string
  lastName: string
  fatherName: string
  photo: string
  isActive: boolean
  universityId?: number
  organizationId?: number
  roleIds: number[]
  birthDate: string
}

export type PassportDto = {
  pinfl: string
  serialAndNumber: string
}

export const useGetUsers = (options: AdminQuery) =>
  useGet<Pagination<Admin[]>, AdminQuery>('/admin', options)

export const useGetUser = (id: QueryParam) => useGet<Admin>(`/admin/${id}`)

export const useCreateUser = (options: MutationOptions<AdminDto, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, AdminDto>('/admin', options)

export const useUpdateUser = (options: MutationOptions<WithId<AdminDto>, void>) =>
  useUpdate<void, AdminDto>('/admin', options)

export const useGetUserPassportInfo = (
  options: MutationOptions<PassportDto, BaseResponse<PassportResponse>>
) => useCreate<BaseResponse<PassportResponse>, PassportDto>('/user/personal-info', options)

export const changeUserRole = (roleId: number) => httpService.put(`/admin/change-role/${roleId}`)
export const changeUniversity = (universityId: number) =>
  httpService.put(`/admin/change-university/${universityId}`)

type UpdateUserPhoneNumber = {
  phoneNumber: string
  userId: number
}

export const useUpdateUserPhoneNumber = (
  options: MutationOptions<UpdateUserPhoneNumber, BaseResponse>
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ phoneNumber, userId }) =>
      httpService.put(`/user/${userId}/phone-number`, { phoneNumber }),
    onError: errorHandler,
    ...options
  })

  return {
    update: mutate,
    isUpdating: isPending
  }
}
