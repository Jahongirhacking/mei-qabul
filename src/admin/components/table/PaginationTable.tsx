import { BaseTable } from '@/admin/components/table/BaseTable';
import { TABLE_PAGINATION_CONFIG } from '@/admin/config/const';
import { PaginationOptions } from '@/admin/types/IRequest';
import type { TablePaginationConfig } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type { TableRowSelection } from 'antd/es/table/interface';
// import the correct type or define it if missing
// import type { BaseTableProps } from '@/admin/components/table/BaseTable'
type BaseTableProps<T extends AnyObject = AnyObject> = React.ComponentProps<typeof BaseTable<T>>;

interface PaginationTableProps<T extends AnyObject = AnyObject>
  extends Omit<BaseTableProps<T>, 'pagination'> {
  pagination: PaginationOptions
  total?: number
  setPagination: (pagination: PaginationOptions) => void
}

export function PaginationTable<T extends AnyObject = AnyObject>({
  pagination,
  total,
  setPagination,
  ...rest
}: PaginationTableProps<T>) {
  const rowSelection: TableRowSelection<T> = {
    columnTitle: '№',
    renderCell: (_, __, index) => {
      return <span>{index + 1 + (pagination.page - 1) * pagination.size}</span>
    }
  }

  const tablePagination: TablePaginationConfig = {
    ...TABLE_PAGINATION_CONFIG,
    total,
    pageSize: pagination.size,
    current: pagination.page,
    onChange: (page: number, size: number) => {
      setPagination({ page, size })
    },
    style: { marginBottom: 0 }
  }

  return <BaseTable rowSelection={rowSelection} pagination={tablePagination} {...rest} />
}
