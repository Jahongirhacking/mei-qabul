import { useEffect } from 'react'

import {
  useGetDistrictsList,
  useGetRegionsList,
  useGetUniversityInfo,
  useUpdateUniversiy
} from '@/admin/api/services/common.service'
import { Container } from '@/admin/components/Container'
import { UploadField } from '@/admin/components/UploadField'
import SaveButton from '@/admin/components/buttons/SaveButton'
import { PhoneFormItem } from '@/admin/components/formItems/PhoneFormItem'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { IUniversityFormValues } from '@/admin/types/Classificatory'
import { generateFileList } from '@/admin/utils/generators'
import { successHandler } from '@/admin/utils/lib'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'

export default function AboutOtmPage() {
  const [form] = useForm()

  const { data, refetch } = useGetUniversityInfo()
  const { data: regions } = useGetRegionsList()
  const { data: districts } = useGetDistrictsList()

  const { update, isUpdating } = useUpdateUniversiy({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const onSubmit = (values: IUniversityFormValues) => {
    update({
      data: { ...data?.data, ...values, logo: values.logo ? values.logo[0]?.response.url : null },
      id: data?.data.id
    })
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data.data,
        logo: data.data.logo && generateFileList([data.data.logo])
      })
    }
  }, [data])

  return (
    <Form onFinish={onSubmit} form={form} layout="vertical">
      <Container
        title="Universitet ma'lumotlari"
        extra={<SaveButton loading={isUpdating} htmlType="submit" />}
      >
        <div className="grid grid-cols-3 gap-x-4">
          <Form.Item name="name" label="Universitet nomi">
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              readOnly
              placeholder="Universitet nomi"
            />
          </Form.Item>

          <Form.Item name="nameRu" label="Universitet nomi (RU)">
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} placeholder="Universitet nomi (RU)" />
          </Form.Item>

          <Form.Item name="nameEng" label="Universitet nomi (ENG)">
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} placeholder="Universitet nomi (ENG)" />
          </Form.Item>

          <Form.Item name="tin" label="Inn">
            <TextInput placeholder="Inn" />
          </Form.Item>

          <Form.Item name="regionId" label="Viloyat">
            <SelectInput
              placeholder="Viloyat"
              options={regions?.map((item) => ({ value: item.id, label: item.name }))}
            />
          </Form.Item>

          <Form.Item name="districtId" label="Tuman">
            <SelectInput
              placeholder="Tuman"
              options={districts?.map((item) => ({ value: item.id, label: item.name }))}
            />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item name="address" label="Manzili">
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} placeholder="Manzili" />
          </Form.Item>

          <Form.Item name="location" label="Kartadagi manzil havolasi">
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder="Kartadagi manzil havolasi"
            />
          </Form.Item>

          <Form.Item name="rectorName" label="Rektor nomi">
            <TextInput />
          </Form.Item>

          <PhoneFormItem label="Telefon raqami" name="phoneNumber" />

          <UploadField
            key={data?.data.logo}
            refetch={refetch}
            logo={data?.data.logo}
            required={false}
            multiple={false}
            maxCount={1}
            name="logo"
          />
        </div>
      </Container>
    </Form>
  )
}
