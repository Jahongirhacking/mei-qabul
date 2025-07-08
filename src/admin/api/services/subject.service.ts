import { MutationOptions } from '@/admin/api/query'
import { useCreate, useDelete, useGet, useUpdate } from '@/admin/api/services/crud.service'
import {
  BaseResponse,
  Pagination,
  PaginationOptions,
  QueryParam,
  WithId
} from '@/admin/types/IRequest'

export type ISubject = {
  id: number
  name: string
}

export interface ISubjectList {
  id: number
  name: string
  isActive: boolean
}

export type SubjectDto = Omit<ISubject, 'id'>

export type ISubjectOptions = {
  search?: string
} & PaginationOptions

export const useGetSubjects = (options: ISubjectOptions) =>
  useGet<Pagination<ISubjectList[]>, ISubjectOptions>('/subject', options)

export const useGetSubject = (id: QueryParam) => useGet<SubjectDto>(`/subject/${id}`)

export const useCreateSubject = (options: MutationOptions<SubjectDto, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, SubjectDto>('/subject', options)

export const useUpdateSubject = (
  options: MutationOptions<WithId<SubjectDto>, BaseResponse<void>>
) => useUpdate<BaseResponse<void>, SubjectDto>('/subject', options)

export const useDeleteSubject = (options: MutationOptions<string>) =>
  useDelete<BaseResponse, string>('/subject', options)
