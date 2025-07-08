import { useState } from 'react'

import { useGetEduTypesList } from '@/admin/api/services/common.service'
import {
  EduPeriod,
  IGetEducationPeriodResponse,
  useGetEducationPeriods,
  useSynchronizeEducationPeriod
} from '@/admin/api/services/specialty.service'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { successHandler } from '@/admin/utils/lib'
import { Button, Space, TableColumnsType } from 'antd'
import { RefreshCcw } from 'lucide-react'

export default function EducationPeriodPage() {
  const { pagination, setPagination } = usePagination()
  const { data: eduTypes } = useGetEduTypesList()
  const [eduTypeId, setEduTypeId] = useState<number>(11)
  const { data, isFetching, refetch } = useGetEducationPeriods({ eduTypeId })
  const { create: synchronize, isCreating: isSynchronize } = useSynchronizeEducationPeriod({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const columns: TableColumnsType<IGetEducationPeriodResponse> = [
    {
      title: 'Mutaxassislik nomi',
      dataIndex: 'speciality'
    },
    {
      title: 'Mutaxassislik kodi',
      dataIndex: 'specialityCode'
    },
    {
      title: "Ta'lim shakli",
      align: 'center',
      children: [
        {
          title: 'Kunduzgi',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 11).eduPeriod
        },
        {
          title: 'Kechki',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 12).eduPeriod
        },
        {
          title: 'Sirtqi',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 13).eduPeriod
        },
        {
          title: 'Maqsadli qabul',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 14).eduPeriod
        },
        {
          title: 'Masofaviy',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 16).eduPeriod
        },
        {
          title: 'Qo‘shma',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 17).eduPeriod
        },
        {
          title: 'Ikkinchi oliy (sirtqi)',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 15).eduPeriod
        },
        {
          title: 'Ikkinchi oliy (kunduzgi)',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 18).eduPeriod
        },
        {
          title: 'Ikkinchi oliy (kechki)',
          render: (data) =>
            data.eduPeriods.find((item: EduPeriod) => item.degreeId === 19).eduPeriod
        }
      ]
    }
  ]

  return (
    <Container
      title="O'qish davomiyliglari"
      extra={
        <Space>
          <SelectInput
            onChange={setEduTypeId}
            value={eduTypeId}
            allowClear={false}
            options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
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
