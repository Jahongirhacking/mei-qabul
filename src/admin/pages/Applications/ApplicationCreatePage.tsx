import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useGetEduDegreesListByFilter,
  useGetEduInstitutionTypesList, useGetSpecialtiesListByFilter
} from '@/admin/api/services/common.service'
import { useCreateApplications } from '@/admin/api/services/contracts.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { PhoneFormItem } from '@/admin/components/formItems/PhoneFormItem'
import { PassportForm } from '@/admin/components/forms/PassportForm'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { ICreateApplicationDto } from '@/admin/types/Contracts'
import { EduTypeIdEnum } from '@/admin/types/enum'
import { PassportResponse } from '@/admin/types/User'
import { years } from '@/admin/utils/cn'
import { clearPhoneMask } from '@/admin/utils/format'
import { Button, Descriptions, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { DescriptionsProps } from 'antd/lib'

interface formValues {
  specialityId: number
  degreeId: number
  languageId: number
  examType: string
  comment: string
}

interface userFormValues {
  phoneNumber: string
  graduatedYear: number
  eduInstitutionTypeId: number
}

export default function ApplicationCreatePage() {
  const [form] = useForm()
  const [admissionForm] = useForm()
  const [user, setUser] = useState<PassportResponse>()
  const [degreeIdByFilter, setDegreeIdByFilter] = useState<number>()
  const [examType, setExamType] = useState<string>()
  const navigate = useNavigate()

  const { create, isCreating } = useCreateApplications({
    onSuccess: () => {
      navigate(paths.applications)
    }
  })

  const { data: eduInstitutionTypes } = useGetEduInstitutionTypesList()

  const { data: deegreListByFilter, isLoading: isDegreeLoading } = useGetEduDegreesListByFilter({
    params: {
      admissionTypeId: 1,
      eduLevelId: 11,
      eduTypeId: EduTypeIdEnum.BAKALAVR
    },
    enabled: true
  })

  const { data: specialitiesListByFilter, isLoading: isSpecialityLoading } =
    useGetSpecialtiesListByFilter({
      params: {
        degreeId: degreeIdByFilter
      },
      enabled: !!degreeIdByFilter
    })

  const setUserFields = (data: PassportResponse) => {
    setUser(data)
  }

  function onSubmit(data: formValues) {
    console.log('data', data)
    form.validateFields().then((values: userFormValues) => {
      const dto = {
        ...data,
        graduatedYear: values.graduatedYear,
        eduInstitutionTypeId: values.eduInstitutionTypeId,
        admissionTypeId: 1,
        user: { ...user, phoneNumber: clearPhoneMask(values.phoneNumber, true) }
      } as ICreateApplicationDto
      create(dto)
    })
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '0',
      label: 'F.I.O',
      children: <p>{user?.lastName + ' ' + user?.firstName + ' ' + user?.fatherName}</p>
    },
    {
      key: '1',
      label: 'JSHSHIR',
      children: user?.pinfl
    },
    {
      key: '2',
      label: 'Seriasi va raqami',
      children: user?.serialAndNumber
    },
    {
      key: '3',
      label: "Tug'ilgan yili",
      children: user?.birthDate
    },
    {
      key: '4',
      label: 'Telefon raqami',
      children: (
        <PhoneFormItem
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'Iltimos telefon raqam kiriting' }]}
          name="phoneNumber"
        />
      )
    },
    {
      key: '5',
      label: 'Tamomlagan yili',
      children: (
        <Form.Item
          name="graduatedYear"
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'Iltimos tamomlagan yilini tanlang' }]}
        >
          <SelectInput allowClear={false} placeholder="Tamomlagan yilni tanlang" options={years} />
        </Form.Item>
      )
    },
    {
      key: '6',
      label: "Tamomlagan ta'lim muassasasi",
      children: (
        <Form.Item
          name="eduInstitutionTypeId"
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: "Iltimos tamomlagan ta'lim muassasasini tanlang" }]}
        >
          <SelectInput
            allowClear={false}
            placeholder="Tamomlagan ta'lim muassasasini tanlang"
            options={eduInstitutionTypes
              ?.filter((item) => item.availableAdmissionTypes.includes(1))
              ?.map((item) => ({ label: item.name, value: item.id }))}
          />
        </Form.Item>
      )
    }
  ]

  return (
    <Container title="Ariza yaratish" hasBg={false} hasGoBack>
      <section className="mb-4 bg-white p-4 rounded-md">
        <h1 className="text-xl mb-2 font-bold">Foydalanuvchini qidirish</h1>
        <PassportForm onSuccess={setUserFields} />
      </section>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form form={form} layout="vertical">
            <Container title="Shaxsiy va avvalgi ta'lim ma'lumotlari">
              <Descriptions
                bordered
                column={1}
                items={items}
                styles={{ label: { fontWeight: 'bold' }, content: { textAlign: 'end' } }}
              />
            </Container>
          </Form>
          <Form onFinish={onSubmit} form={admissionForm} layout="vertical">
            <Container title="Qabul ma'lumotlari">
              <Form.Item name="degreeId" label="Ta'lim shakli" rules={[{ required: true }]}>
                <SelectInput
                  onChange={setDegreeIdByFilter}
                  value={degreeIdByFilter}
                  allowClear={false}
                  loading={isDegreeLoading}
                  placeholder="Ta'lim shakli tanlang"
                  onSelect={() => {
                    admissionForm.resetFields(['languageId', 'specialityId', 'examType'])
                    setExamType(undefined)
                  }}
                  options={deegreListByFilter?.map((item) => ({
                    value: item.id,
                    label: item.name
                  }))}
                />
              </Form.Item>
              <Form.Item name="specialityId" label="Mutaxassisligi" rules={[{ required: true }]}>
                <SelectInput
                  allowClear={false}
                  placeholder="Ta'lim yo'nalishi"
                  loading={isSpecialityLoading}
                  options={specialitiesListByFilter?.map((item) => ({
                    label: item.speciality,
                    value: item.specialityId
                  }))}
                  onSelect={(id) => {
                    const examType = specialitiesListByFilter?.find(
                      (item) => item.specialityId == id
                    )?.examType;
                    if (examType) setExamType(examType);
                    admissionForm.setFieldValue('examType', examType)
                  }}
                />
              </Form.Item>

              {examType && (
                <Form.Item name="examType" label="Imtihon turi" rules={[{ required: true }]}>
                  <Input readOnly />
                </Form.Item>
              )}

              <Form.Item name="comment" label="Izoh">
                <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isCreating}
                  htmlType="submit"
                  type="primary"
                  className="float-right"
                >
                  Ariza yaratish
                </Button>
              </Form.Item>
            </Container>
          </Form>
        </div>
      )}
    </Container>
  )
}
