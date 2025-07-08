import { useState } from 'react'

import {
  useCancelContract,
  useDownloadExcelContracts,
  useGetContracts
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { useContractColumns } from '@/admin/hooks/useContractColums'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { IGetContractsResponse } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, ContractStatusEnum } from '@/admin/types/enum'
import { examTypeList, openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, Space } from 'antd'
import { CloudDownload } from 'lucide-react'
import { toast } from 'sonner'

export default function TransferContractsPage() {
  const { pagination, setPagination } = usePagination()
  const [examType, setExamType] = useState<string>()
  const [search, setSearch] = useState<string>()
  const { data, isFetching, refetch } = useGetContracts({
    ...pagination,
    admissionTypeId: AdmissionTypeIdEnum.TRANSFER,
    examType,
    search
  })

  const [rowId, setRowId] = useState<number>()
  const { isSuperAdmin } = usePermission()
  const confirm = useConfirm()

  const { mutate: cancelContract, isPending: isCancel } = useCancelContract({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const handleCancelContract = () => {
    if (!rowId) {
      toast.error('Iltimos avval kimni shartnomasini bekor qilishni jadvaldan tanlang')
    } else {
      handleCancel()
    }
  }

  const handleCancel = async () => {
    const isConfirmed = await confirm({
      title: 'Belgilangan shartnomani bekor qilishni tasdiqlaysizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed && rowId) cancelContract([rowId])
  }

  const columns = useContractColumns({})

  const { download, isDownload } = useDownloadExcelContracts({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), "O'qishni ko'chirish shartnomalari excel")
    }
  })

  return (
    <Container
      title="O'qishni ko'chirish shartnomalari"
      extra={
        <Space>
          <SearchInput onSearch={setSearch} />
          <SelectInput
            onChange={setExamType}
            placeholder="Imtihon turi"
            value={examType}
            options={examTypeList}
          />
          {isSuperAdmin && (
            <>
              <Button type="primary" danger loading={isCancel} onClick={handleCancelContract}>
                Shartnomani bekor qilish
              </Button>
            </>
          )}
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                admissionTypeId: 3,
                examType
              })
            }
          >
            Excel yuklash
          </Button>
        </Space>
      }
    >
      <PaginationTable<IGetContractsResponse>
        loading={isFetching}
        total={data?.page.totalElements}
        dataSource={data?.content}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: rowId !== undefined ? [rowId] : [],
          onChange: (selectedRowKeys: React.Key[]) => {
            setRowId(selectedRowKeys[0] as number)
          },
          getCheckboxProps: (record: IGetContractsResponse) => ({
            disabled: record.status !== ContractStatusEnum.APPROVED
          })
        }}
      />
    </Container>
  )
}
