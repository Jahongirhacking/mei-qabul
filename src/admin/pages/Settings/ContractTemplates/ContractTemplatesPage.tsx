import {
  useGetContractTemplates,
  useSynchronizeContractTemplates
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { IContract } from '@/admin/types/Contracts'
import { successHandler } from '@/admin/utils/lib'
import { Button, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { RefreshCcw } from 'lucide-react'

export default function ContractTemplatesPage() {
  const { pagination, setPagination } = usePagination()
  const { data, isFetching, refetch } = useGetContractTemplates({ ...pagination })
  const { create: synchronize, isCreating: isSynchronize } = useSynchronizeContractTemplates({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const columns: TableColumnsType<IContract> = [
    {
      title: 'Nomi',
      dataIndex: 'name'
    },
    {
      title: 'Havola',
      dataIndex: 'url',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      )
    },
    {
      title: 'Turi',
      dataIndex: 'type'
    },
    {
      title: "Ta'lim turi",
      dataIndex: 'eduType',
      render: (eduType) => eduType?.name
    },
    {
      title: "Ta'lim shakli",
      dataIndex: 'degree',
      render: (degree) => degree?.name
    },
    {
      title: 'Tili',
      dataIndex: 'language',
      render: (language) => language?.name
    },
    {
      title: 'Yaratilgan sanasi',
      dataIndex: 'createdDate',
      render: (createdDate) => dayjs(createdDate).format('DD-MM-YYYY')
    },
    {
      title: 'Holati',
      dataIndex: 'isActive',
      render: (isActive) =>
        isActive ? (
          <span style={{ color: 'green' }}>Faol</span>
        ) : (
          <span style={{ color: 'red' }}>No Faol</span>
        )
    }
  ]

  return (
    <Container
      title="Shartnoma shablonlari"
      extra={
        <Button
          icon={<RefreshCcw size={16} />}
          loading={isSynchronize}
          onClick={() => synchronize()}
          type="primary"
        >
          Synchronize
        </Button>
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
