import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HOST } from '@/api/http'
import { useGetApplications } from '@/api/services/application.service'
import { useGetCertificates } from '@/api/services/certificate.service'
import { useGetEduInstitutionTypesList } from '@/api/services/common.service'
import {
  BachelorAdmissionDto,
  useCreateBachelorAdmission,
  useGetOldEdu,
  useUpdateBachelorAdmission
} from '@/api/services/old-edu.service'
import { GRADUATED_YEARS } from '@/app/config'
import { useAdmissionStore } from '@/app/store/admissionStore'
import AnimatedButton from '@/components/AnimatedButton'
import { Loader } from '@/components/Loader'
import { SelectInput } from '@/components/inputs/SelectInput'
import { StepButton } from '@/components/shared/StepButton'
import { UserCertificates } from '@/components/shared/UserCertiicates'
import { useSaveStepState } from '@/hooks/useSaveStepState'
import { ApplicationStatusEnum } from '@/types/enum'
import { Button, Flex, Form, message, Upload } from 'antd'
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, UploadCloud } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

export function BachelorForm({ isEdit = false }: { isEdit?: boolean }) {
  const { t } = useTranslation()
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const admissionTypeId = useAdmissionStore((state) => state.stepState.admissionTypeId)
  const [isHaveCertificate, setIsHaveCertificate] = useState(false)
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: applicationData } = useGetApplications();

  const { oldEdu, isOldEduLoading } = useGetOldEdu<BachelorAdmissionDto>()

  const { data: certificates = [], refetch } = useGetCertificates()
  const { data: eduInstitutionTypes = [] } = useGetEduInstitutionTypesList()

  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(3)
    }
  })

  const { create, isCreating } = useCreateBachelorAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const { update, isUpdating } = useUpdateBachelorAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const changeStepState = useAdmissionStore((state) => state.changeStepState)
  const { eduInstitutionTypeId, schoolCertificate } = useAdmissionStore(useShallow((state) => state.stepState))

  const isCertificateRequired = isHaveCertificate && certificates.length === 0
  const isNextDisabled = !eduInstitutionTypeId || isCertificateRequired || !schoolCertificate
  const isNextLoading = saveStepStateLoading || isCreating || isUpdating

  const prevStep = () => {
    setCurrentStep(1)
  }

  const nextStep = () => {
    saveStepState()
  }

  const submit = ({ graduatedYear }: Pick<BachelorAdmissionDto, 'graduatedYear'>) => {
    const dto: BachelorAdmissionDto = {
      admissionTypeId: admissionTypeId!,
      eduInstitutionTypeId: eduInstitutionTypeId!,
      graduatedYear,
      schoolCertificate: schoolCertificate || ''
    }

    if (oldEdu) {
      update(dto)
    } else {
      create(dto)
    }

    if (isEdit) {
      navigate('/user');
    }
  }

  useEffect(() => {
    if (certificates.length) {
      setIsHaveCertificate(true)
    }
  }, [certificates])

  if (isOldEduLoading) {
    return (
      <div className="flex items-center justify-center h-72 mt-12">
        <Loader />
      </div>
    )
  }

  if (applicationData && applicationData?.status === ApplicationStatusEnum.APPROVED) return <Navigate to={"/user"} replace />

  return (
    <div>
      <Form initialValues={oldEdu} autoComplete="off" layout="vertical" onFinish={submit} form={form}>
        <div className="mt-6">
          <div>
            <Form.Item label={t('label.completedUniversityType')} required>
              <div className="grid md:grid-cols-2 gap-6">
                {eduInstitutionTypes
                  .filter((el) => el.availableAdmissionTypes?.includes(admissionTypeId!))
                  .map((item) => (
                    <StepButton
                      onClick={() => changeStepState({ eduInstitutionTypeId: item.id })}
                      selected={eduInstitutionTypeId === item.id}
                      key={item.id}
                      label={item.name}
                      icon={<BookOpen size={20} />}
                    />
                  ))}
              </div>
            </Form.Item>

            <Form.Item
              name="graduatedYear"
              label={t('label.graduatedYear')}
              rules={[{ required: true }]}
            >
              <SelectInput
                placeholder={t('label.graduatedYear')}
                options={GRADUATED_YEARS.map((item) => ({ label: item, value: item }))}
              />
            </Form.Item>

            <Form.Item
              required
              name="schoolCertificate"
              label={"Диплом об окончании учебного заведения"}
            >
              <Upload
                name={'file'}
                action={`${HOST}/file/upload`}
                headers={{
                  authorization: 'authorization-text',
                }}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    message.success(`Файл успешно загружен`);
                    changeStepState({ schoolCertificate: info?.file?.response?.url })
                  } else if (info.file.status === 'error') {
                    message.error(`Ошибка при загрузке файла`);
                  }
                }}
              >
                <Button icon={<UploadCloud />}> Загрузить документ</Button>
              </Upload>
              {
                schoolCertificate && (
                  <Flex className='my-2' gap={8}>
                    <CheckCircle2 color='green' />
                    <a href={schoolCertificate} target='_blank'>{schoolCertificate}</a>
                  </Flex>
                )
              }
            </Form.Item>
          </div>
        </div>

        <div>
          {isHaveCertificate && (
            <div className="mt-4">
              <UserCertificates certificates={certificates} fetchCertificates={refetch} />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          {
            !isEdit && (
              <AnimatedButton variant="secondary" onClick={prevStep}>
                <ChevronLeft size={20} /> {t('action.back')}
              </AnimatedButton>
            )
          }

          <AnimatedButton loading={isNextLoading} type="submit" disabled={isNextDisabled}>
            {t('action.next')} <ChevronRight size={20} />
          </AnimatedButton>

        </div>
      </Form>
    </div>
  )
}
