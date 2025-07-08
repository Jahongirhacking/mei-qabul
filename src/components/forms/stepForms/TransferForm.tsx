import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetCertificates } from '@/api/services/certificate.service'
import { useGetEduDegreesList, useGetEduLevelsList } from '@/api/services/common.service'
import {
  TransferAdmissionDto,
  useCreateTransferAdmission,
  useGetOldEdu,
  useUpdateTransferAdmission
} from '@/api/services/old-edu.service'
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

interface FormValues extends Omit<TransferAdmissionDto, 'transcript' | 'admissionTypeId'> {
  transcript?: GeneratedFileType[] | string
}

export function TransferForm() {
  const { t } = useTranslation()
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const admissionTypeId = useAdmissionStore((state) => state.stepState.admissionTypeId)
  const [isHaveCertificate, setIsHaveCertificate] = useState(false)
  const changeStepState = useAdmissionStore((state) => state.changeStepState)

  const { oldEdu, isOldEduLoading } = useGetOldEdu<TransferAdmissionDto>()

  const { data: certificates = [], refetch } = useGetCertificates()
  const { data: eduDegrees } = useGetEduDegreesList()
  const { data: eduLevels } = useGetEduLevelsList()
  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(4)
    }
  })

  const { create, isCreating } = useCreateTransferAdmission({
    onSuccess() {
      nextStep()
    }
  })

  const { update, isUpdating } = useUpdateTransferAdmission({
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
    const dto: TransferAdmissionDto = {
      admissionTypeId: admissionTypeId!,
      ...values,
      transcript: extractFileFromValue(values.transcript)
    }

    changeStepState({ eduLevelId: values.eduLevelId })

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
          <div className="mt-6">
            <Form.Item
              label="Oliy ta'lim muassasa nomi"
              name="university"
              rules={[{ required: true }]}
            >
              <TextInput placeholder="Oliy ta'lim muassasa nomini kiriting" />
            </Form.Item>

            <Form.Item
              label="Tahsil olayotgan ta’lim shakli"
              name="degreeId"
              rules={[{ required: true }]}
            >
              <SelectInput
                options={eduDegrees?.map((item) => ({ value: item.id, label: item.name }))}
                placeholder="Ta’lim shaklini tanlang"
              />
            </Form.Item>

            <Form.Item
              label="Tahsil olayotgan ta'lim yo'nalishi"
              name="speciality"
              rules={[{ required: true }]}
            >
              <TextInput placeholder="Ta'lim yo'nalishini kiriting" />
            </Form.Item>

            <Form.Item
              name="eduLevelId"
              label="Hozirgi o'qiyotgan ta'lim bosqichingiz"
              rules={[{ required: true }]}
            >
              <SelectInput
                placeholder="Ta'lim bosqichini tanlang"
                options={eduLevels?.map((item) => ({ value: item.id, label: item.name }))}
              />
            </Form.Item>

            <FileFormItem
              label="Transkript yoki akademik ma'lumotnoma"
              name="transcript"
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
