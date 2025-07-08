import React, { useState } from 'react'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduTypesList,
  useSpecialtyListByEduTypeId
} from '@/admin/api/services/common.service'
import {
  useDownloadExcelCanceledApplications,
  useGetRejectedApplications
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import RadioGroupComponent from '@/admin/components/RadiGroupComponent/RadioGroupComponent'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useApplicationColumns } from '@/admin/hooks/useApplicationColumns'
import { usePagination } from '@/admin/hooks/usePagination'
import { AdmissionTypeIdEnum, EduTypeIdEnum } from '@/admin/types/enum'
import { getApplicationStatusColor, getApplicationStatusName, openLink } from '@/admin/utils/constants'
import { Button, Space } from 'antd'
import { CloudDownload } from 'lucide-react'

export default function RejectedApplications() {
  const { pagination, setPagination } = usePagination()
  const [specialityId, setSpecialityId] = useState<number>()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [languageId, setLanguageId] = useState<number>()
  const [degreeId, setDegreeId] = useState<number>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>(AdmissionTypeIdEnum.BAKALAVR)
  const [ids, setIds] = useState<number[]>([])

  const { data, isFetching } = useGetRejectedApplications({
    ...pagination,
    admissionTypeId,
    specialityId,
    eduTypeId,
    languageId,
    degreeId
  })

  const { data: eduTypeList } = useGetEduTypesList()
  const { data: languageList } = useGetEduLanguagesList()
  const { data: deegreList } = useGetEduDegreesList()

  const columns = [
    ...useApplicationColumns({ examStatus: 'REJECTED' }),
    {
      title: 'Ariza holati',
      dataIndex: 'status',
      render: (status: string) => (
        <p className={getApplicationStatusColor(status)}>{getApplicationStatusName(status)}</p>
      )
    }
  ]

  const { data: specialtyList } = useSpecialtyListByEduTypeId(
    admissionTypeId == AdmissionTypeIdEnum.MAGISTR ? EduTypeIdEnum.MAGISTR : EduTypeIdEnum.BAKALAVR
  )

  const { download, isDownload } = useDownloadExcelCanceledApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Bekor qilingan arizalar excel')
    }
  })

  return (
    <Container
      padding="p-0"
      title="Bekor qilingan arizalar"
      extra={
        <Space>
          <SelectInput
            style={{ width: '250px' }}
            onChange={setSpecialityId}
            placeholder="Mutaxassislik tanlang"
            value={specialityId}
            options={specialtyList?.map((item) => ({ value: item.id, label: item.specialityName }))}
          />

          <SelectInput
            style={{ width: '175px' }}
            onChange={setEduTypeId}
            placeholder="Ta'lim turini tanlang"
            value={eduTypeId}
            options={eduTypeList?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <SelectInput
            style={{ width: '125px' }}
            onChange={setLanguageId}
            placeholder="Tilni tanlang"
            value={languageId}
            options={languageList?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <SelectInput
            style={{ width: '180px' }}
            onChange={setDegreeId}
            placeholder="Ta'lim shakli tanlang"
            value={degreeId}
            options={deegreList?.map((item) => ({ value: item.id, label: item.name }))}
          />

          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                admissionTypeId,
                specialityId,
                eduTypeId,
                languageId,
                degreeId
              })
            }
          >
            Excel yuklash
          </Button>
        </Space>
      }
    >
      <RadioGroupComponent setAdmissionTypeId={setAdmissionTypeId} />

      <PaginationTable
        loading={isFetching}
        total={data?.page.totalElements}
        dataSource={data?.content}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        rowSelection={{
          selectedRowKeys: ids,
          onChange: (serviceIds: React.Key[]) => {
            setIds(serviceIds as number[])
          }
        }}
      />
    </Container>
  )
}
