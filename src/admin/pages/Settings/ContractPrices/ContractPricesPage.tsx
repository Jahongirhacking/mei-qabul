import { Link } from 'react-router-dom'

import {
  useGetContractPrices,
  useSynchronizeContractPrices
} from '@/admin/api/services/contracts.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { IGetContractPricesResponse } from '@/admin/types/Contracts'
import { successHandler } from '@/admin/utils/lib'
import { Button, Flex, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { Eye, RefreshCcw } from 'lucide-react'

export default function ContractPricesPage() {
  const { pagination, setPagination } = usePagination()
  const { data, isFetching, refetch } = useGetContractPrices()
  const { create: synchronize, isCreating: isSynchronize } = useSynchronizeContractPrices({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const columns: TableColumnsType<IGetContractPricesResponse> = [
    {
      title: 'Shartnoma raqami',
      dataIndex: 'documentNumber'
    },
    {
      title: 'Yaratilgan sanasi',
      dataIndex: 'documentDate',
      render: (documentDate) => dayjs(documentDate).format('DD-MM-YYYY')
    },
    {
      title: 'Asos',
      dataIndex: 'basis'
    },
    {
      title: "O'quv yili",
      dataIndex: 'academicYear',
      render: (academicYear) => academicYear?.name
    },
    {
      title: 'Amallar',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      render: (id) => (
        <Flex align="center" justify="center" className="w-full">
          <Link to={`${paths.contractPrices}/${id}`}>
            <Eye size={18} />
          </Link>
        </Flex>
      )
    }
  ]

  return (
    <Container
      title="O'quv yillari"
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
        total={data?.length}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
      />
    </Container>
  )
}
