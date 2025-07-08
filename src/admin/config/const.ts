import { PaginationOptions } from '@/types/IRequest'
import type { TablePaginationConfig } from 'antd'

export const DEFAULT_PAGINATION: PaginationOptions = {
  page: 1,
  size: 20
}

export const TABLE_PAGINATION_CONFIG: TablePaginationConfig = {
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100, 150, 200],
  size: 'small',
  defaultPageSize: DEFAULT_PAGINATION.size,
  showTotal: (total: number) => `Jami: ${total}`,
  style: { marginBottom: 0 }
}

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024 // 5MB

// export const DATE_FORMAT = 'DD.MM.YYYY';
// export const TIME_FORMAT = 'HH:mm';
