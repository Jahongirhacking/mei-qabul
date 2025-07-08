import { useState } from 'react'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduTypesList
} from '@/admin/api/services/common.service'
import {
  QuotaByEduType,
  QuotaDto,
  useCreateQuota,
  useGetQuotasByEduTypeId
} from '@/admin/api/services/quotas.service'
import { Specialty, useGetSpecialtiesList } from '@/admin/api/services/specialty.service'
import { Container } from '@/admin/components/Container'
import { Loader } from '@/admin/components/Loader'
import { NumberInput } from '@/admin/components/inputs/NumberInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { BaseTable } from '@/admin/components/table/BaseTable'
import { EduTypeIdEnum } from '@/admin/types/enum'
import { successHandler } from '@/admin/utils/lib'
import { Button, Form, Space, TableColumnsType } from 'antd'
import { useForm } from 'antd/es/form/Form'

type FormValues = Record<string, number>

const generateInitialValues = (quotas: QuotaByEduType[]): FormValues => {
  const values: FormValues = {}

  quotas.forEach(({ specialityId, degreeId, languageId, quota }) => {
    values[`${specialityId}-${degreeId}-${languageId}`] = quota
  })

  return values
}

export default function QuotasPage() {
  const { data: eduTypes } = useGetEduTypesList()
  const { data: specialties } = useGetSpecialtiesList()
  const { data: eduDegrees = [], isFetching: isEduDegreesFetching } = useGetEduDegreesList()
  const { data: eduLanguages = [], isFetching: isEduLanguagesFetching } = useGetEduLanguagesList()
  const [form] = useForm()
  const [eduTypeId, setEduTypeId] = useState<number>(EduTypeIdEnum.BAKALAVR)

  const {
    data: quotas = [],
    isFetching: isQuotasFetching,
    refetch
  } = useGetQuotasByEduTypeId(eduTypeId)

  const { create: createQuota, isCreating } = useCreateQuota({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  if (isEduDegreesFetching || isQuotasFetching || isEduLanguagesFetching) {
    return <Loader />
  }

  const columns: TableColumnsType<Specialty> = [
    {
      title: 'Mutaxassislik',
      dataIndex: 'specialityName',
      width: 200
    },
    {
      title: 'Kodi',
      dataIndex: 'code'
    },
    ...eduDegrees.map((degree) => {
      return {
        title: degree.name,
        children: eduLanguages.map((lang) => {
          return {
            title: lang.name,
            dataIndex: 'id',
            width: 100,
            render: (specialtyId: number) => (
              <Form.Item name={[`${specialtyId}-${degree.id}-${lang.id}`]} noStyle>
                <NumberInput />
              </Form.Item>
            )
          }
        })
      }
    })
  ]

  const submit = (values: FormValues) => {
    const dto: QuotaDto[] = []

    for (const [key, count] of Object.entries(values)) {
      const [specialtyId, degreeId, langId] = key.split('-')
      dto.push({
        specialityId: Number(specialtyId),
        degreeId: Number(degreeId),
        languageId: Number(langId),
        quota: Number(count)
      })
    }

    createQuota(dto)
  }

  return (
    <Container
      title="Kvotalar"
      extra={
        <Space>
          <SelectInput
            onChange={setEduTypeId}
            placeholder="Ta'lim turi"
            value={eduTypeId}
            allowClear={false}
            options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
          />

          <Button loading={isCreating} type="primary" onClick={form.submit}>
            Saqlash
          </Button>
        </Space>
      }
    >
      <Form initialValues={generateInitialValues(quotas)} form={form} onFinish={submit}>
        <BaseTable
          bordered
          scroll={{ x: 2000 }}
          loading={isEduDegreesFetching || isQuotasFetching || isCreating}
          dataSource={specialties}
          columns={columns}
          pagination={false}
        />
      </Form>
    </Container>
  )
}
