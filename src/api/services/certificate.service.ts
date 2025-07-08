import { MutationOptions } from '@/api/query'
import { useCreate, useDelete, useGet, useUpdate } from '@/api/services/crud.service'
import { CommonType } from '@/types/Classificatory'
import { BaseResponse, QueryParam, WithId } from '@/types/IRequest'

export type Certificate = {
  id: number
  url: string
  score: string
  givenDate: string
  certificateType: CommonType
  subject: CommonType
  number: string
}

export type CertificateDto = Pick<Certificate, 'url' | 'givenDate' | 'score'> & {
  certificateTypeId: number
  subjectId: number
}

export const useGetCertificates = () => useGet<Certificate[]>('/certificate')

export const useGetCertificateById = (id: QueryParam) => useGet<Certificate>(`/certificate/${id}`)

export const useCreateCertificate = (
  options: MutationOptions<CertificateDto, BaseResponse<void>>
) => useCreate<BaseResponse<void>, CertificateDto>('/certificate', options)

export const useUpdateCertificate = (options: MutationOptions<WithId<CertificateDto>, void>) =>
  useUpdate<void, CertificateDto>('/certificate', options)

export const useDeleteCertificate = (options: MutationOptions<number>) =>
  useDelete<BaseResponse, number>('/certificate', options)
