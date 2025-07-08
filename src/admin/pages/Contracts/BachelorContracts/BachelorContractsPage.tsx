import { useState } from 'react'

import {
  useGetEduDegreesListByFilter,
  useGetEduLanguagesListByFilter,
  useGetSpecialtiesListByFilter
} from '@/admin/api/services/common.service'
import {
  useCancelContract,
  useDownloadExcelContracts,
  useGetContracts,
  useUpdateContract
} from '@/admin/api/services/contracts.service'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { useContractColumns } from '@/admin/hooks/useContractColums'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { IGetContractsResponse, IUpdateContractDto } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, ContractStatusEnum } from '@/admin/types/enum'
import { examTypeList, openLink } from '@/admin/utils/constants'
import { successHandler } from '@/admin/utils/lib'
import { Button, Form, Space } from 'antd'
import { CloudDownload } from 'lucide-react'
import { toast } from 'sonner'

export default function BachelorContractsPage() {
  const { pagination, setPagination } = usePagination()
  const [examType, setExamType] = useState<string>()
  const [search, setSearch] = useState<string>()
  const [rowId, setRowId] = useState<number>()
  const { data, isFetching, refetch } = useGetContracts({
    ...pagination,
    admissionTypeId: AdmissionTypeIdEnum.BAKALAVR,
    examType,
    search
  })
  const { isSuperAdmin } = usePermission()
  const confirm = useConfirm()
  const [applicationForm] = Form.useForm()
  const [applicationIdForUpdate, setApplicationIdForUpdate] = useState<number>()
  const [admissionTypeIdByFilter, setAdmissionTypeIdByFilter] = useState<number>()
  const [degreeIdByFilter, setDegreeIdByFilter] = useState<number>()
  const [specialityIdByFilter, setSpecialityIdByFilter] = useState<number>()
  const [languageIdByFilter, setLanguageByFilterId] = useState<number>()
  const [eduLevelIdByFilter, setEduLevelIdByFilter] = useState<number>()
  const [eduTypeIdByFilter, setEduTypeIdByFilter] = useState<number>()
  const [aplicationModalOpen, setAplicationModalOpen] = useState(false)

  const { data: deegreListByFilter } = useGetEduDegreesListByFilter({
    params: {
      admissionTypeId: admissionTypeIdByFilter,
      eduLevelId: eduLevelIdByFilter,
      eduTypeId: eduTypeIdByFilter
    },
    enabled: !!admissionTypeIdByFilter && !!eduLevelIdByFilter && !!admissionTypeIdByFilter
  })

  const { data: languageListByFilter } = useGetEduLanguagesListByFilter({
    params: {
      admissionTypeId: admissionTypeIdByFilter,
      eduLevelId: eduLevelIdByFilter,
      eduTypeId: eduTypeIdByFilter,
      degreeId: degreeIdByFilter
    },
    enabled:
      !!admissionTypeIdByFilter && !!eduLevelIdByFilter && !!eduTypeIdByFilter && !!degreeIdByFilter
  })

  const { data: specialitiesListByFilter } = useGetSpecialtiesListByFilter({
    params: {
      admissionTypeId: admissionTypeIdByFilter,
      eduLevelId: eduLevelIdByFilter,
      eduTypeId: eduTypeIdByFilter,
      degreeId: degreeIdByFilter,
      languageId: languageIdByFilter
    },
    enabled:
      !!eduTypeIdByFilter && !!eduLevelIdByFilter && !!languageIdByFilter && !!degreeIdByFilter
  })

  const { mutate: updateContract, isPending: isUpdateContract } = useUpdateContract(
    applicationIdForUpdate!,
    {
      onSuccess: (data) => {
        successHandler(data)
        refetch()
        setAplicationModalOpen(false)
        setApplicationIdForUpdate(undefined)
      }
    }
  )

  const handleEditApplicationButton = (record: IGetContractsResponse) => {
    console.log('record', record)
    setApplicationIdForUpdate(record.id)
    setAdmissionTypeIdByFilter(record.admissionTypeId)
    setDegreeIdByFilter(record.degreeId)
    setSpecialityIdByFilter(record.admissionTypeId)
    setLanguageByFilterId(record.languageId)
    setEduLevelIdByFilter(record.eduLevelId)
    setEduTypeIdByFilter(record.eduTypeId)
    setAplicationModalOpen(true)
    applicationForm.setFieldsValue({
      degreeId: record.degreeId,
      specialityId: record.specialityId,
      languageId: record.languageId
    })
  }

  const applicationSubmit = (values: IUpdateContractDto) => {
    updateContract(values)
  }

  const closeApplicationEditModal = () => {
    applicationForm.resetFields()
    setAplicationModalOpen(false)
  }

  const columns = useContractColumns({ isSuperAdmin, handleEditApplicationButton })

  const { mutate: cancelContract, isPending: isCancel } = useCancelContract({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })

  const { download, isDownload } = useDownloadExcelContracts({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Bakalavr shartnomalari excel')
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

  return (
    <Container
      title="Bakalavr shartnomalari"
      extra={
        <Space>
          <SearchInput onSearch={setSearch} />
          <SelectInput
            onChange={setExamType}
            value={examType}
            placeholder="Imtihon turi"
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
                admissionTypeId: 1,
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

      <CustomModal
        title="Shartnomani tahrirlash"
        open={aplicationModalOpen}
        onCancel={closeApplicationEditModal}
        onSubmit={applicationForm.submit}
        loading={isUpdateContract}
      >
        <Form form={applicationForm} layout="vertical" onFinish={applicationSubmit}>
          <Form.Item name="degreeId" label="Ta'lim shakli" rules={[{ required: true }]}>
            <SelectInput
              onChange={setDegreeIdByFilter}
              value={degreeIdByFilter}
              allowClear={false}
              placeholder="Ta'lim shakli tanlang"
              onSelect={() => {
                applicationForm.resetFields(['languageId', 'specialityId'])
              }}
              options={deegreListByFilter?.map((item) => ({ value: item.id, label: item.name }))}
            />
          </Form.Item>
          <Form.Item name="languageId" label="Ta'lim tili" rules={[{ required: true }]}>
            <SelectInput
              onChange={setLanguageByFilterId}
              value={languageIdByFilter}
              allowClear={false}
              placeholder="Ta'lim tilini tanlang"
              onSelect={() => {
                applicationForm.resetFields(['specialityId'])
              }}
              options={languageListByFilter?.map((item) => ({ value: item.id, label: item.name }))}
            />
          </Form.Item>
          <Form.Item name="specialityId" label="Mutaxassisligi" rules={[{ required: true }]}>
            <SelectInput
              onChange={setSpecialityIdByFilter}
              value={specialityIdByFilter}
              allowClear={false}
              placeholder="Ta'lim yo'nalishi"
              options={specialitiesListByFilter?.map((item) => ({
                label: item.speciality,
                value: item.specialityId
              }))}
            />
          </Form.Item>
        </Form>
      </CustomModal>
    </Container>
  )
}
