import { Link } from 'react-router-dom'

import { Admin, useGetUsers } from '@/admin/api/services/user.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { AddButton } from '@/admin/components/buttons/AddButton'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { TableColumnsType } from 'antd'

export default function UsersPage() {
  const { pagination, setPagination } = usePagination()

  const { data, isFetching } = useGetUsers({ ...pagination })

  const columns: TableColumnsType<Admin> = [
    {
      title: 'F.I.O.',
      render: (_, record) => (
        <>
          {record.lastName} {record.firstName} {record.fatherName}
        </>
      )
    },
    {
      title: 'PINFL',
      dataIndex: 'pinfl'
    },
    {
      title: 'Rollari',
      render: (_, record) => <>{record.roles.map((item) => item.name + ',')}</>
    },
    {
      title: 'OTM',
      dataIndex: 'university',
      render: (university, { organization }) => organization || university
    },
    {
      title: 'Amallar',
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <Link to={`${paths.users}/edit/${id}`}>
            <EditIconButton />
          </Link>
        )
      }
    }
  ]

  return (
    <Container
      title="Foydalanuvchilar"
      extra={
        <>
          <Link to={`${paths.users}/create`}>
            <AddButton>Foydalanuvchi</AddButton>
          </Link>
        </>
      }
    >
      <PaginationTable
        loading={isFetching}
        total={data?.page.totalElements}
        dataSource={data?.content}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
      />
    </Container>
  )
}
