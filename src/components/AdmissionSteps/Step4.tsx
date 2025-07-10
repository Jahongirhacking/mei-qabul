import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useGetEduLevelsList } from '@/api/services/common.service'
import {
  ApplyDto,
  useApply,
  useGetAdmissionDegrees, useGetAdmissionSpecialties
} from '@/api/services/specialty.service'
import { useAdmissionStore } from '@/app/store/admissionStore'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton from '@/components/AnimatedButton'
import { SelectInput } from '@/components/inputs/SelectInput'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { AdmissionTypeEnum, ExamTypeEnum } from '@/types/enum'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Modal, Spin } from 'antd'
import { BookOpen, ChevronLeft, GraduationCap, PartyPopper, SendHorizontal } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

type ExamType = {
  id: ExamTypeEnum
  name: string
  icon: React.ReactNode
}

const examTypes: ExamType[] = [
  {
    id: ExamTypeEnum.ONLINE,
    name: 'Online',
    icon: <BookOpen size={20} />
  },
  {
    id: ExamTypeEnum.OFFLINE,
    name: 'Offline',
    icon: <GraduationCap size={20} />
  }
]

type FormValues = Pick<ApplyDto, 'degreeId' | 'languageId' | 'specialityId'>

// const examTypeHiddenAdmissionTypes = [
//   AdmissionTypeEnum.Target,
//   AdmissionTypeEnum.SecondEducation,
//   AdmissionTypeEnum.Technical
// ]

