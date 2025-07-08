import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEduLevelsList, useGetEduTypesList } from '@/admin/api/services/common.service'
import {
  useGetContractPricesByUniversity,
  useSynchronizeContractPrices
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { ContractPrice, IGetContractPricesByUniversityResponse } from '@/admin/types/Contracts'
import { numberFormatter } from '@/admin/utils/cn'
import { successHandler } from '@/admin/utils/lib'
import { Button, Space, TableColumnsType } from 'antd'
import { RefreshCcw } from 'lucide-react'

export default function UzRuContractPricesPage({ tab }: { tab: string }) {
  const { pagination, setPagination } = usePagination()
  const { id } = useParams()
  const [eduTypeId, setEduTypeId] = useState<number>(11)
  const [eduLevelId, setEduLevelId] = useState<number>(11)
  const { data: eduTypes } = useGetEduTypesList()
  const { data: eduLevels } = useGetEduLevelsList()

  const { data, isFetching, refetch } = useGetContractPricesByUniversity({
    contractDetailId: Number(id),
    eduTypeId,
    eduLevelId,
    language: tab === '1' ? 'UZ_RU' : 'EN'
  })

  const { create: synchronize, isCreating: isSynchronize } = useSynchronizeContractPrices({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const columns: TableColumnsType<IGetContractPricesByUniversityResponse> = [
    {
      title: 'Mutaxassislik nomi',
      dataIndex: 'name'
    },
    {
      title: 'Mutaxassislik kodi',
      dataIndex: 'code'
    },
    {
      title: "Ta'lim shakli",
      align: 'center',
      children: [
        {
          title: 'Kunduzgi',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 11)
                .withoutScholarship
            )
        },
        {
          title: 'Kechki',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 12)
                .withoutScholarship
            )
        },
        {
          title: 'Sirtqi',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 13)
                .withoutScholarship
            )
        },
        {
          title: 'Maqsadli qabul',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 14)
                .withoutScholarship
            )
        },
        {
          title: 'Masofaviy',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 16)
                .withoutScholarship
            )
        },
        {
          title: 'Qo‘shma',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 17)
                .withoutScholarship
            )
        },
        {
          title: 'Ikkinchi oliy (sirtqi)',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 15)
                .withoutScholarship
            )
        },
        {
          title: 'Ikkinchi oliy (kunduzgi)',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 18)
                .withoutScholarship
            )
        },
        {
          title: 'Ikkinchi oliy (kechki)',
          render: (data) =>
            numberFormatter(
              data.contractPrices.find((item: ContractPrice) => item.degreeId === 19)
                .withoutScholarship
            )
        }
      ]
    }
  ]

  return (
    <Container
      title="O'zbek va Rustili shartnoma narxlari"
      extra={
        <Space>
          <SelectInput
            onChange={setEduTypeId}
            value={eduTypeId}
            allowClear={false}
            options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <SelectInput
            onChange={setEduLevelId}
            value={eduLevelId}
            allowClear={false}
            options={eduLevels?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Button
            icon={<RefreshCcw size={16} />}
            loading={isSynchronize}
            onClick={() => synchronize()}
            type="primary"
          >
            Synchronize
          </Button>
        </Space>
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
