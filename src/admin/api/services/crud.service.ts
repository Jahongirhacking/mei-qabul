import { httpService } from '@/admin/api/http'
import { MutationOptions, QueryOptions, useMutation, useQuery } from '@/admin/api/query'
import { WithId } from '@/admin/types/IRequest'
import { errorHandler } from '@/admin/utils/lib'
import { AxiosResponse } from 'axios'

export type QueryGetOption<R> = Partial<QueryOptions<R>>

export function useGet<R, Q extends object = object>(
  path: string,
  params: Q = {} as Q,
  options?: QueryGetOption<AxiosResponse<R, R>['data']>
) {
  return useQuery({
    queryKey: [path, params],
    queryFn: () => httpService.get<R>(path, { params }),
    ...options
  })
}

export function useCreate<R, B>(path: string, options: MutationOptions<B, R>) {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: B) => httpService.post<R, B>(path, data),
    onError: errorHandler,
    ...options
  })

  return {
    create: mutate,
    isCreating: isPending
  }
}

export function useUpdate<R, B>(path: string, options: MutationOptions<WithId<B>, R>) {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: WithId<B>) => httpService.put<R, B>(`${path}/${id}`, data),
    onError: errorHandler,
    ...options
  })

  return {
    update: mutate,
    isUpdating: isPending
  }
}

export function useUpdateWithoutId<R, B>(path: string, options: MutationOptions<B, R>) {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: B) => httpService.put<R, B>(path, data),
    onError: errorHandler,
    ...options
  })

  return {
    update: mutate,
    isUpdating: isPending
  }
}

export function useDelete<R, B>(path: string, options: MutationOptions<B, R>) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: B) => httpService.delete<R>(`${path}/${id}`),
    onError: errorHandler,
    ...options
  })

  return {
    remove: mutate,
    isRemoving: isPending
  }
}

export function useDownloadExcel<R, B>(path: string, options: MutationOptions<B, R>) {
  const { mutate, isPending } = useMutation({
    mutationFn: (params: B) => httpService.get<R>(`${path}`, { params, responseType: 'blob' }),
    onError: errorHandler,
    ...options
  })

  return {
    download: mutate,
    isDownload: isPending
  }
}
