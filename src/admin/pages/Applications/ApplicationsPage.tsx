import { useCallback, useState } from 'react'

import {
  useGetApplicationsForCallCenter,
  useGetEduDegreesList,
  useGetEduDegreesListByFilter, useGetEduLanguagesListByFilter,
  useGetEduLevelsList, useGetSpecialtiesList,
  useGetSpecialtiesListByFilter
} from '@/admin/api/services/common.service'
import {
  useApproveOrRejectApplications,
  useAproveRecommendation, useDownloadExcelApplications, useUpdateApplication
} from '@/admin/api/services/contracts.service'
import { uploadFile } from '@/admin/api/services/upload.service'
import { useUpdateUserPhoneNumber } from '@/admin/api/services/user.service'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { PhoneFormItem } from '@/admin/components/formItems/PhoneFormItem'
import { SinglePdfUploadFormItem } from '@/admin/components/formItems/SinglePdfUploadFormItem'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { useConfirm } from '@/admin/hooks/useConfirmModal'
import { useModalCRUD } from '@/admin/hooks/useModalCRUD'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { IGetApplicationsForCallCenterResponse } from '@/admin/types/Classificatory'
import { IUpdateApplicationDto } from '@/admin/types/Contracts'
import { AdmissionTypeIdEnum, ApplicationStatusEnum } from '@/admin/types/enum'
import {
  applicationStatusList, examStatusList, getApplicationStatusColor,
  getApplicationStatusName,
  openLink,
  SearchParams
} from '@/admin/utils/constants'
import { clearPhoneMask, formatToPhoneMask } from '@/admin/utils/format'
import { successHandler } from '@/admin/utils/lib'
import { ExamStatusEnum } from '@/types/enum'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import {
  Button, Flex,
  Form,
  FormInstance,
  Input,
  InputNumber, TableColumnsType
} from 'antd'
import { default as TextArea } from 'antd/es/input/TextArea'
import { CloudDownload, Download, Eye } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import ApplicationDetailModal from './ApplicationDetailModal'

type FormValues = {
  message: string
}

export type AdmiceFormValues = {
  highSchoolCertificate: string
  highSchoolCertificateGrade: number
}

type P = {
  id: number
} & FormValues

