import { useState } from 'react'

import { useGetSpecialtiesList } from '@/admin/api/services/common.service'
import {
  useDownloadExcelOnlineApplicationsresults,
  useGetOnlineApplicationsresults
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { IGetOnlineApplicationsResultsResponse } from '@/admin/types/Contracts'
import { getExamStatusColor, getExamStatusName, openLink } from '@/admin/utils/constants'
import { Button, Space, TableColumnsType } from 'antd'
import { CloudDownload, Download } from 'lucide-react'

export default function OnlineApplicationsResultsPage() {
  const { pagination, setPagination } = usePagination()
  const [search, setSearch] = useState<string>()
  const [specialityId, setSpecialityId] = useState<number>()
  const { data: specialitiesList } = useGetSpecialtiesList()
  const { data, isFetching } = useGetOnlineApplicationsresults({
    ...pagination,
    search,
    specialityId
  })

  const columns: TableColumnsType<IGetOnlineApplicationsResultsResponse> = [
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
      title: 'Mutaxassisligi va kodi',
      render: (_, record) => (
        <>
          {record.speciality} - {record.specialityCode}
        </>
      )
    },
    {
      title: "Ta'lim turi",
      dataIndex: 'eduType'
    },
    {
      title: "Ta'lim shakli",
      dataIndex: 'degree'
    },
    {
      title: 'Tili',
      dataIndex: 'language'
    },
    {
      title: 'Imtihon bali',
      dataIndex: 'score'
    },
    {
      title: 'Imtihon holati',
      dataIndex: 'examStatus',
      render: (status: string) => (
        <p className={getExamStatusColor(status)}>{getExamStatusName(status)}</p>
      )
    },
    {
      title: 'Javob varaqasi',
      dataIndex: 'answerSheetUrl',
      align: 'center',
      render: (answerSheetUrl) => (
        <Button icon={<Download size={16} />}>
          <a href={answerSheetUrl} target="_blank" download>
            Yuklash
          </a>
        </Button>
      )
    }
  ]

  const { download, isDownload } = useDownloadExcelOnlineApplicationsresults({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Online arizalar natijalari excel')
    }
  })

  return (
    <Container
      title="Online arizalar natijalari"
      extra={
        <Space>
          <SearchInput onSearch={setSearch} />
          <SelectInput
            onChange={setSpecialityId}
            value={specialityId}
            style={{ width: '250px' }}
            placeholder="Mutaxassisligi"
            options={specialitiesList?.map((item) => ({
              label: item.specialityName,
              value: item.id
            }))}
          />
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                specialityId
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
      />
    </Container>
  )
}
