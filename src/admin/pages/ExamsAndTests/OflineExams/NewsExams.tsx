import React, { useState } from 'react'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduTypesList,
  useSpecialtyListByEduTypeId
} from '@/admin/api/services/common.service'
import {
  useDownloadExcelExamsApplications,
  useGetApplications,
  usePlannedExam,
  useRejectApplications
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import RadioGroupComponent from '@/admin/components/RadiGroupComponent/RadioGroupComponent'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useApplicationColumns } from '@/admin/hooks/useApplicationColumns'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { IExamsParams, IGetApplicationsResponse } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, ApplicationStatusEnum, EduTypeIdEnum } from '@/admin/types/enum'
import { getExamStatusColor, getExamStatusName, openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, ConfigProvider, DatePicker, Form, Space } from 'antd'
import { FormInstance } from 'antd/lib'
import uzUZ from 'antd/locale/uz_UZ'
import dayjs from 'dayjs'
import { CloudDownload } from 'lucide-react'
import { toast } from 'sonner'

type FormValues = {
  dateAndTime: string
  comment: string
}

type P = {
  id: number
} & FormValues

export default function NewsExams({ examStatus }: IExamsParams) {
  const { pagination, setPagination } = usePagination()
  const [specialityId, setSpecialityId] = useState<number>()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [languageId, setLanguageId] = useState<number>()
  const [degreeId, setDegreeId] = useState<number>()
  const { isAdmin } = usePermission()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>(AdmissionTypeIdEnum.BAKALAVR)
  const confirm = useConfirm()
  const { data, isFetching, refetch } = useGetApplications({
    ...pagination,
    examStatus,
    admissionTypeId,
    specialityId,
    eduTypeId,
    languageId,
    degreeId
  })
  const { onCreate, isOpen, closeModal, form } = useModalCRUD<P>()
  const [ids, setIds] = useState<number[]>([])
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

  const { data: eduTypeList } = useGetEduTypesList()
  const { data: languageList } = useGetEduLanguagesList()
  const { data: deegreList } = useGetEduDegreesList()

  const { data: specialtyList } = useSpecialtyListByEduTypeId(
    admissionTypeId == AdmissionTypeIdEnum.MAGISTR ? EduTypeIdEnum.MAGISTR : EduTypeIdEnum.BAKALAVR
  )

  const { create, isCreating } = usePlannedExam({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const { download, isDownload } = useDownloadExcelExamsApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Yangi imtihonlar excel')
    }
  })

  const { create: rejectApplications, isCreating: isRejecting } = useRejectApplications({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const handleSetExams = () => {
    if (ids.length === 0) {
      toast.error('Iltimos avval kimlarga belgilashni jadvaldan tanlang')
    } else {
      onCreate()
    }
  }

  const submit = (values: FormValues) => {
    const date = dayjs(values.dateAndTime).format('DD-MM-YYYY')
    const time = dayjs(values.dateAndTime).format('HH:mm')
    const dto = { ids, examDate: date, examTime: time, comment: values.comment }
    create(dto)
  }

  const handleRejectApplications = () => {
    if (ids.length === 0) {
      toast.error('Iltimos avval kimlarni arizasini bekor qilishni jadvaldan tanlang')
    } else {
      handleReject()
    }
  }

  const handleReject = async () => {
    const isConfirmed = await confirm({
      title: 'Belgilangan arizalarni bekor qilishni tasdiqlaysizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed) rejectApplications(ids)
  }

  return (
    <Container
      padding="p-0"
      title="Yangilar"
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
          <Button type="primary" onClick={handleSetExams}>
            Imtihon belgilash
          </Button>
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
          {!isAdmin && (
            <Button type="primary" danger loading={isRejecting} onClick={handleRejectApplications}>
              Arizalarni bekor qilish
            </Button>
          )}
        </Space>
      }
    >
      <RadioGroupComponent setAdmissionTypeId={setAdmissionTypeId} />

      <PaginationTable<IGetApplicationsResponse>
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
          },
          getCheckboxProps: (record: IGetApplicationsResponse) => ({
            disabled:
              admissionTypeId === AdmissionTypeIdEnum.TRANSFER &&
              record.status !== ApplicationStatusEnum.APPROVED
          })
        }}
      />

      <CustomModal
        title="Imtihon malumotlari"
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
        loading={isCreating}
      >
        <Form form={form as FormInstance} layout="vertical" onFinish={submit}>
          <ConfigProvider locale={uzUZ}>
            <Form.Item name="dateAndTime" label="Sanasi va vaqti" rules={[{ required: true }]}>
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Sanasi va vaqtini tanlang"
                showTime
                format="DD-MM-YYYY HH:mm"
              />
            </Form.Item>
          </ConfigProvider>
          <Form.Item name="comment" label="Izoh" rules={[{ required: true }]}>
            <TextInput placeholder="Izoh kiriting" />
          </Form.Item>
        </Form>
      </CustomModal>
    </Container>
  )
}
