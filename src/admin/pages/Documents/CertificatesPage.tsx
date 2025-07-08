import React, { useState } from 'react'

import {
  useGetCertificates,
  useGetEduSubjectsList,
  useRejectSertificates
} from '@/admin/api/services/common.service'
import { useDownloadExcelSertificates } from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { IGetCertificatesResponse } from '@/admin/types/Classificatory'
import { openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, Space, TableColumnsType } from 'antd'
import { CloudDownload, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function CertificatesPage() {
  const { pagination, setPagination } = usePagination()
  const [search, setSearch] = useState<string>()
  const [rowIds, setRowIds] = useState<number[]>()
  const [subjectId, setSubjectId] = useState<number>()
  const confirm = useConfirm()
  const { isSuperAdmin, isAdmin } = usePermission()

  const { data: subjectList } = useGetEduSubjectsList()
  const { data, isFetching, refetch } = useGetCertificates({
    ...pagination,
    search,
    subjectId
  })

  const { create, isCreating } = useRejectSertificates({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const columns: TableColumnsType<IGetCertificatesResponse> = [
    {
      title: 'FIO',
      render: (_, record) => (
        <>
          {record.lastName} {record.firstName} {record.fatherName}
        </>
      )
    },
    {
      title: 'JSHSHIR',
      dataIndex: 'pinfl'
    },
    {
      title: 'Telefon raqami',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Sertifikat turi',
      dataIndex: 'certificateType'
    },
    {
      title: 'Fani',
      align: 'center',
      dataIndex: 'subject'
    },
    {
      title: 'Sertifikat raqami',
      align: 'center',
      dataIndex: 'number'
    },
    {
      title: 'Bal',
      align: 'center',
      dataIndex: 'score'
    },
    {
      title: 'Berilgan sanasi',
      dataIndex: 'givenDate',
      align: 'center'
    },
    {
      title: 'Sertifikat holati',
      dataIndex: 'isActive',
      align: 'center',
      render: (isActive) => (
        <span className={`${isActive ? 'text-green-500' : 'text-red-500'} font-bold`}>
          {isActive ? 'Tasdiqlangan' : 'Bekor qiingan'}
        </span>
      )
    },
    {
      title: 'Fayli',
      dataIndex: 'url',
      align: 'center',
      render: (contractUrl) => (
        <Button icon={<Download size={16} />}>
          <a href={contractUrl} target="_blank" download>
            Yuklash
          </a>
        </Button>
      )
    }
  ]

  const { download, isDownload } = useDownloadExcelSertificates({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Sertifikatlar excel')
    }
  })

  const handleReject = async () => {
    const isConfirmed = await confirm({
      title: 'Tanlangan sertifikatlarni bekor qilishni tasdiqlaysizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed) create(rowIds!)
  }

  const reject = () => {
    if (rowIds?.length === 0) {
      toast.error('Iltimos avval kimlarni sertifikatini bekor qilishni jadvaldan tanlang')
    } else {
      handleReject()
    }
  }

  return (
    <Container
      title="Sertifikatlar"
      extra={
        <Space>
          <SearchInput onSearch={setSearch} />
          <SelectInput
            style={{ width: '150px' }}
            onChange={setSubjectId}
            placeholder="Fanni tanlang"
            value={subjectId}
            options={subjectList?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                subjectId
              })
            }
          >
            Excel yuklash
          </Button>
          {(isSuperAdmin || isAdmin) && (
            <Button loading={isCreating} type="primary" danger onClick={reject}>
              Sertifikatlarni bekor qilish
            </Button>
          )}
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
          selectedRowKeys: rowIds,
          onChange: (sIds: React.Key[]) => {
            setRowIds(sIds as number[])
          },
          getCheckboxProps: (record: { isActive: boolean }) => ({
            disabled: !record.isActive
          })
        }}
      />
    </Container>
  )
}
