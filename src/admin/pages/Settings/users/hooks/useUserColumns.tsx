import { Link } from 'react-router-dom'

import paths from '@/admin/app/router/paths'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { User } from '@/admin/types/User'
import type { ColumnsType } from 'antd/es/table'

export const useUserColumns = (): ColumnsType<User> => {
  return [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'JSHSHIR',
      dataIndex: 'pinfl'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true
    },
    {
      title: 'Telefon raqami',
      dataIndex: 'cell_phone'
    },
    {
      title: 'Tashkilot',
      dataIndex: 'institution',
      ellipsis: true
    },
    {
      title: 'Amallar',
      dataIndex: 'id',
      width: 70,
      align: 'center',
      render: (id: number) => (
        <>
          <Link to={`${paths.users}/edit/${id}`}>
            <EditIconButton />
          </Link>
        </>
      )
    }
  ]
}
