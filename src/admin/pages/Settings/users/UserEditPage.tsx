import { useNavigate, useParams } from 'react-router-dom'

import { AdminDto, useGetUser, useUpdateUser } from '@/admin/api/services/user.service'
import { FormLoader } from '@/admin/components/FormLoader'
import { Loader } from '@/admin/components/Loader'
import { formatToPhoneMask } from '@/admin/utils/format'

import { UserForm } from './components/UserForm'

export default function UserEditPage() {
  const { id } = useParams()
  const { data: response, isError, isLoading } = useGetUser(id)
  const navigate = useNavigate()

  const { update, isUpdating } = useUpdateUser({
    onSuccess: () => {
      navigate(-1)
    }
  })

  const submit = (data: AdminDto) => {
    update({
      data,
      id
    })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError || !response || !response) {
    return <h1>Bunday foydalanuvchi mavjud emas</h1>
  }

  const data = response

  const initialValues: AdminDto = {
    pinfl: data.pinfl,
    phoneNumber: formatToPhoneMask(data.phoneNumber) as string,
    givenDate: data.givenDate,
    serialAndNumber: data.serialAndNumber,
    firstName: data.firstName,
    lastName: data.lastName,
    fatherName: data.fatherName,
    photo: data.photoUrl,
    isActive: data.isActive,
    universityId: data.universityId,
    organizationId: data.organizationId,
    roleIds: data.roleIds,
    birthDate: data.birthDate
  }

  return (
    <FormLoader spinning={isUpdating}>
      <UserForm initialValues={initialValues} title="Adminni tahrirlash" onFinish={submit} />
    </FormLoader>
  )
}
