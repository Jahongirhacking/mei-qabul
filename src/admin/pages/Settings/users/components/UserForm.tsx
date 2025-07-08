import { useGetRolesList, useGetUniversitiesList } from '@/admin/api/services/common.service'
import { AdminDto } from '@/admin/api/services/user.service'
import { Container } from '@/admin/components/Container'
import SaveButton from '@/admin/components/buttons/SaveButton'
import { PhoneFormItem } from '@/admin/components/formItems/PhoneFormItem'
import { PassportForm } from '@/admin/components/forms/PassportForm'
import { DateInput } from '@/admin/components/inputs/DateInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { usePermission } from '@/admin/hooks/usePermission'
import { PassportResponse } from '@/admin/types/User'
import { clearPhoneMask } from '@/admin/utils/format'
import { Form, type FormProps, Input, Switch } from 'antd'

type Props = FormProps & {
  onFinish: (data: AdminDto) => void
  initialValues?: AdminDto
}

const defaultInitialValues = {
  isActive: true
}

export const UserForm = ({ title, onFinish, initialValues = {} as AdminDto, ...props }: Props) => {
  const [form] = Form.useForm<Omit<AdminDto, 'key'>>()
  const { isVazirlikAdmin } = usePermission()

  const { data: universities } = useGetUniversitiesList({ enabled: isVazirlikAdmin })
  const { data: roles } = useGetRolesList({ enabled: isVazirlikAdmin })

  const setUserFields = (data: PassportResponse) => {
    form.setFieldsValue(data)
  }

  function onSubmit(data: Omit<AdminDto, 'key'>) {
    onFinish({ ...data, phoneNumber: clearPhoneMask(data.phoneNumber) })
  }

  return (
    <>
      <section className="mb-4 bg-white p-4 rounded-md">
        <h1 className="text-xl mb-2 font-bold">Foydalanuvchini qidirish</h1>
        <PassportForm onSuccess={setUserFields} />
      </section>

      <Form
        initialValues={{ ...defaultInitialValues, ...initialValues }}
        onFinish={onSubmit}
        form={form}
        layout="vertical"
        {...props}
      >
        <Container title="Shaxsiy ma'lumotlar" hasGoBack extra={<SaveButton htmlType="submit" />}>
          <div className="grid grid-cols-3 gap-x-4">
            <Form.Item name="pinfl" label="PINFL">
              <TextInput placeholder="PINFL" />
            </Form.Item>

            <Form.Item name="serialAndNumber" label="Passport seriya va raqami">
              <TextInput placeholder="Passport seriya va raqami" />
            </Form.Item>

            <Form.Item name="birthDate" label="Tug'ilgan sana">
              <DateInput />
            </Form.Item>

            <Form.Item name="firstName" label="Ism">
              <TextInput placeholder="Ism" />
            </Form.Item>

            <Form.Item name="lastName" label="Familiya">
              <TextInput placeholder="Familiya" />
            </Form.Item>

            <Form.Item name="fatherName" label="Otasining ismi">
              <TextInput placeholder="Otasining ismi" />
            </Form.Item>

            <Form.Item name="givenDate" label="Passport berilgan sana">
              <DateInput />
            </Form.Item>

            <PhoneFormItem label="Telefon raqami" name="phoneNumber" />

            <Form.Item name="photo" hidden>
              <TextInput />
            </Form.Item>

            <Form.Item name="password" label="Parol">
              <Input.Password />
            </Form.Item>

            {isVazirlikAdmin && (
              <>
                <Form.Item name="universityId" label="OTM">
                  <SelectInput
                    options={universities?.map((item) => ({ label: item.name, value: item.id }))}
                  />
                </Form.Item>

                <Form.Item name="roleIds" label="Rollar">
                  <SelectInput
                    mode="multiple"
                    placeholder="Rol"
                    options={roles?.map((role) => ({ label: role.name, value: role.id }))}
                  />
                </Form.Item>
              </>
            )}

            <Form.Item name="isActive" label="Holati" valuePropName="checked">
              <Switch checkedChildren="Faol" unCheckedChildren="Faol emas" />
            </Form.Item>
          </div>
        </Container>
      </Form>
    </>
  )
}
