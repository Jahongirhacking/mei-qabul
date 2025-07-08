import { useState } from 'react'

import { DEFAULT_PAGINATION } from '@/admin/config/const'
import { PaginationOptions } from '@/admin/types/IRequest'
import type { AnyObject } from 'antd/es/_util/type'

export function useFilters(initialFilterValues = {}) {
  const [filters, setFilters] = useState<AnyObject>(initialFilterValues)
  const [pagination, setPagination] = useState<PaginationOptions>(DEFAULT_PAGINATION)

  const setSearch = (search: string) => {
    setPagination(DEFAULT_PAGINATION)
    setFilters((previousFilters) => ({ ...previousFilters, search }))
  }

  const setStatus = (status: string) => {
    setPagination(DEFAULT_PAGINATION)
    setFilters((previousFilters) => ({ ...previousFilters, status }))
  }

  const onFilter = (values: object) => {
    setPagination(DEFAULT_PAGINATION)
    setFilters((previousFilters) => ({ ...previousFilters, ...values }))
  }

  const onClear = () => {
    setPagination(DEFAULT_PAGINATION)
    setFilters({})
  }

  return { filters, onFilter, onClear, setSearch, setStatus, pagination, setPagination }
}
