import {
  ILink,
  ILinkList,
  LinkDto,
  useCreateLink,
  useGetLinks,
  useUpdateLink
} from '@/admin/api/services/links.service'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import { AddButton } from '@/admin/components/buttons/AddButton'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePagination } from '@/admin/hooks/usePagination'
import { successHandler } from '@/admin/utils/lib'
import { Form, TableColumnType } from 'antd'
import { FormInstance } from 'antd/lib'
import dayjs from 'dayjs'

export default function LinksPage() {
  const { pagination, setPagination } = usePagination()

  const { data, isFetching, refetch } = useGetLinks(pagination)

  const { onCreate, onUpdate, isOpen, closeModal, form, updateId } = useModalCRUD<ILink>()

  const { create, isCreating } = useCreateLink({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const { update, isUpdating } = useUpdateLink({
    onSuccess: (data) => {
      successHandler(data)
      closeModal()
      refetch()
    }
  })

  const columns: TableColumnType<ILinkList>[] = [
    {
      title: 'Nomi',
      dataIndex: 'name'
    },
    {
      title: 'Havola',
      dataIndex: 'link',
      render: (link: string) => (
        <a href={link} target="_blank">
          {link}
        </a>
      )
    },
    {
      title: 'Murojatlar soni',
      dataIndex: 'requestCount'
    },
    {
      title: 'Yaratilgan sanasi',
      dataIndex: 'createdAt',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY')
    },
    {
      title: 'Amallar',
      dataIndex: 'id',
      render: (_, record) => {
        return (
          <div>
            <EditIconButton onClick={() => onUpdate(record)} />
          </div>
        )
      }
    }
  ]

  const submit = (values: LinkDto) => {
    if (updateId) {
      update({
        data: values,
        id: updateId
      })
    } else {
      create(values)
    }
  }

  return (
    <div>
      <Container extra={<AddButton onClick={onCreate} />} title="Havolalar">
        <PaginationTable
          loading={isFetching}
          total={data?.length}
          dataSource={data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Container>

      <CustomModal
        loading={isCreating || isUpdating}
        isUpdate={!!updateId}
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
      >
        <Form form={form as FormInstance} layout="vertical" onFinish={submit}>
          <Form.Item name="name" label="Havola" rules={[{ required: true }]}>
            <TextInput placeholder="Havola" />
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  )
}
