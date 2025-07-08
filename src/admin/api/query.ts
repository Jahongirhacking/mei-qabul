import { BaseError, BaseResponse } from '@/admin/types/IRequest'
import {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useReactQuery,
  useMutation as useReactQueryMutation
} from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

export function useQuery<
  TQueryFnData = AxiosResponse<unknown, unknown>['data'],
  TError = BaseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useReactQuery<TQueryFnData, TError, TData, TQueryKey>({
    retry: false, // Ensuring no retries by default.
    refetchOnWindowFocus: false, // Prevents refetching on window focus.
    ...options
  }) as UseQueryResult<TData, TError>
}

export type QueryOptions<
  TQueryFnData = AxiosResponse<unknown, unknown>['data'],
  TError = BaseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>

export type MutationOptions<
  TVariables = void,
  TData = BaseResponse,
  TError = BaseError
> = UseMutationOptions<TData, AxiosError<TError>, TVariables>

export function useMutation<TVariables = void, TData = BaseResponse, TError = BaseError>(
  options: MutationOptions<TVariables, TData, TError>
): UseMutationResult<TData, AxiosError<TError>, TVariables> {
  return useReactQueryMutation<TData, AxiosError<TError>, TVariables>(options)
}
