import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetCertificates } from '@/api/services/certificate.service'
import { useGetEduInstitutionTypesList } from '@/api/services/common.service'
import {
  TargetAdmissionDto,
  useCreateTargetAdmission,
  useGetOldEdu,
  useUpdateTargetAdmission
} from '@/api/services/old-edu.service'
import { GRADUATED_YEARS, TARGET_ADMISSION_TYPES } from '@/app/config'
import { useAdmissionStore } from '@/app/store/admissionStore'
import AnimatedButton from '@/components/AnimatedButton'
import { Loader } from '@/components/Loader'
import { FileFormItem } from '@/components/formItems/FileFormItem'
import { SelectInput } from '@/components/inputs/SelectInput'
import { StepButton } from '@/components/shared/StepButton'
import { UserCertificates } from '@/components/shared/UserCertiicates'
import { useSaveStepState } from '@/hooks/useSaveStepState'
import { GeneratedFileType, extractFileFromValue } from '@/lib/generators'
import { Form, Radio } from 'antd'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

interface FormValues extends Pick<TargetAdmissionDto, 'graduatedYear' | 'targetAdmissionTypeId'> {
  diploma?: GeneratedFileType[] | string
  recommendation: GeneratedFileType[] | string
  workExperienceReference: GeneratedFileType[] | string
}

export function TargetAdmissionForm() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const admissionTypeId = useAdmissionStore((state) => state.stepState.admissionTypeId)
  const [isHaveCertificate, setIsHaveCertificate] = useState(false)
  const [isTargetBachelorAdmission, setIsTargetBachelorAdmission] = useState(true)

  const { oldEdu, isOldEduLoading } = useGetOldEdu<TargetAdmissionDto>()

  const { data: certificates = [], refetch } = useGetCertificates()
  const { data: eduInstitutionTypes = [] } = useGetEduInstitutionTypesList()

  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(4)
    }
  })

  const { create, isCreating } = useCreateTargetAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const { update, isUpdating } = useUpdateTargetAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const changeStepState = useAdmissionStore((state) => state.changeStepState)
  const { eduInstitutionTypeId } = useAdmissionStore(useShallow((state) => state.stepState))

  const isCertificateRequired = isHaveCertificate && certificates.length === 0
  // const isNextDisabled = isCertificateRequired
  const isNextDisabled = !eduInstitutionTypeId || isCertificateRequired
  const isNextLoading = saveStepStateLoading || isCreating || isUpdating

  const prevStep = () => {
    setCurrentStep(2)
  }

  const nextStep = () => {
    saveStepState()
  }

  const submit = async (values: FormValues) => {
    const eduInstitutionType = eduInstitutionTypes.find((item) => item.id === eduInstitutionTypeId)!
    const dto: TargetAdmissionDto = {
      admissionTypeId: admissionTypeId!,
      eduInstitutionTypeId: eduInstitutionTypeId!,
      graduatedYear: values.graduatedYear,
      recommendation: extractFileFromValue(values.recommendation),
      workExperienceReference: extractFileFromValue(values.workExperienceReference),
      diploma: extractFileFromValue(values.diploma),
      targetAdmissionTypeId: values.targetAdmissionTypeId,
      eduInstitutionType: eduInstitutionType.name
    }

    if (oldEdu) {
      update(dto)
    } else {
      create(dto)
    }

    // changeStepState({ graduatedYear })
    // nextStep()
  }

  useEffect(() => {
    if (certificates.length) {
      setIsHaveCertificate(true)
    }
  }, [certificates])

  useEffect(() => {
    if (oldEdu) {
      const targetAdmissionType = TARGET_ADMISSION_TYPES.find((item) =>
        item.eduInstitutionTypes.includes(oldEdu.eduInstitutionTypeId)
      )!

      setIsTargetBachelorAdmission(!!targetAdmissionType?.isDiplomaFileRequired)
    }
  }, [oldEdu])

  const handleSelectInstitutionType = (eduInstitutionTypeId: number) => {
    const targetAdmissionType = TARGET_ADMISSION_TYPES.find((item) =>
      item.eduInstitutionTypes.includes(eduInstitutionTypeId)
    )!

    changeStepState({ eduInstitutionTypeId, eduLevelId: targetAdmissionType.eduLevelId })
    setIsTargetBachelorAdmission(targetAdmissionType.isDiplomaFileRequired)
    form.setFieldValue('targetAdmissionTypeId', targetAdmissionType.value)
  }

  if (isOldEduLoading) {
    return (
      <div className="flex items-center justify-center h-72 mt-12">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Form
        initialValues={oldEdu}
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={submit}
      >
        <div className="mt-6">
          <div>
            <Form.Item label={t('label.completedUniversityType')} required>
              <div className="grid md:grid-cols-2 gap-6">
                {eduInstitutionTypes
                  .filter((el) => el.availableAdmissionTypes.includes(admissionTypeId!))
                  .map((item) => (
                    <StepButton
                      onClick={() => handleSelectInstitutionType(item.id)}
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
          </div>
        </div>

        <div className="mt-4">
          <Form.Item name="targetAdmissionTypeId" label={t('label.targetAdmissionType')}>
            <SelectInput
              placeholder={t('label.targetAdmissionType')}
              options={TARGET_ADMISSION_TYPES}
              disabled={true}
            />
          </Form.Item>
          {isTargetBachelorAdmission && (
            <FileFormItem
              name="diploma"
              label={t('label.bachelorDiploma')}
              rules={[{ required: true }]}
            />
          )}
        </div>

        <div className="mt-2">
          <h2 className="text-lg mb-2 font-semibold">{t('admission.workInfo')}</h2>
          <FileFormItem
            name="workExperienceReference"
            label={t('label.workExperienceFile')}
            rules={[{ required: true }]}
          />

          <FileFormItem
            name="recommendation"
            label={t('label.recommendationFile')}
            rules={[{ required: true }]}
          />
        </div>

        <section>
          <div className="flex gap-4 items-center">
            <h2 className="text-lg">{t('label.haveCertificate')}</h2>
            <Radio.Group
              value={isHaveCertificate}
              options={[
                { label: t('action.yes'), value: true },
                { label: t('action.no'), value: false }
              ]}
              onChange={(e) => setIsHaveCertificate(e.target.value)}
            />
          </div>

          <div>
            {isHaveCertificate && (
              <div className="mt-4">
                <UserCertificates certificates={certificates} fetchCertificates={refetch} />
              </div>
            )}
          </div>
        </section>

        <div className="mt-6 flex justify-between">
          <AnimatedButton variant="secondary" onClick={prevStep}>
            <ChevronLeft size={20} /> {t('action.back')}
          </AnimatedButton>

          <AnimatedButton loading={isNextLoading} type="submit" disabled={isNextDisabled}>
            {t('action.next')} <ChevronRight size={20} />
          </AnimatedButton>
        </div>
      </Form>
    </div>
  )
}
