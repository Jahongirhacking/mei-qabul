import { useState } from 'react'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduTypesList,
  useSpecialtyListByEduTypeId
} from '@/admin/api/services/common.service'
import {
  useDownloadExcelExamsApplications,
  useGetApplications
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import RadioGroupComponent from '@/admin/components/RadiGroupComponent/RadioGroupComponent'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useApplicationColumns } from '@/admin/hooks/useApplicationColumns'
import { usePagination } from '@/admin/hooks/usePagination'
import { IExamsParams } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, EduTypeIdEnum } from '@/admin/types/enum'
import { getExamStatusColor, getExamStatusName, openLink } from '@/admin/utils/constants'
import { Button, Space } from 'antd'
import { CloudDownload } from 'lucide-react'

export default function PassedExams({ examStatus }: IExamsParams) {
  const { pagination, setPagination } = usePagination()
  const [specialityId, setSpecialityId] = useState<number>()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [languageId, setLanguageId] = useState<number>()
  const [degreeId, setDegreeId] = useState<number>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>(AdmissionTypeIdEnum.BAKALAVR)
  const { data, isFetching } = useGetApplications({
    ...pagination,
    examStatus,
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
    ...useApplicationColumns({ examStatus }),
    {
      title: 'Imtihon holati',
      dataIndex: 'examStatus',
      render: (status: string) => (
        <p className={getExamStatusColor(status)}>{getExamStatusName(status)}</p>
      )
    }
  ]
  const { data: specialtyList } = useSpecialtyListByEduTypeId(
    admissionTypeId == AdmissionTypeIdEnum.MAGISTR ? EduTypeIdEnum.MAGISTR : EduTypeIdEnum.BAKALAVR
  )

  const { download, isDownload } = useDownloadExcelExamsApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), "Imtihondan o'tganlar excel")
    }
  })

  return (
    <Container
      padding="p-0"
      title="Imtihondan o'tganlar"
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
                examStatus,
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
      />
    </Container>
  )
}
