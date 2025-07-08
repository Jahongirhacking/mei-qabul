import { useParams, useSearchParams } from 'react-router-dom'

import { useGetSpecialty } from '@/admin/api/services/specialty.service'
import { Loader } from '@/admin/components/Loader'
import { SpecialtyForm } from '@/admin/components/forms/SpecialtyForm'

export const SpecialtyUpdatePage = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const admissionTypeId = searchParams.get('admissionTypeId')

  const { data: specialty, isFetching, isError } = useGetSpecialty(id, admissionTypeId)

  if (isFetching) {
    return <Loader mini />
  }

  if (isError || !specialty) {
    return <div>Specialty not found</div>
  }

  return <SpecialtyForm specialty={specialty.data} />
}
