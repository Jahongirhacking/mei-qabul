import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { IGetContractsResponse } from '@/admin/types/Contracts'
import { ContractStatusEnum } from '@/admin/types/enum'
import { getApplicationStatusColor, getApplicationStatusName } from '@/admin/utils/constants'
import { numberFormat } from '@/admin/utils/format'
import { Button, Space, TableColumnsType } from 'antd'
import { Download } from 'lucide-react'

interface IProps {
  cancellation?: boolean
  isSuperAdmin?: boolean
  handleEditApplicationButton?: (record: IGetContractsResponse) => void
}

export const useContractColumns = ({
  cancellation = false,
  isSuperAdmin,
  handleEditApplicationButton
}: IProps): TableColumnsType<IGetContractsResponse> => {
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
    ...(cancellation
      ? [
        {
          title: "Ta'lim turi",
          dataIndex: 'eduType'
        }
      ]
      : []),
    {
      title: "Ta'lim shakli",
      dataIndex: 'degree'
    },
    {
      title: 'Kursi',
      dataIndex: 'eduLevel'
    },
    ...(cancellation
      ? []
      : [
        {
          title: "O'qish davomiyligi",
          dataIndex: 'eduPeriod'
        },
        {
          title: "O'quv yili",
          dataIndex: 'academicYear'
        }
      ]),
    {
      title: 'Tili',
      dataIndex: 'language'
    },
    {
      title: 'Shartnoma raqami',
      dataIndex: 'contractNumber'
    },
    {
      title: 'Shartnoma summasi',
      dataIndex: 'contractSum',
      render: (contractSum) => numberFormat(contractSum)
    },
    ...(cancellation
      ? []
      : [
        {
          title: 'Shartnoma turi',
          dataIndex: 'contractTemplateType'
        }
      ]),
    {
      title: 'Shartnoma sanasi',
      dataIndex: 'contractRegisterDate'
    },
    {
      title: 'Holati',
      dataIndex: 'status',
      render: (status: string) => (
        <p className={getApplicationStatusColor(status)}>{getApplicationStatusName(status)}</p>
      )
    },
    {
      title: 'Shartnoma fayli',
      dataIndex: 'contractUrl',
      render: (contractUrl) => (
        <Button icon={<Download size={16} />}>
          <a href={contractUrl} target="_blank" download>
            Yuklash
          </a>
        </Button>
      )
    },
    ...(isSuperAdmin
      ? [
        {
          title: 'Amallar',
          dataIndex: 'id',
          render: (_: number, record: IGetContractsResponse) => {
            return (
              <Space>
                {record.status === ContractStatusEnum.APPROVED && handleEditApplicationButton && (
                  <EditIconButton onClick={() => handleEditApplicationButton(record)} />
                )}
              </Space>
            )
          }
        }
      ]
      : [])
  ]
}
