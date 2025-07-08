import { StepUser, useGetUserSteps } from '@/admin/api/services/step.service'
import { Container } from '@/admin/components/Container'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { formatPhone } from '@/admin/utils/format'
import { Segmented, TableColumnsType } from 'antd'

export default function AdmisssionsPage() {
  const { pagination, setPagination, searchParams, setSearchParams } = usePagination()

  const step = searchParams.get('step') || '1'

  const { data: steps, isFetching } = useGetUserSteps({
    ...pagination,
    step
  })

  const setStep = (step: string) => {
    setSearchParams((params) => {
      params.set('step', step)
      return params
    })
  }

  const columns: TableColumnsType<StepUser> = [
    {
      title: 'F.I.O.',
      dataIndex: 'firstName',
      render: (_, record) => (
        <span>
          {record.lastName} {record.firstName} {record.fatherName}
        </span>
      )
    },
    {
      title: 'Telefon raqami',
      dataIndex: 'phoneNumber',
      render: formatPhone
    }
  ]

  return (
    <Container
      title="Talabalar ro'yxati"
      extra={
        <Segmented<string> defaultValue={step} options={['1', '2', '3', '4']} onChange={setStep} />
      }
    >
      <PaginationTable
        loading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        dataSource={steps?.content}
        columns={columns}
        total={steps?.page.totalElements}
      // expandable={{
      //   expandedRowRender: (record) => (
      //     <div>
      //       <p>{record.phoneNumber}</p>
      //     </div>
      //   )
      // }}
      />
    </Container>
  )
}
