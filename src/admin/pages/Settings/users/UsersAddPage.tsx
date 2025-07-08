import { useNavigate } from 'react-router-dom'

import { AdminDto, useCreateUser } from '@/admin/api/services/user.service'
import { FormLoader } from '@/admin/components/FormLoader'

import { UserForm } from './components/UserForm'

export default function UsersAddPage() {
  const navigate = useNavigate()

  const { create, isCreating } = useCreateUser({
    onSuccess: () => {
      navigate(-1)
    }
  })

  const submit = (userDto: AdminDto) => {
    create(userDto)
  }

  return (
    <FormLoader spinning={isCreating}>
      <UserForm title="Admin qo'shish" onFinish={submit} />
    </FormLoader>
  )
}
