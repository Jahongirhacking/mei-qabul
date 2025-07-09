import { TABLE_PAGINATION_CONFIG } from '@/admin/config/const'
import { Empty, Table, type TableProps } from 'antd'
import { AnyObject } from 'antd/es/_util/type'

export function BaseTable<T extends AnyObject = AnyObject>(props: TableProps<T>) {
  return (
    <Table
      scroll={{ x: true }}
      size="small"
      rowKey="id"
      pagination={TABLE_PAGINATION_CONFIG}
      locale={{
        emptyText: <Empty description="Ma'lumot mavjud emas" style={{ height: '150px' }} />
      }}
      rowSelection={{
        columnTitle: '№',
        columnWidth: '50px',
        renderCell: (_, __, index) => {
          return <span>{index + 1}</span>
        }
      }}
      {...props}
    />
  )
}
