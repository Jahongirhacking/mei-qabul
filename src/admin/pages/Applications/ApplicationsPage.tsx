import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useGetApplicationsForCallCenter,
  useGetEduDegreesList,
  useGetEduDegreesListByFilter,
  useGetEduLanguagesList,
  useGetEduLanguagesListByFilter,
  useGetEduLevelsList,
  useGetEduTypesList,
  useGetSpecialtiesList,
  useGetSpecialtiesListByFilter
} from '@/admin/api/services/common.service'
import {
  useAproveRecommendation,
  useAproveTargetApplication,
  useDownloadExcelApplications,
  useGetApplicationById,
  useRejectApplications,
  useRejectTargetApplication,
  useUpdateApplication
} from '@/admin/api/services/contracts.service'
import { uploadFile } from '@/admin/api/services/upload.service'
import { useUpdateUserPhoneNumber } from '@/admin/api/services/user.service'
import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { Container } from '@/admin/components/Container'
import { CustomModal } from '@/admin/components/CustomModal'
import RadioGroupComponent from '@/admin/components/RadiGroupComponent/RadioGroupComponent'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
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
  applicationStatusList,
  examStatusList,
  examTypeList,
  getApplicationStatusColor,
  getApplicationStatusName,
  openLink
} from '@/admin/utils/constants'
import { clearPhoneMask, formatToPhoneMask } from '@/admin/utils/format'
import { successHandler } from '@/admin/utils/lib'
import {
  Button,
  Descriptions,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Space,
  Spin,
  TableColumnsType
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { DescriptionsProps } from 'antd/lib'
import { CloudDownload, Download, Eye } from 'lucide-react'
import { toast } from 'sonner'

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
  const [examStatus, setExamStatus] = useState<string>()
  const [admissionTypeId, setAdmissionTypeId] = useState<number>()
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
  const { onCreate, isOpen, closeModal, form } = useModalCRUD<P>()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

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
  const { data: languageList } = useGetEduLanguagesList()
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

  const { data: eduTypeList } = useGetEduTypesList()
  const { isAdmin, isSuperAdmin } = usePermission()
  const confirm = useConfirm()

  const { data: application, isLoading } = useGetApplicationById(applicationId)

  const { create: rejectApplications, isCreating: isRejecting } = useRejectApplications({
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

  const { mutate: approveTargetApplication, isPending: pendingApproveApplication } =
    useAproveTargetApplication(applicationId!, {
      onSuccess: (data) => {
        successHandler(data)
        refetch()
        setIsModalOpen(false)
      }
    })

  const { mutate: rejectTargetApplication, isPending: pendingRejectApplication } =
    useRejectTargetApplication(applicationId!, {
      onSuccess: (data) => {
        successHandler(data)
        refetch()
        setIsModalOpen(false)
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

  const handleEditApplicationButton = (record: IGetApplicationsForCallCenterResponse) => {
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
      languageId: record.languageId,
      admissionTypeId: record.admissionTypeId,
      eduLevelId: record.eduLevelId
    })
  }

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
      title: 'Tili',
      dataIndex: 'language'
    },
    {
      title: 'Imtihon bali',
      dataIndex: 'score'
    },
    {
      title: 'Imtihon turi',
      dataIndex: 'examType'
    },
    {
      title: 'Shartnomasi',
      dataIndex: 'existsContract',
      render: (existsContract) => (
        <p className={existsContract ? 'confirmed' : 'rejected'}>
          {existsContract ? 'Mavjud' : 'Mavjud emas'}
        </p>
      )
    },
    {
      title: 'Qayd varaqasi',
      dataIndex: 'url',
      render: (url: string) => (
        <Button icon={<Download size={16} />}>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            Yuklash
          </a>
        </Button>
      )
    },
    {
      title: 'Javoblar varaqasi',
      dataIndex: 'answerSheetUrl',
      render: (answerSheetUrl: string) =>
        answerSheetUrl && (
          <Button icon={<Download size={16} />}>
            <a href={answerSheetUrl} download target="_blank" rel="noopener noreferrer">
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
    ...(isSuperAdmin ||
      (user?.universityId === 101 && isAdmin) ||
      (user?.universityId === 99 && isAdmin) ||
      (user?.universityId === 9 && isAdmin)
      ? [
        {
          title: 'Amallar',
          dataIndex: 'id',
          render: (_: number, record: IGetApplicationsForCallCenterResponse) => {
            return (
              <Space>
                {record.status === ApplicationStatusEnum.APPROVED && !record.existsContract && (
                  <EditIconButton onClick={() => handleEditApplicationButton(record)} />
                )}
                {(admissionTypeId === AdmissionTypeIdEnum.TRANSFER ||
                  admissionTypeId === AdmissionTypeIdEnum.SECOND_DEGREE ||
                  admissionTypeId === AdmissionTypeIdEnum.TECHNICAL ||
                  admissionTypeId === AdmissionTypeIdEnum.MAGISTR) && (
                    <Button
                      icon={<Eye size={16} />}
                      onClick={() => {
                        showModal()
                        setApplicationId(record.id)
                      }}
                    />
                  )}
              </Space>
            )
          }
        }
      ]
      : [])
  ]

  const { download, isDownload } = useDownloadExcelApplications({
    onSuccess: (data) => {
      openLink(URL.createObjectURL(data), 'Arizalar excel')
    }
  })

  const handleReject = async () => {
    const isConfirmed = await confirm({
      title: 'Belgilangan arizani bekor qilishni tasdiqlaysizmi',
      content: '',
      okText: 'Tasdiqlash',
      cancelText: 'Bekor qilish',
      okType: 'danger'
    })

    if (isConfirmed && rowId) rejectApplications([rowId])
  }

  const handleRejectApplications = () => {
    if (!rowId) {
      toast.error('Iltimos avval kimni arizasini bekor qilishni jadvaldan tanlang')
    } else {
      handleReject()
    }
  }

  const handleApprove = () => {
    if (!rowId) {
      toast.error('Iltimos avval kimni arizasini tasdiqlashni jadvaldan tanlang')
    } else {
      const elem = data?.content.find((item) => item.id === rowId)
      if (elem?.availableRecommendation) {
        setAdviceModalOpen(true)
      } else {
        toast.error("Bu yo'nalish uchun tavsiya belgilanmagan")
      }
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    approveTargetApplication()
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '0',
      label: 'F.I.O',
      children: (
        <p>
          {application?.data?.lastName +
            ' ' +
            application?.data?.firstName +
            ' ' +
            application?.data?.fatherName}
        </p>
      )
    },
    ...(admissionTypeId !== AdmissionTypeIdEnum.SECOND_DEGREE &&
      admissionTypeId !== AdmissionTypeIdEnum.TECHNICAL &&
      admissionTypeId !== AdmissionTypeIdEnum.MAGISTR
      ? [
        {
          key: '1',
          label: "Ta'lim shakli",
          children: (
            <p>
              {admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION
                ? application?.data?.degree
                : application?.data?.oldEdu?.degree}
            </p>
          )
        }
      ]
      : []),
    ...(admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION ||
      admissionTypeId === AdmissionTypeIdEnum.SECOND_DEGREE ||
      admissionTypeId === AdmissionTypeIdEnum.TECHNICAL ||
      admissionTypeId === AdmissionTypeIdEnum.MAGISTR
      ? [
        {
          key: '10',
          label:
            admissionTypeId === AdmissionTypeIdEnum.TECHNICAL ? 'Texnikum nomi' : 'Universiteti',
          children: <p>{application?.data?.oldEdu?.university}</p>
        },
        {
          key: '4',
          label: 'Bitirgan yili',
          children: <p>{application?.data?.oldEdu?.graduatedYear}</p>
        },
        {
          key: '5',
          label: 'Diplom fayli',
          children: application?.data?.oldEdu?.diploma ? (
            <Button icon={<Download size={16} />}>
              <a
                href={application?.data?.oldEdu?.diploma}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Yuklash
              </a>
            </Button>
          ) : (
            <p>Mavjud emas</p>
          )
        }
      ]
      : []),
    {
      key: '3',
      label: 'Mutaxassisligi',
      children: (
        <p>
          {admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION
            ? application?.data?.speciality
            : application?.data?.oldEdu?.speciality}
        </p>
      )
    },
    ...(admissionTypeId === AdmissionTypeIdEnum.TARGET_ADMISSION
      ? [
        {
          key: '2',
          label: 'Tili',
          children: <p>{application?.data?.language}</p>
        },

        {
          key: '6',
          label: 'Tavsiya fayli',
          children: application?.data?.oldEdu?.recommendation ? (
            <Button icon={<Download size={16} />}>
              <a
                href={application?.data?.oldEdu?.recommendation}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Yuklash
              </a>
            </Button>
          ) : (
            <p>Mavjud emas</p>
          )
        },
        {
          key: '7',
          label: 'Ish tajribasi fayli',
          children: application?.data?.oldEdu?.workExperienceReference ? (
            <Button icon={<Download size={16} />}>
              <a
                href={application?.data?.oldEdu?.workExperienceReference}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Yuklash
              </a>
            </Button>
          ) : (
            <p>Mavjud emas</p>
          )
        }
      ]
      : []),
    ...(admissionTypeId === AdmissionTypeIdEnum.TRANSFER
      ? [
        {
          key: '8',
          label: 'Kursi',
          children: <p>{application?.data?.oldEdu?.eduLevel}</p>
        },
        {
          key: '9',
          label: 'Transkript fayli',
          children: application?.data?.oldEdu?.transcript ? (
            <Button icon={<Download size={16} />}>
              <a
                href={application?.data?.oldEdu?.transcript}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Yuklash
              </a>
            </Button>
          ) : (
            <p>Mavjud emas</p>
          )
        }
      ]
      : [])
  ]

  const submit = (values: FormValues) => {
    rejectTargetApplication(values)
  }

  const submitAdvice = async (values: AdmiceFormValues) => {
    console.log(values)
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
            onChange={setExamType}
            value={examType}
            placeholder="Imtihon turi"
            options={examTypeList}
          />
          <SelectInput
            style={{ width: '180px' }}
            onChange={setExamStatus}
            value={examStatus}
            placeholder="Imtihon holati"
            options={examStatusList}
          />
          <SelectInput
            style={{ width: '175px' }}
            onChange={setEduTypeId}
            placeholder="Ta'lim turini tanlang"
            value={eduTypeId}
            options={eduTypeList?.map((item) => ({ value: item.id, label: item.name }))}
          />
          <SelectInput
            style={{ width: '125px' }}
            onChange={setLanguageId}
            placeholder="Tilni tanlang"
            value={languageId}
            options={languageList?.map((item) => ({ value: item.id, label: item.name }))}
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
                  loading={isRejecting}
                  onClick={handleRejectApplications}
                >
                  Arizani bekor qilish
                </Button>
              </>
            )}

          {admissionTypeId === AdmissionTypeIdEnum.BAKALAVR &&
            ((isAdmin && user?.universityId === 101) || isSuperAdmin) && (
              <Button type="primary" onClick={handleApprove}>
                Tavsiya
              </Button>
            )}
          {(isAdmin || isSuperAdmin) &&
            admissionTypeId === AdmissionTypeIdEnum.BAKALAVR &&
            user?.universityId !== 101 && (
              <Button type="primary" onClick={() => navigate(paths.application_create)}>
                Ariza yaratish
              </Button>
            )}
        </Flex>
      }
    >
      <RadioGroupComponent setAdmissionTypeId={setAdmissionTypeId} />
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
            setRowId(selectedRowKeys[0] as number)
          },
          getCheckboxProps: (record: IGetApplicationsForCallCenterResponse) => ({
            disabled: record.existsContract || record.status === ApplicationStatusEnum.CANCELLED
          })
        }}
      />

      <Modal
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
      </Modal>

      <CustomModal
        title="Arizani bekor qilish modali"
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
        loading={pendingRejectApplication}
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