export default function ApplicationsPage() {
  const { pagination, setPagination } = usePagination()
  const [examType, setExamType] = useState<string>()
  const [search, setSearch] = useState<string>()
  const [rowId, setRowId] = useState<number>()
  const [applicationId, setApplicationId] = useState<number>()
  const [applicationIdForUpdate, setApplicationIdForUpdate] = useState<number>()
  const [examStatus, setExamStatus] = useState<ExamStatusEnum>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>(1)
  const [admissionTypeIdByFilter, setAdmissionTypeIdByFilter] = useState<number>()
  const [statusId, setStatusId] = useState<number | undefined>()
  const [eduLevelIdByFilter, setEduLevelIdByFilter] = useState<number>()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [eduTypeIdByFilter, setEduTypeIdByFilter] = useState<number>()
  const [degreeId, setDegreeId] = useState<number>()
  const [degreeIdByFilter, setDegreeIdByFilter] = useState<number>()
  const [languageId, setLanguageId] = useState<number>()
  const [languageIdByFilter, setLanguageByFilterId] = useState<number>()
  const [specialityId, setSpecialityId] = useState<number>()
  const [specialityIdByFilter, setSpecialityIdByFilter] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [aplicationModalOpen, setAplicationModalOpen] = useState(false)
  const [adviceModalOpen, setAdviceModalOpen] = useState(false)
  const { isOpen, closeModal, form } = useModalCRUD<P>()
  const [searchParams, setSearchParams] = useSearchParams();

  const [phoneForm] = Form.useForm()
  const [adviceForm] = Form.useForm()
  const [applicationForm] = Form.useForm()
  const [userId, setUserId] = useState<number | null>(null)

  const closePhoneEditModal = () => {
    phoneForm.resetFields()
    setUserId(null)
  }

  const closeApplicationEditModal = () => {
    applicationForm.resetFields()
    setAplicationModalOpen(false)
  }

  const { data, isFetching, refetch } = useGetApplicationsForCallCenter({
    ...pagination,
    admissionTypeId,
    examType,
    examStatus,
    specialityId,
    search,
    eduTypeId,
    languageId,
    degreeId,
    statusId
  })
  const { data: levelList } = useGetEduLevelsList()
  const { data: deegreList } = useGetEduDegreesList()
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
  const { data: specialitiesList } = useGetSpecialtiesList()
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

  // const { data: eduTypeList } = useGetEduTypesList()
  const { isAdmin } = usePermission()
  const confirm = useConfirm()

  // const { data: application, isLoading } = useGetApplicationById(applicationId)

  const { mutate: approveOrRejectApplications, isPending: isActionPending } = useApproveOrRejectApplications({
    onSuccess: (data) => {
      successHandler(data)
      refetch()
    }
  })


  const { update: updatePhoneNumber, isUpdating: isUpdatingPhoneNumber } = useUpdateUserPhoneNumber(
    {
      onSuccess: (data) => {
        successHandler(data)
        refetch()
        closePhoneEditModal()
      }
    }
  )

  const { mutate: approve, isPending } = useAproveRecommendation(rowId!, {
    onSuccess: (data) => {
      successHandler(data)
      refetch()
      setAdviceModalOpen(false)
      adviceForm.resetFields()
    }
  })

  const { mutate: updateApplication, isPending: isUpdateApplication } = useUpdateApplication(
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

  const columns: TableColumnsType<IGetApplicationsForCallCenterResponse> = [
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
      dataIndex: 'phoneNumber',
      render: (phoneNumber, { userId }) => (
        <button
          className="text-blue-500"
          onClick={() => {
            const phone = formatToPhoneMask(phoneNumber)
            phoneForm.setFieldValue('phone', phone)
            setUserId(userId)
          }}
        >
          +{phoneNumber}
        </button>
      )
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
      title: 'Qayd varaqasi',
      dataIndex: 'url',
      render: (url: string) => (
        <Button icon={<Download size={16} />} disabled={!url}>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            Yuklash
          </a>
        </Button>
      )
    },
    {
      title: 'Ariza holati',
      dataIndex: 'status',
      render: (status: string) => (
        <p className={getApplicationStatusColor(status)}>{getApplicationStatusName(status)}</p>
      )
    },
    ...(admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION
      ? [
        {
          title: 'Fayli',
          dataIndex: 'url',
          render: (_: string, record: IGetApplicationsForCallCenterResponse) => (
            <Button
              icon={<Eye size={16} />}
              onClick={() => {
                showModal()
                setApplicationId(record.id)
              }}
            />
          )
        }
      ]
      : []),
    {
      title: 'Amallar',
      dataIndex: 'id',
      fixed: 'right',
      render: (_: number, record: IGetApplicationsForCallCenterResponse) => (
        <Button
          icon={<Eye size={16} />}
          onClick={() => {
            showApplicationModal(record.id)
          }}
        />
      )
    }
  ]

  const showApplicationModal = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.ApplicationId, String(id));
    setSearchParams(params);
    setIsModalOpen(true);
  }

  const hideApplicationModal = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(SearchParams.ApplicationId);
    setSearchParams(params);
    setIsModalOpen(false);
  }, [searchParams, setSearchParams])

  const { download, isDownload } = useDownloadExcelApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Arizalar excel')
    }
  })

  const handleReject = async () => {
    const isConfirmed = await confirm({
      title: 'Belgilangan arizani bekor qilasizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed && rowId) approveOrRejectApplications({ id: applicationId || 0, isApprove: false, message: 'cancel' })
  }

  const handleApprove = async () => {
    const isConfirmed = await confirm({
      title: 'Belgilangan arizani tasdiqlaysizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'primary'
    })

    if (isConfirmed && rowId) approveOrRejectApplications({ id: applicationId || 0, isApprove: true, message: 'approve' })
  }

  const handleRejectApplications = () => {
    if (!rowId) {
      toast.error('Iltimos avval kimni arizasini bekor qilishni jadvaldan tanlang')
    } else {
      handleReject()
    }
  }


  const handleApproveApplications = () => {
    if (!rowId) {
      toast.error('Iltimos avval kimni arizasini tasdiqlashni jadvaldan tanlang')
    } else {
      handleApprove();
    }
  }

  const showModal = () => {
    // setIsModalOpen(true)
  }

  const submit = (values: FormValues) => {
    // rejectTargetApplication(values)
  }

  const submitAdvice = async (values: AdmiceFormValues) => {
    const response = await uploadFile(values.highSchoolCertificate[0] as unknown as File)
    approve({
      highSchoolCertificateGrade: values.highSchoolCertificateGrade,
      highSchoolCertificate: response.url
    })
  }

  const phoneSubmit = ({ phone }: { phone: string }) => {
    const phoneNumber = clearPhoneMask(phone, true)
    updatePhoneNumber({ userId: userId!, phoneNumber })
  }

  const applicationSubmit = (values: IUpdateApplicationDto) => {
    updateApplication(values)
  }

  return (
    <Container
      title="Umumiy arizalar"
      extra={
        <Flex gap={10} wrap="wrap">
          <SearchInput onSearch={setSearch} />
          <SelectInput
            onChange={setStatusId}
            value={statusId}
            style={{ width: '180px' }}
            placeholder="Ariza holati"
            options={applicationStatusList}
          />
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
          <SelectInput
            style={{ width: '180px' }}
            onChange={setExamStatus}
            value={examStatus}
            placeholder="Imtihon holati"
            options={examStatusList}
          />
          <SelectInput
            style={{ width: '180px' }}
            onChange={setDegreeId}
            placeholder="Ta'lim shakli tanlang"
            value={degreeId}
            options={deegreList?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Button
            loading={isDownload}
            icon={<CloudDownload size={16} />}
            onClick={() =>
              download({
                admissionTypeId,
                examType,
                examStatus,
                specialityId,
                eduTypeId,
                languageId,
                degreeId,
                statusId
              })
            }
          >
            Excel yuklash
          </Button>
          {!isAdmin &&
            admissionTypeId !== AdmissionTypeIdEnum.TRANSFER &&
            admissionTypeId !== AdmissionTypeIdEnum.TARGET_ADMISSION && (
              <>
                <Button
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  loading={isActionPending}
                  onClick={handleRejectApplications}
                >
                  Arizani bekor qilish
                </Button>
              </>
            )}

          {!isAdmin &&
            admissionTypeId !== AdmissionTypeIdEnum.TRANSFER &&
            admissionTypeId !== AdmissionTypeIdEnum.TARGET_ADMISSION && (
              <>
                <Button
                  type="primary"
                  variant="solid"
                  color='blue'
                  icon={<CheckCircleOutlined />}
                  loading={isActionPending}
                  onClick={handleApproveApplications}
                >
                  Arizani tasdiqlash
                </Button>
              </>
            )}
          {/* 
          {admissionTypeId === AdmissionTypeIdEnum.BAKALAVR &&
            ((isAdmin && user?.universityId === 101) || isSuperAdmin) && (
              <Button type="primary" onClick={handleApprove}>
                Tavsiya
              </Button>
            )} */}
          {/* {(isAdmin || isSuperAdmin) &&
            admissionTypeId === AdmissionTypeIdEnum.BAKALAVR &&
            user?.universityId !== 101 && (
              <Button type="primary" onClick={() => navigate(paths.application_create)} icon={<PlusCircleOutlined />}>
                Ariza yaratish
              </Button>
            )} */}
        </Flex>
      }
    >
      {/* <RadioGroupComponent setAdmissionTypeId={setAdmissionTypeId} /> */}
      <PaginationTable<IGetApplicationsForCallCenterResponse>
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
            setRowId(selectedRowKeys[0] as number);
            setApplicationId(selectedRowKeys[0] as number);
          },
          getCheckboxProps: (record: IGetApplicationsForCallCenterResponse) => ({
            disabled: record.existsContract || record.status === ApplicationStatusEnum.CANCELLED
          })
        }}
      />

      <ApplicationDetailModal isOpen={isModalOpen} onCancel={hideApplicationModal} />

      {/* <Modal
        width={600}
        title={
          admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION ||
            admissionTypeId === AdmissionTypeIdEnum.SECOND_DEGREE
            ? "Arizachi ma'lumotlari"
            : "Arizachi oldingi ta'lim ma'lumotlari"
        }
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          ...(application?.data?.status === ApplicationStatusEnum.NEW
            ? [
              <Button
                key="submit"
                type="primary"
                loading={pendingApproveApplication}
                onClick={handleOk}
              >
                Подтверждение
              </Button>,
              <Button key="link" type="primary" danger onClick={onCreate}>
                Arizani bekor qilish
              </Button>
            ]
            : []),
          <Button key="back" danger onClick={handleCancel}>
            Modalni yopish
          </Button>
        ]}
      >
        {isLoading ? (
          <div className="w-full text-center py-10">
            <Spin />
          </div>
        ) : (
          <Descriptions
            bordered
            column={1}
            items={items}
            styles={{ label: { fontWeight: 'bold' }, content: { textAlign: 'end' } }}
          />
        )}
      </Modal> */}

      <CustomModal
        title="Arizani bekor qilish modali"
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
      // loading={pendingRejectApplication}
      >
        <Form form={form as FormInstance} layout="vertical" onFinish={submit}>
          <Form.Item name="message" label="Bekor qilishi" rules={[{ required: true }]}>
            <TextArea placeholder="Bekor qilish sababini kiriting" />
          </Form.Item>
        </Form>
      </CustomModal>

      <CustomModal
        title="Tavsiya etish modali"
        open={adviceModalOpen}
        onCancel={() => {
          setAdviceModalOpen(false)
          adviceForm.resetFields()
        }}
        onSubmit={adviceForm.submit}
        loading={isPending}
      >
        <Form form={adviceForm} layout="vertical" onFinish={submitAdvice}>
          <Form.Item
            name="highSchoolCertificateGrade"
            label="Shahodatnoma o'rtacha bahosi"
            rules={[
              { required: true, message: 'Bahoni kiriting!' },
              {
                validator: (_, value) => {
                  if (value > 5) {
                    return Promise.reject(new Error("Bahoning maksimal qiymati 5 bo'lishi kerak!"))
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Shahodatnoma o'rtacha bahosini kiriting"
            />
          </Form.Item>
          <SinglePdfUploadFormItem
            required={true}
            form={adviceForm}
            name="highSchoolCertificate"
            label="Shahodotnoma fayli (.pdf)"
          />
        </Form>
      </CustomModal>

      <CustomModal
        title="Telefon raqamini o'zgartirish"
        open={userId !== null}
        onCancel={closePhoneEditModal}
        onSubmit={phoneForm.submit}
        loading={isUpdatingPhoneNumber}
      >
        <Form form={phoneForm} layout="vertical" onFinish={phoneSubmit}>
          <PhoneFormItem name="phone" label="Yangi telefon raqamini kiriting" required />
        </Form>
      </CustomModal>

      <CustomModal
        title="Arizani tahrirlash"
        open={aplicationModalOpen}
        onCancel={closeApplicationEditModal}
        onSubmit={applicationForm.submit}
        loading={isUpdateApplication}
      >
        <Form form={applicationForm} layout="vertical" onFinish={applicationSubmit}>
          {admissionTypeId === AdmissionTypeIdEnum.TRANSFER && (
            <Form.Item name="eduLevelId" label="Kursi" rules={[{ required: true }]}>
              <SelectInput
                onChange={setEduLevelIdByFilter}
                value={eduLevelIdByFilter}
                allowClear={false}
                placeholder="Kursni tanlang"
                onSelect={() => {
                  applicationForm.resetFields(['languageId', 'specialityId', 'degreeId'])
                }}
                options={levelList?.map((item) => ({ value: item.id, label: item.name }))}
              />
            </Form.Item>
          )}

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
          <Form.Item name="admissionTypeId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </CustomModal>
    </Container>
  )
}
