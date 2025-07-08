import { Certificate } from '@/api/services/certificate.service'
import AnimatedButton from '@/components/AnimatedButton'
import CertificateCard from '@/components/cards/CertificateCard'
import { useCertificateCRUD } from '@/hooks/useCertificateCRUD'
import { Plus } from 'lucide-react'

type Props = {
  certificates: Certificate[]
  fetchCertificates: () => void
}

export function UserCertificates({ certificates, fetchCertificates }: Props) {
  const { modalContext, createCertificate, updateCertificate, deleteCertificate } =
    useCertificateCRUD({
      onCreateSuccess() {
        fetchCertificates()
      },
      onDeleteSuccess() {
        fetchCertificates()
      },
      onUpdateSuccess() {
        fetchCertificates()
      }
    })

  return (
    <div>
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mening sertifikatlarim</h1>
          <AnimatedButton onClick={createCertificate} className="p-2">
            <Plus size={18} />
            <span>Sertifikat qo'shish</span>
          </AnimatedButton>
        </div>

        <div>
          {certificates.length === 0 && (
            <div className="border-dashed border-2 border-gray-300 rounded-3xl py-7 max-w-xl mx-auto">
              <p className="text-center text-2xl text-gray-500 my-12">Sertifikatlar mavjud emas</p>
            </div>
          )}

          <div className="grid md:grid-cols-1 gap-4">
            {certificates.length > 0 &&
              certificates.map((certificate) => (
                <CertificateCard
                  onDelete={deleteCertificate}
                  onUpdate={updateCertificate}
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
          </div>
        </div>
      </div>

      <div>{modalContext}</div>
    </div>
  )
}
