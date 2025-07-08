import { useCallback } from 'react'
import { SetURLSearchParams, useSearchParams } from 'react-router-dom'

import { DEFAULT_PAGINATION } from '@/admin/config/const'
import { PaginationOptions } from '@/admin/types/IRequest'

type Response = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  pagination: PaginationOptions
  setPagination: (pagination: PaginationOptions) => void
}

export function usePagination(): Response {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = searchParams.get('page')
  const sizeParam = searchParams.get('size')

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGINATION.page
  const size = sizeParam ? Number(sizeParam) : DEFAULT_PAGINATION.size

  const setPagination = useCallback(
    (pagination: PaginationOptions) => {
      setSearchParams((params) => {
        params.set('page', String(pagination.page))
        params.set('size', String(pagination.size))
        return params
      })
    },
    [setSearchParams]
  )

  return {
    pagination: { page, size },
    setPagination,
    searchParams,
    setSearchParams
  }
}
