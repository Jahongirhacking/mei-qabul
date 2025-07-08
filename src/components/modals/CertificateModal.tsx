import { useState } from 'react'

import { CertificateDto } from '@/api/services/certificate.service'
import { useGetCertificateSubjects } from '@/api/services/common.service'
import { CustomModal } from '@/components/CustomModal'
import { FileFormItem } from '@/components/formItems/FileFormItem'
import { DateInput } from '@/components/inputs/DateInput'
import { SelectInput } from '@/components/inputs/SelectInput'
import { TextInput } from '@/components/inputs/TextInput'
import { ModalCRUDResponseType } from '@/hooks/useModalCRUD'
import { GeneratedFileType } from '@/lib/generators'
import { CertificateSubject, CommonType } from '@/types/Classificatory'
import { Form, ModalProps } from 'antd'

export type CertificateFormValues = Omit<CertificateDto, 'url'> & {
  url: GeneratedFileType[]
}

export type CertificateFormType = CertificateFormValues & {
  id: number
}

export type CertificateModalProps = Pick<
  ModalCRUDResponseType<CertificateFormType>,
  'form' | 'closeModal' | 'isOpen'
> &
  ModalProps & {
    onSubmit: (data: CertificateFormValues) => void
    isUpdate: boolean
  }

export function CertificateModal({
  form,
  isOpen,
  closeModal,
  isUpdate,
  onSubmit,
  ...props
}: CertificateModalProps) {
  const [certificateTypes, setCertificateTypes] = useState<CommonType[]>([])

  const { data: eduSubjects } = useGetCertificateSubjects()

  return (
    <CustomModal
      isUpdate={isUpdate}
      open={isOpen}
      onCancel={closeModal}
      onSubmit={form.submit}
      {...props}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="subjectId"
          label="Fan"
          rules={[{ required: true }]}
          getValueFromEvent={(subjectId, subject: CertificateSubject) => {
            setCertificateTypes(subject.certificateTypes)
            form.resetFields(['certificateTypeId'])
            return subjectId
          }}
        >
          <SelectInput
            placeholder="Fan"
            options={eduSubjects?.map((item) => ({
              label: item.name,
              value: item.id,
              certificateTypes: item.certificateTypes
            }))}
          />
        </Form.Item>

        <Form.Item name="certificateTypeId" label="Sertifikat turi" rules={[{ required: true }]}>
          <SelectInput
            placeholder="Sertifikat turi"
            options={certificateTypes.map((item) => ({ label: item.name, value: item.id }))}
          />
        </Form.Item>

        <Form.Item name="number" label="Sertifikat raqami" rules={[{ required: true }]}>
          <TextInput placeholder="Sertifikat raqami" />
        </Form.Item>

        <Form.Item name="score" label="Bal" rules={[{ required: true }]}>
          <TextInput placeholder="Bal" />
        </Form.Item>

        <Form.Item name="givenDate" label="Sertifikat berilgan sana" rules={[{ required: true }]}>
          <DateInput />
        </Form.Item>

        <FileFormItem name="url" label="Sertifikat fayli" rules={[{ required: true }]} />
      </Form>
    </CustomModal>
  )
}
