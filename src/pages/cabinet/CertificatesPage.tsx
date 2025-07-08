import { useGetCertificates } from '@/api/services/certificate.service'
import { UserCertificates } from '@/components/shared/UserCertiicates'

export default function CertificatesPage() {
  const { data: certificates = [], refetch } = useGetCertificates()

  return <UserCertificates certificates={certificates} fetchCertificates={refetch} />
}
