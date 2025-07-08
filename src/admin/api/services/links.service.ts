import { MutationOptions } from '@/admin/api/query'
import { useCreate, useGet, useUpdate } from '@/admin/api/services/crud.service'
import { BaseResponse, PaginationOptions, QueryParam, WithId } from '@/admin/types/IRequest'

export type ILink = {
  id: number
  name: string
}

export interface ILinkList {
  id: number
  name: string
  link: string
  requestCount: number
  createdAt: string
}

export type LinkDto = Omit<ILink, 'id'>

export const useGetLinks = (options: PaginationOptions) =>
  useGet<ILinkList[], PaginationOptions>('/links', options)

export const useGetLink = (id: QueryParam) => useGet<LinkDto>(`/link-code/${id}`)

export const useCreateLink = (options: MutationOptions<LinkDto, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, LinkDto>('/generate-link', options)

export const useUpdateLink = (options: MutationOptions<WithId<LinkDto>, BaseResponse<void>>) =>
  useUpdate<BaseResponse<void>, LinkDto>('/link', options)

// export const useDeleteFund = (options: MutationOptions<string>) =>
//   useDelete<BaseResponse, string>('/international-funds', options)
