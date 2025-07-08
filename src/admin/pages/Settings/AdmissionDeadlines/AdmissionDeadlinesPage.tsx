import { useEffect, useState } from 'react'

import { useCreateAdmissionDeadlines, useGetEduTypesList } from '@/admin/api/services/common.service'
import { Specialty, useGetSpecialties } from '@/admin/api/services/specialty.service'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { ICreateAdmissionDeadlinesDto } from '@/admin/types/Classificatory'
import { successHandler } from '@/admin/utils/lib'
import { Button, DatePicker, Form, Space, TableColumnsType } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'

type AdmissionInfo = {
  admissionStartDate?: string
  admissionEndDate?: string
}

type FormValues = Record<string, AdmissionInfo>

export default function AdmissionDeadlinesPage() {
  const { pagination, setPagination } = usePagination()
  const { data: eduTypes } = useGetEduTypesList()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [form] = useForm()
  const {
    data: specialities,
    isFetching,
    refetch
  } = useGetSpecialties({ ...pagination, eduTypeId })

  const { create, isCreating } = useCreateAdmissionDeadlines({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const columns: TableColumnsType<Specialty> = [
    {
      title: 'Mutaxassislik nomi',
      dataIndex: 'specialityName'
    },
    {
      title: 'Qabul boshlanish sanasi',
      render: (_, record) => (
        <Form.Item noStyle name={[record.id, 'admissionStartDate']}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      )
    },
    {
      title: 'Qabul tugash sanasi',
      render: (_, record) => (
        <Form.Item noStyle name={[record.id, 'admissionEndDate']}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      )
    }
  ]

  const submit = (values: FormValues) => {
    const resultArray = Object.entries(values)
      .filter(([_, value]) => value.admissionStartDate || value.admissionEndDate)
      .map(([key, value]) => ({
        id: Number(key),
        admissionStartDate: value.admissionStartDate
          ? dayjs(value.admissionStartDate).format('YYYY-MM-DD')
          : undefined,
        admissionEndDate: value.admissionEndDate
          ? dayjs(value.admissionEndDate).format('YYYY-MM-DD')
          : undefined
      })) as ICreateAdmissionDeadlinesDto[]
    create(resultArray)
  }

  useEffect(() => {
    const initialValues = specialities?.content?.reduce((acc: FormValues, item) => {
      acc[item.id] =
        item.admissionStartDate || item.admissionEndDate
          ? {
            admissionStartDate: item.admissionStartDate
              ? dayjs(item.admissionStartDate)
              : undefined,
            admissionEndDate: item.admissionEndDate ? dayjs(item.admissionEndDate) : undefined
          }
          : ({} as object)
      return acc
    }, {})
    form.setFieldsValue(initialValues)
  }, [specialities])

  return (
    <Container
      title="Qabul muddatlari"
      extra={
        <Space>
          <SelectInput
            onChange={setEduTypeId}
            placeholder="Ta'lim turi"
            value={eduTypeId}
            allowClear={false}
            options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Button loading={isCreating} type="primary" onClick={() => form.submit()}>
            Saqlash
          </Button>
        </Space>
      }
    >
      <Form form={form} onFinish={submit}>
        <PaginationTable
          loading={isFetching}
          total={specialities?.page.totalElements}
          dataSource={specialities?.content}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Form>
    </Container>
  )
}
