import React, { useState } from 'react'

import { useGetAdmissionTypeList } from '@/admin/api/services/common.service'
import {
  useApproveOrRejectCanecellationRequest,
  useDownloadExcelCancellationRequests,
  useGetCancellationRequests
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useContractColumns } from '@/admin/hooks/useContractColums'
import { usePagination } from '@/admin/hooks/usePagination'
import { examTypeList, openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, Space } from 'antd'
import { CloudDownload } from 'lucide-react'
import { toast } from 'sonner'

export default function CancellationRequestsPage() {
  const { pagination, setPagination } = usePagination()
  const [examType, setExamType] = useState<string>()
  const [ids, setIds] = useState<number[]>([])
  const [checkBtn, setCheckBtn] = useState<number>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>()
  const { data, isFetching, refetch } = useGetCancellationRequests({
    ...pagination,
    admissionTypeId,
    examType
  })

  const { create, isCreating } = useApproveOrRejectCanecellationRequest({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const { download, isDownload } = useDownloadExcelCancellationRequests({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), "Bekor qilishga jo'natilgan so'rovlar excel")
    }
  })

  const { data: admissionTypeList } = useGetAdmissionTypeList()

  const columns = useContractColumns({ cancellation: true })

  const handleApprove = () => {
    setCheckBtn(1)
    if (ids.length === 0) {
      toast.error('Iltimos avval kimlarga tasdiqlashni jadvaldan tanlang')
    } else {
      create({ isApprove: true, ids })
    }
  }

  const handleReject = () => {
    setCheckBtn(1)
    if (ids.length === 0) {
      toast.error('Iltimos avval kimlarga rad qilishni jadvaldan tanlang')
    } else {
      create({ isApprove: false, ids })
    }
  }

  return (
    <Container
      title="Bekor qilishga jo'natilgan so'rovlar"
      extra={
        <Space>
          <SelectInput
            onChange={setExamType}
            value={examType}
            placeholder="Imtihon turi"
            options={examTypeList}
          />
          <SelectInput
            onChange={setAdmissionTypeId}
            value={admissionTypeId}
            style={{ width: '200px' }}
            placeholder="Qabul turi"
            options={admissionTypeList?.map((item) => ({ label: item.name, value: item.id }))}
          />
          <Button onClick={handleApprove} loading={isCreating && checkBtn === 1} type="primary">
            Tasdiqlash
          </Button>
          <Button
            onClick={handleReject}
            loading={isCreating && checkBtn === 2}
            type="primary"
            danger
          >
            Rad qilish
          </Button>
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                admissionTypeId,
                examType
              })
            }
          >
            Excel yuklash
          </Button>
        </Space>
      }
    >
      <PaginationTable
        loading={isFetching}
        total={data?.page.totalElements}
        dataSource={data?.content}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        rowSelection={{
          selectedRowKeys: ids,
          onChange: (serviceIds: React.Key[]) => {
            setIds(serviceIds as number[])
          }
        }}
      />
    </Container>
  )
}
