import { IGetApplicationsResponse } from '@/admin/types/Contracts'
import { Button, TableColumnsType } from 'antd'
import { Download } from 'lucide-react'

interface IApplicationsParams {
  examStatus: string
}

export const useApplicationColumns = ({
  examStatus
}: IApplicationsParams): TableColumnsType<IGetApplicationsResponse> => {
  return [
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
      title: 'Sertifikat mavjudligi',
      dataIndex: 'existsCertificate',
      render: (existsCertificate) => (
        <>
          {existsCertificate ? (
            <span style={{ color: 'green' }}>Mavjud</span>
          ) : (
            <span style={{ color: 'red' }}>Mavjud emas</span>
          )}
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
      title: 'Imtihon shakli',
      dataIndex: 'examType'
    },
    ...(examStatus !== 'NEW'
      ? [
        {
          title: 'Izoh',
          dataIndex: 'comment'
        },
        {
          title: 'Imtihon sanasi va vaqti',
          render: (_: void, record: IGetApplicationsResponse) => (
            <>
              {record.examDate} - {record.examTime}
            </>
          )
        }
      ]
      : []),

    {
      title: 'Fayli',
      dataIndex: 'url',
      render: (_, record) => (
        <Button icon={<Download size={16} />}>
          <a href={record.url} download target="_blank" rel="noopener noreferrer">
            Yuklash
          </a>
        </Button>
      )
    }
  ]
}
