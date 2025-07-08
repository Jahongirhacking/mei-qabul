import { useState } from 'react'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduTypesList,
  useSpecialtyListByEduTypeId
} from '@/admin/api/services/common.service'
import {
  useDownloadExcelExamsApplications,
  useGenerateContract,
  useGetApplications,
  useRejectContract
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import RadioGroupComponent from '@/admin/components/RadiGroupComponent/RadioGroupComponent'
import { NumberInput } from '@/admin/components/inputs/NumberInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useApplicationColumns } from '@/admin/hooks/useApplicationColumns'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePagination } from '@/admin/hooks/usePagination'
import { IExamsParams, IGetApplicationsResponse } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, EduTypeIdEnum } from '@/admin/types/enum'
import { getExamStatusColor, getExamStatusName, openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, Form, Space, TableColumnsType, Tooltip } from 'antd'
import { FormInstance } from 'antd/lib'
import { Check, CloudDownload, X } from 'lucide-react'

type FormValues = {
  score: number
  examComment: string
}

type P = {
  id: number
} & FormValues

export default function PlannedExams({ examStatus }: IExamsParams) {
  const { pagination, setPagination } = usePagination()
  const [specialityId, setSpecialityId] = useState<number>()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [languageId, setLanguageId] = useState<number>()
  const [degreeId, setDegreeId] = useState<number>()
  const { onCreate, isOpen, closeModal, form } = useModalCRUD<P>()
  const [rowId, setRowId] = useState<number>()
  const [approve, setApprove] = useState<boolean>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>(AdmissionTypeIdEnum.BAKALAVR)
  const { data, isFetching, refetch } = useGetApplications({
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

  const { data: specialtyList } = useSpecialtyListByEduTypeId(
    admissionTypeId == AdmissionTypeIdEnum.MAGISTR ? EduTypeIdEnum.MAGISTR : EduTypeIdEnum.BAKALAVR
  )

  const { create, isCreating } = useGenerateContract({
    onSuccess: (data) => {
      refetch()
      window.open(data.data, '_blank', 'noopener,noreferrer')
      closeModal()
    }
  })

  const { create: reject, isCreating: isRejecting } = useRejectContract({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
      closeModal()
    }
  })

  const handleApproveExam = (id: number) => {
    setApprove(true)
    setRowId(id)
    onCreate()
  }

  const handleRejectExam = (id: number) => {
    setApprove(false)
    setRowId(id)
    onCreate()
  }

  const plannedExamsColumns = [
    ...useApplicationColumns({ examStatus }),
    {
      title: 'Imtihon holati',
      dataIndex: 'examStatus',
      render: (status: string) => (
        <p className={getExamStatusColor(status)}>{getExamStatusName(status)}</p>
      )
    },
    {
      title: 'Amallar',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tooltip title="Tasdiqlash">
            <Button
              type="primary"
              onClick={() => handleApproveExam(record.id)}
              icon={<Check size={16} />}
            />
          </Tooltip>

          <Tooltip title="Rad etish">
            <Button
              type="primary"
              danger
              onClick={() => handleRejectExam(record.id)}
              icon={<X size={16} />}
            />
          </Tooltip>
        </Space>
      )
    }
  ] as TableColumnsType<IGetApplicationsResponse>

  const submit = (values: FormValues) => {
    const dto = { ...values, applicationId: rowId! }

    if (approve) create(dto)
    else reject(dto)
  }

  const { download, isDownload } = useDownloadExcelExamsApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Imtihoni belgilanganlar excel')
    }
  })

  return (
    <Container
      padding="p-0"
      title="Imtihoni belgilanganlar"
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
      <Form form={form}>
        <PaginationTable
          loading={isFetching}
          total={data?.page.totalElements}
          dataSource={data?.content}
          columns={plannedExamsColumns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Form>

      <CustomModal
        title={`${approve ? 'Tasdiqlash' : 'Rad etish'}`}
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
        loading={isCreating || isRejecting}
      >
        <Form form={form as FormInstance} layout="vertical" onFinish={submit}>
          <Form.Item
            label="Imtihonda to'plagan bali"
            name="score"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(new Error('Iltimos balni kiriting!'))
                  }
                  if (value > 189) {
                    return Promise.reject(new Error('Maksimal qiymat 189 bo‘lishi kerak!'))
                  }
                  if (value < 1) {
                    return Promise.reject(new Error('Minimal qiymat 1 bo‘lishi kerak!'))
                  }
                  return Promise.resolve()
                }
              }
            ]}
            validateTrigger="onChange"
          >
            <NumberInput />
          </Form.Item>
          <Form.Item name="examComment" label="Izoh">
            <TextInput placeholder="Izoh kiriting" />
          </Form.Item>
        </Form>
      </CustomModal>
    </Container>
  )
}
