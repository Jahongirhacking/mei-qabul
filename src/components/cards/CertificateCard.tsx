import { Certificate } from '@/api/services/certificate.service'
import { InfoItem } from '@/components/cards/UserInfoCard'
import { Pencil, Trash } from 'lucide-react'

type Props = {
  certificate: Certificate
  onUpdate: (certificate: Certificate) => void
  onDelete: (id: number) => void
}

export default function CertificateCard({ certificate, onUpdate, onDelete }: Props) {
  const items = [
    {
      label: 'Fan',
      value: certificate.subject.name
    },
    {
      label: 'Sertifikat turi',
      value: certificate.certificateType.name
    },
    {
      label: 'Bal',
      value: certificate.score
    },
    {
      label: 'Berilgan sanasi',
      value: certificate.givenDate
    },
    {
      label: 'Yuklash',
      value: (
        <a href={certificate.url} target="_blank" className="text-blue-800 hover:text-blue-500">
          Yuklash
        </a>
      )
    }
  ]

  return (
    <div className="rounded-3xl bg-university-green">
      <div className="flex justify-center items-center p-8 border-b border-gray-400">
        <h1>
          Sertifikat - <b>{certificate.number}</b>
        </h1>

        <div className="flex gap-2 ml-auto">
          <button onClick={() => onUpdate(certificate)}>
            <Pencil color="blue" size={20} />
          </button>
          <button onClick={() => onDelete(certificate.id)}>
            <Trash color="red" size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3 p-8">
        {items.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
