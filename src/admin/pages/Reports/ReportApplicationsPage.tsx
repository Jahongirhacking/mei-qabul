import { useState } from 'react'

import {
  useDownloadExcelReportApplications,
  useGetAdmissionTypeList,
  useGetReportApplications
} from '@/admin/api/services/common.service'
import { Container } from '@/admin/components/Container'
import { BaseTable } from '@/admin/components/table/BaseTable'
import { IGetReportsApplicationsResponse } from '@/admin/types/Classificatory'
import { openLink } from '@/admin/utils/constants'
import { Button, Space, TableColumnsType } from 'antd'
import { CloudDownload } from 'lucide-react'

export default function ReportApplicationsPage() {
  const [admissionTypeId, setAdmissionTypeId] = useState<number>()

  const { data, isFetching } = useGetReportApplications({
    page: 1,
    size: 10000,
    admissionTypeId,
  })
  const { data: admissionTypeList } = useGetAdmissionTypeList()

  const columns: TableColumnsType<IGetReportsApplicationsResponse> = [
    {
      title: "Yo'nalish nomi va kodi",
      dataIndex: 'speciality',
      render: (speciality, record) => (
        <span>
          {speciality} - {record.specialityCode}
        </span>
      )
    },
    {
      title: "Ta'lim shakli",
      dataIndex: 'degree'
    },
    // {
    //   title: 'Qabul turi',
    //   dataIndex: 'admissionType'
    // },
    // {
    //   title: "Ta'lim tili",
    //   dataIndex: 'language'
    // },
    // {
    //   title: 'Sertifikatlar soni',
    //   dataIndex: 'certificateCount',
    //   align: 'center'
    // },
    {
      title: 'Bugungi kunlik ariza',
      dataIndex: 'todayApplicationCount',
      align: 'center'
    },
    {
      title: 'Jami arizalar soni',
      dataIndex: 'total',
      align: 'center'
    }
  ]

  const { download, isDownload } = useDownloadExcelReportApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Arizalar kesimda hisobot')
    }
  })

  return (
    <Container
      title="Yo‘nalishlar kesimida topshirilgan arizalar hisoboti"
      extra={
        <Space>
          {/* <SelectInput
            onChange={setAdmissionTypeId}
            value={admissionTypeId}
            style={{ width: '180px' }}
            placeholder="Qabul turi"
            options={admissionTypeList?.map((item) => ({ label: item.name, value: item.id }))}
          /> */}
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                admissionTypeId
              })
            }
          >
            Excel yuklash
          </Button>
        </Space>
      }
    >
      <BaseTable
        loading={isFetching}
        dataSource={data?.content}
        columns={columns}
        pagination={false}
        scroll={{ y: 600 }}
        sticky
      />
    </Container>
  )
}