export function AdmissionStep4() {
  const { t } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { eduLevelId, specialtyId, examType, degreeId, languageId, admissionTypeId } =
    useAdmissionStore(useShallow((state) => state.stepState))

  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const changeStepState = useAdmissionStore((state) => state.changeStepState)
  const updateUser = useAuthStore((state) => state.updateUser)

  // const isSecondEducationAdmissionType = admissionTypeId === AdmissionTypeEnum.SecondEducation
  const isTransferAdmissionType = admissionTypeId === AdmissionTypeEnum.Transfer
  const { data: eduLevels = [] } = useGetEduLevelsList(isTransferAdmissionType)

  const getExamType = (defaultExamType: ExamTypeEnum) => {
    switch (admissionTypeId) {
      case AdmissionTypeEnum.Target:
        return ExamTypeEnum.RECOMMENDATION
      case AdmissionTypeEnum.Transfer:
        return ExamTypeEnum.OFFLINE
      case AdmissionTypeEnum.SecondEducation:
        return ExamTypeEnum.INTERVIEW
      default:
        return defaultExamType
    }
  }

  const { data: specialties } = useGetAdmissionSpecialties({ degreeId })
  const { data: degrees, isFetching: loading } = useGetAdmissionDegrees({})

  const isApplyDisabled = !degreeId || !specialtyId
  const isExamTypeHidden = true

  const { create: apply, isCreating } = useApply({
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['/user/info'] })
      updateUser({ applicantRegistrationForm: response.data, examType, step: undefined })
      setIsModalOpen(true)
    }
  })

  const submit = (values: FormValues) => {
    apply({
      ...values,
      eduLevelId: isTransferAdmissionType ? eduLevelId! + 1 : eduLevelId!,
      examType: examType!,
      admissionTypeId: admissionTypeId!
    })
  }

  const prevStep = () => {
    setCurrentStep(2)
  }

  const contractPrice = useMemo(() => {
    const selectedSpecialty = specialties?.find((item) => item.specialityId === specialtyId)
    return selectedSpecialty?.contractPrice || 0
  }, [specialties, specialtyId])

  return (
    <div>
      <Spin spinning={isCreating}>
        <div className="md:min-w-[500px]">
          <h1 className="font-semibold text-lg mb-6">{t('admission.admissionInfo')}</h1>

          <Form
            form={form}
            initialValues={{
              specialityId: specialtyId,
              degreeId,
              languageId
            }}
            autoComplete="off"
            layout="vertical"
            onFinish={submit}
          >
            <div>
              <Form.Item
                label={t('label.degree')}
                name="degreeId"
                rules={[{ required: true }]}
                getValueFromEvent={(degreeId: number) => {
                  form.setFieldsValue({
                    languageId: undefined,
                    specialityId: undefined
                  })

                  changeStepState({ degreeId })
                  return degreeId
                }}
              >
                <SelectInput
                  loading={loading}
                  options={degrees?.map((item) => ({ value: item.id, label: item.name }))}
                  placeholder={t('label.degree')}
                />
              </Form.Item>

              {/* <Form.Item
                label={t('label.language')}
                name="languageId"
                rules={[{ required: true }]}
                getValueFromEvent={(languageId: number) => {
                  changeStepState({ languageId })
                  form.setFieldsValue({
                    specialityId: undefined
                  })
                  return languageId
                }}
              >
                <SelectInput
                  loading={languagesLoading}
                  options={languages?.map((item) => ({
                    value: item.id,
                    label: item.name
                  }))}
                  placeholder={t('label.language')}
                />
              </Form.Item> */}

              <Form.Item
                label={t('label.specialty')}
                name="specialityId"
                rules={[{ required: true }]}
                getValueFromEvent={(specialtyId: number, item) => {
                  changeStepState({
                    specialtyId,
                    examType: getExamType(item.examType)
                  })

                  return specialtyId
                }}
              >
                <SelectInput
                  options={specialties?.map((item) => ({
                    value: item.specialityId,
                    label: item.speciality,
                    examType: item.examType
                  }))}
                  placeholder={t('label.specialty')}
                />
              </Form.Item>

              <div>
                {!!contractPrice && (
                  <div>
                    <span className="text-xl font-semibold">{t('label.contractPrice')}:</span>
                    <span className="ml-2 text-lg font-semibold">
                      {formatPrice(contractPrice)} {t('common.sum')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* {isSecondEducationAdmissionType && (
              <div className="mt-6 border-2 border-yellow-500 bg-yellow-100 rounded-lg p-4">
                <h2 className="text-xl font-semibold italic text-yellow-500 flex items-center gap-4">
                  <TriangleAlert /> <span>Imtihon suhbat asosida o'tkaziladi!</span>
                </h2>
              </div>
            )} */}

            {isTransferAdmissionType && (
              <div className="mt-6">
                <Form.Item label="Ko'chirayotgan ta'lim bosqichingiz">
                  <SelectInput
                    disabled
                    value={eduLevelId! + 1}
                    options={eduLevels?.map((item) => ({ value: item.id, label: item.name }))}
                  />
                </Form.Item>
              </div>
            )}

            {isExamTypeHidden || (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('label.examType')}</h2>

                <div className="grid grid-cols-2 gap-10">
                  {examTypes.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'shadow-sm p-4 flex justify-center items-center rounded-xl border-2 border-transparent bg-white',
                        {
                          'border-university-primary bg-university-primary/10': examType === item.id
                        }
                      )}
                    >
                      <div className="font-medium flex items-center gap-2">
                        <p className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                          {item.icon}
                        </p>
                        <span>{item.name}</span>
                      </div>
                    </div>
                    // <StepButton
                    //   onClick={() => changeStepState({ examType: item.id })}
                    //   selected={examType === item.id}
                    //   key={item.id}
                    //   label={item.name}
                    //   icon={item.icon}
                    //   disabled={item.id === ExamTypeEnum.ONLINE}
                    // />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <AnimatedButton variant="secondary" onClick={prevStep}>
                <ChevronLeft size={20} /> {t('action.back')}
              </AnimatedButton>

              <AnimatedButton disabled={isApplyDisabled} type="submit">
                {t('action.apply')} <SendHorizontal size={20} />
              </AnimatedButton>
            </div>
          </Form>
        </div>
      </Spin>

      <Modal
        style={{ borderRadius: 60 }}
        open={isModalOpen}
        onCancel={() => { }}
        footer={null}
        closable={false}
      >
        <div className="bg-white p-6">
          {/* Modal Content */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <PartyPopper size={40} className="text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-teal-500">Поздравляем! 🎉</h2>

            <div className="text-gray-600 text-lg mb-6">
              <p className="font-semibold mb-6">Ваше заявление принято.</p>
              <p className="text-balance">
                Чтобы скачать ваш регистрационный лист, выберите раздел {' '}
                <strong>
                  <i>{t('user.profile')}</i>
                </strong>
              </p>
            </div>

            {/* <div>
              {examType === ExamTypeEnum.ONLINE && (
                <p className="text-gray-600 text-lg mb-6">
                  <i>Online</i> testni boshlash uchun{' '}
                  <strong>
                    <i>Testni boshlash</i>
                  </strong>{' '}
                  tugmasini tanlang. Testni topshirish uchun <b>120</b> daqida vaqtingiz bor.
                </p>
              )}
            </div> */}

            <div className="flex justify-center gap-12 mt-12">
              {/* {examType === ExamTypeEnum.ONLINE && !isTransferAdmissionType && (
                <AnimatedButton loading={isCreatingExam} onClick={() => createExam()}>
                  {t('action.startTest')}
                </AnimatedButton>
              )} */}
              <Link to="/user">
                <AnimatedButton>{t('user.profile')}</AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
