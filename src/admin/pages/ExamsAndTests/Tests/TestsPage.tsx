import { useNavigate } from 'react-router-dom'

import {
  ISubject,
  SubjectDto,
  useCreateSubject,
  useDeleteSubject,
  useGetSubjects,
  useUpdateSubject
} from '@/admin/api/services/subject.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import { AddButton } from '@/admin/components/buttons/AddButton'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { EduSubject } from '@/admin/types/Classificatory'
import { successHandler } from '@/admin/utils/lib'
import { Button, Form, Space, TableColumnsType, Tooltip } from 'antd'
import { Trash2 } from 'lucide-react'

export default function TestsPage() {
  const { pagination, setPagination } = usePagination()
  const { isVazirlikAdmin, isSuperAdmin } = usePermission()
  const { data, isFetching, refetch } = useGetSubjects({ ...pagination })
  const confirm = useConfirm()
  const navigate = useNavigate()
  const { onCreate, onUpdate, isOpen, closeModal, form, updateId } = useModalCRUD<ISubject>()

  const { create, isCreating } = useCreateSubject({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const { update, isUpdating } = useUpdateSubject({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const { remove, isRemoving } = useDeleteSubject({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "O'chirishni tasdiqlaysizmi",
      content: '',
      okText: 'Подтверждение',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed) remove(id)
  }

  const submit = (values: SubjectDto) => {
    if (updateId) {
      update({
        data: values,
        id: updateId
      })
    } else {
      create(values)
    }
  }

  const columns: TableColumnsType<EduSubject> = [
    {
      title: 'Nomi',
      dataIndex: 'name'
    },
    {
      title: 'Amallar',
      dataIndex: 'id',
      render: (id: number, record) => {
        return (
          <Space>
            {isSuperAdmin && (
              <Button
                type="primary"
                onClick={() => navigate(`${paths.tests}/add/${id}?name=${record.name}`)}
              >
                Test qo'shish yoki tahrirlash
              </Button>
            )}

            {isVazirlikAdmin && (
              <>
                <Tooltip title="Fanni tahrirlash">
                  <EditIconButton onClick={() => onUpdate(record)} />
                </Tooltip>
                <Tooltip title="Fanni o'chirish">
                  <Button
                    danger
                    loading={isRemoving}
                    type="primary"
                    onClick={() => handleDelete(String(id))}
                    icon={<Trash2 size={16} />}
                  />
                </Tooltip>
              </>
            )}
          </Space>
        )
      }
    }
  ]

  return (
    <Container
      title="Testlar"
      extra={isVazirlikAdmin && <AddButton onClick={onCreate}>Fan qo'shish</AddButton>}
    >
      <PaginationTable
        loading={isFetching}
        total={data?.page.totalElements}
        dataSource={data?.content}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
      />
      <CustomModal
        loading={isCreating || isUpdating}
        isUpdate={!!updateId}
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
      >
        <Form form={form} layout="vertical" onFinish={submit}>
          <Form.Item name="name" label="Fan nomi" rules={[{ required: true }]}>
            <TextInput placeholder="Fan nomini kiriting" />
          </Form.Item>
        </Form>
      </CustomModal>
    </Container>
  )
}
