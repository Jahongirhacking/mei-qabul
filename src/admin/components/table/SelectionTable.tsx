import { Dispatch, SetStateAction, useMemo } from 'react'

import { BaseTable, BaseTableProps } from '@/admin/components/table/BaseTable'
import { TABLE_PAGINATION_CONFIG } from '@/admin/config/const'
import { PaginationOptions } from '@/admin/types/IRequest'
import type { TablePaginationConfig, TableProps } from 'antd'
import type { AnyObject } from 'antd/es/_util/type'

export interface SelectionTableProps<T extends AnyObject = AnyObject>
  extends Omit<BaseTableProps<T>, 'pagination'> {
  pagination: PaginationOptions
  total?: number
  setPagination: Dispatch<SetStateAction<PaginationOptions>>
  onRowSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
}

export function SelectionTable<T extends AnyObject = AnyObject>({
  pagination,
  total,
  setPagination,
  onRowSelectionChange,
  ...rest
}: SelectionTableProps<T>) {
  const rowSelection: TableProps<T>['rowSelection'] = useMemo(() => {
    return {
      onChange: onRowSelectionChange
    }
  }, [])

  const tablePagination: TablePaginationConfig = {
    ...TABLE_PAGINATION_CONFIG,
    total,
    pageSize: pagination.size,
    current: pagination.page,
    onChange: (page: number, size: number) => {
      setPagination({ page, size })
    }
  }

  return <BaseTable rowSelection={rowSelection} pagination={tablePagination} {...rest} />
}
