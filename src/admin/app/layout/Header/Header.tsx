import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setSavedRole } from '@/admin/api/services/storage.service'
import { changeUniversity, changeUserRole } from '@/admin/api/services/user.service'
import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { CustomModal } from '@/admin/components/CustomModal'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePermission } from '@/admin/hooks/usePermission'
import { UserRole } from '@/admin/types/User'
import { otmListForMenejmentSuperAdmin, otmListForTiuSuperAdmin } from '@/admin/utils/constants'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Form, Popover, Space } from 'antd'
import { CircleUser, LogOut, User } from 'lucide-react'

import { FormInstance } from 'antd/lib'
import s from './Header.module.css'

interface HeaderProps {
  toggle: () => void
  collapsed: boolean
}

type FormValues = {
  universityId: number
}

type P = {
  id: number
} & FormValues

export const Header = React.memo(function Header({ toggle, collapsed }: HeaderProps) {
  const user = useAuthStore((state) => state.user)
  const userRole = useAuthStore((state) => state.userRole)
  const logout = useAuthStore((state) => state.logout)
  const changeRole = useAuthStore((state) => state.changeRole)
  const reload = useAuthStore((state) => state.reload)
  const { onCreate, isOpen, closeModal, form } = useModalCRUD<P>()
  const { isSuperAdmin } = usePermission()
  const navigate = useNavigate()

  const menuIconStyle = { fontSize: '25px', color: 'var(--text-color)' }

  const handleRoleChange = (role: UserRole) => {
    setSavedRole(role.name)
    changeRole(role.id)
    navigate(paths.statistics)
    changeUserRole(role.id)
  }

  const submit = (values: FormValues) => {
    changeUniversity(values?.universityId).then(() => {
      reload()
      closeModal()
    })
  }

  return (
    <header className={s.Header}>
      {collapsed ? (
        <MenuUnfoldOutlined style={menuIconStyle} onClick={toggle} />
      ) : (
        <MenuFoldOutlined onClick={toggle} style={menuIconStyle} />
      )}

      <div className="max-w-lg text-center">
        <h1 className="text-lg font-semibold  leading-[1.3rem]">{user?.university}</h1>
      </div>

      <Space>
        {isSuperAdmin &&
          (user?.universityId == 99 ||
            user?.universityId == 9 ||
            user?.universityId === 101 ||
            user?.universityId == 43 ||
            user?.universityId == 1000) && (
            <Button
              type="primary"
              onClick={() => {
                form.setFieldValue('universityId', user?.universityId)
                onCreate()
              }}
            >
              OTMni o'zgartirish
            </Button>
          )}

        <Popover
          trigger="click"
          title={null}
          placement="bottomRight"
          content={
            <div className="flex flex-col gap-2">
              {user?.roles?.map((role, index) => (
                <Button
                  key={index}
                  type={userRole == role.name ? 'primary' : 'default'}
                  onClick={() => handleRoleChange(role)}
                >
                  <CircleUser size={20} />
                  {role.name}
                </Button>
              ))}

              <Button danger type="primary" onClick={logout}>
                <LogOut size={20} />
                Выход
              </Button>
            </div>
          }
        >
          <div className="flex items-center gap-3 border-l pl-4">
            <div className="hidden sm:block text-right">
              <div className="text-md font-semibold">
                {user?.lastName} {user?.firstName} {user?.fatherName}
              </div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </Popover>
      </Space>

      <CustomModal
        title="OTMni o'zgartirish"
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
      // loading={isCreating}
      >
        <Form form={form as FormInstance} layout="vertical" onFinish={submit}>
          <Form.Item name="universityId" label="OTM" rules={[{ required: true }]}>
            <SelectInput
              allowClear={false}
              placeholder="OTMni tanlang"
              options={
                user?.universityId == 99 || user?.universityId == 9 || user?.universityId === 101
                  ? otmListForTiuSuperAdmin
                  : otmListForMenejmentSuperAdmin
              }
            />
          </Form.Item>
        </Form>
      </CustomModal>
    </header>
  )
})
