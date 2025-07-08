import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetCertificates } from '@/api/services/certificate.service'
import {
  TechnicalAdmissionDto,
  useCreateTechnicalEduAdmission,
  useGetOldEdu,
  useUpdateTechnicalEduAdmission
} from '@/api/services/old-edu.service'
import { GRADUATED_YEARS } from '@/app/config'
import { useAdmissionStore } from '@/app/store/admissionStore'
import AnimatedButton from '@/components/AnimatedButton'
import { Loader } from '@/components/Loader'
import { FileFormItem } from '@/components/formItems/FileFormItem'
import { SelectInput } from '@/components/inputs/SelectInput'
import { TextInput } from '@/components/inputs/TextInput'
import { UserCertificates } from '@/components/shared/UserCertiicates'
import { useSaveStepState } from '@/hooks/useSaveStepState'
import { GeneratedFileType, extractFileFromValue } from '@/lib/generators'
import { Form, Radio } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FormValues extends Omit<TechnicalAdmissionDto, 'diploma' | 'admissionTypeId'> {
  diploma?: GeneratedFileType[] | string
}

export function TechnicalForm() {
  const { t } = useTranslation()
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const admissionTypeId = useAdmissionStore((state) => state.stepState.admissionTypeId)
  const [isHaveCertificate, setIsHaveCertificate] = useState(false)

  const { oldEdu, isOldEduLoading } = useGetOldEdu<TechnicalAdmissionDto>()

  const { data: certificates = [], refetch } = useGetCertificates()

  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(4)
    }
  })

  const { create, isCreating } = useCreateTechnicalEduAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const { update, isUpdating } = useUpdateTechnicalEduAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const isCertificateRequired = isHaveCertificate && certificates.length === 0
  const isNextDisabled = isCertificateRequired
  const isNextLoading = saveStepStateLoading || isCreating || isUpdating

  const prevStep = () => {
    setCurrentStep(2)
  }

  const nextStep = () => {
    saveStepState()
  }

  const submit = (values: FormValues) => {
    const dto: TechnicalAdmissionDto = {
      ...values,
      admissionTypeId: admissionTypeId!,
      diploma: extractFileFromValue(values.diploma)
    }

    if (oldEdu) {
      update(dto)
    } else {
      create(dto)
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

  return (
    <div>
      <Form initialValues={oldEdu} autoComplete="off" layout="vertical" onFinish={submit}>
        <div className="mt-6">
          <div>
            <Form.Item label="Texnikum nomi" name="university" rules={[{ required: true }]}>
              <TextInput placeholder="Texnikum nomini kiriting" />
            </Form.Item>

            <Form.Item
              label="Bitirgan ta'lim yo'nalishi"
              name="speciality"
              rules={[{ required: true }]}
            >
              <TextInput placeholder="Bitirgan ta'lim yo'nalishini kiriting" />
            </Form.Item>

            <Form.Item name="graduatedYear" label="Bitirgan yili" rules={[{ required: true }]}>
              <SelectInput
                placeholder="Bitirgan yili"
                options={GRADUATED_YEARS.map((item) => ({ label: item, value: item }))}
              />
            </Form.Item>

            <FileFormItem
              label="Diplom va ilova fayli"
              name="diploma"
              rules={[{ required: true }]}
            />
          </div>
        </div>

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
