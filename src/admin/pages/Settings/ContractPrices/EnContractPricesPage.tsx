import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEduLevelsList, useGetEduTypesList } from '@/admin/api/services/common.service'
import {
  useGetContractPricesByUniversity,
  useUpdateEnContractPrices
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { IGetContractPricesByUniversityResponse } from '@/admin/types/Contracts'
import { getDegreeName, numberFormatter } from '@/admin/utils/cn'
import { successHandler } from '@/admin/utils/lib'
import { Button, Form, InputNumber, Space } from 'antd'

export default function EnContractPricesPage({ tab }: { tab: string }) {
  const { pagination, setPagination } = usePagination()
  const { id } = useParams()
  const [eduTypeId, setEduTypeId] = useState(11)
  const [eduLevelId, setEduLevelId] = useState(11)
  const { data: eduTypes } = useGetEduTypesList()
  const { data: eduLevels } = useGetEduLevelsList()
  const [form] = Form.useForm()

  const { data, isFetching, refetch } = useGetContractPricesByUniversity({
    contractDetailId: Number(id),
    eduTypeId,
    eduLevelId,
    language: tab === '1' ? 'UZ_RU' : 'EN'
  })

  const { create: updatePrices, isCreating: isUpdate } = useUpdateEnContractPrices({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const specialities = data?.map((item) => ({
        specialityId: item.id,
        degrees: item.contractPrices
          .filter((price) => values[item.id]?.[price.degreeId] !== undefined)
          .map((price) => ({
            degreeId: price.degreeId,
            contractPrice: values[item.id][price.degreeId] as number
          }))
      }))

      updatePrices({
        contractDetailId: Number(id),
        eduTypeId,
        eduLevelId,
        specialities
      })
    })
  }

  const columns = [
    { title: 'Mutaxassislik nomi', dataIndex: 'name' },
    { title: 'Mutaxassislik kodi', dataIndex: 'code' },
    {
      title: "Ta'lim shakli",
      children: [11, 12, 13, 14, 15, 16, 17, 18, 19].map((degreeId) => ({
        title: `${getDegreeName(degreeId)}`,
        render: (data: IGetContractPricesByUniversityResponse) => {
          const contract = data.contractPrices.find((item) => item.degreeId === degreeId)
          return contract ? (
            <Form.Item
              name={[data.id, degreeId]}
              noStyle
              initialValue={contract.withoutScholarship || 0}
            >
              <InputNumber formatter={numberFormatter} min={0} style={{ width: '100%' }} />
            </Form.Item>
          ) : null
        }
      }))
    }
  ]

  return (
    <Container
      title="Ingliz tili shartnoma narxlari"
      extra={
        <Space>
          <SelectInput
            onChange={setEduTypeId}
            value={eduTypeId}
            options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <SelectInput
            onChange={setEduLevelId}
            value={eduLevelId}
            options={eduLevels?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Button loading={isUpdate} onClick={handleUpdate} type="primary">
            Saqlash
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <PaginationTable
          loading={isFetching}
          total={data?.length}
          dataSource={data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Form>
    </Container>
  )
}
