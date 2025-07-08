import { ReactNode } from 'react'

import {
  Certificate,
  CertificateDto,
  useCreateCertificate,
  useDeleteCertificate,
  useUpdateCertificate
} from '@/api/services/certificate.service'
import {
  CertificateFormType,
  CertificateFormValues,
  CertificateModal
} from '@/components/modals/CertificateModal'
import { useModalCRUD } from '@/hooks/useModalCRUD'
import { generateFile } from '@/lib/generators'

type Props = {
  onCreateSuccess?: () => void
  onUpdateSuccess?: () => void
  onDeleteSuccess?: () => void
}

type Response = {
  isCertificateCreating: boolean
  isCertificateDeleting: boolean
  isCertificateUpdating: boolean
  deleteCertificate: (id: number) => void
  updateCertificate: (certificate: Certificate) => void
  createCertificate: () => void
  modalContext: ReactNode
}

export function useCertificateCRUD({
  onCreateSuccess,
  onDeleteSuccess,
  onUpdateSuccess
}: Props = {}): Response {
  const { onCreate, isOpen, onUpdate, closeModal, form, updateId } =
    useModalCRUD<CertificateFormType>()

  const { create, isCreating: isCertificateCreating } = useCreateCertificate({
    onSuccess: () => {
      onCreateSuccess?.()
      closeModal()
    }
  })

  const { remove: deleteCertificate, isRemoving: isCertificateDeleting } = useDeleteCertificate({
    onSuccess: onDeleteSuccess
  })

  const { update, isUpdating: isCertificateUpdating } = useUpdateCertificate({
    onSuccess: () => {
      onUpdateSuccess?.()
      closeModal()
    }
  })

  const submit = ({ url, ...rest }: CertificateFormValues) => {
    const values: CertificateDto = {
      ...rest,
      url: url[0].response!.url
    }

    if (updateId) {
      update({
        data: values,
        id: updateId
      })
    } else {
      create(values)
    }
  }

  const updateCertificate = (certificate: Certificate) => {
    onUpdate({
      certificateTypeId: certificate.certificateType.id,
      subjectId: certificate.subject.id,
      score: certificate.score,
      givenDate: certificate.givenDate,
      url: [generateFile(certificate.url)],
      id: certificate.id
    })
  }

  return {
    isCertificateCreating,
    isCertificateDeleting,
    isCertificateUpdating,
    deleteCertificate,
    updateCertificate,
    createCertificate: onCreate,
    modalContext: (
      <CertificateModal
        isOpen={isOpen}
        closeModal={closeModal}
        form={form}
        isUpdate={!!updateId}
        onSubmit={submit}
      />
    )
  }
}
