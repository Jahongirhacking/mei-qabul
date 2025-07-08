import { httpService } from '@/api/http'
import { MutationOptions, useMutation } from '@/api/query'
import { QueryGetOption, useGet, useUpdate } from '@/api/services/crud.service'
import { errorHandler } from '@/lib/handler'
import { BaseResponse, WithId } from '@/types/IRequest'
import { ApplicationStatusEnum, ExamStatusEnum, ExamTypeEnum } from '@/types/enum'

export type Application = {
  id: number
  url: string
  degree: string
  language: string
  speciality: string
  specialityCode: string
  status: ApplicationStatusEnum
  examType: ExamTypeEnum
  examLocation: ExamLocation
  subjects: string[]
  score: number
  examComment: string
  comment: string
  examStatus: ExamStatusEnum
  admissionTypeId: number
  admissionType: string
}

export interface ExamLocation {
  location: string
  description: string
  address: string
  time?: string
  date?: string
}

interface ICreateContractDto {
  contractTemplateTypeId: number
}

export const useGetApplications = (options?: QueryGetOption<Application>) =>
  useGet<Application>('/applications', {}, options)

export const useCancelApplication = (options?: MutationOptions<number>) => {
  return useMutation({
    mutationFn: (id: number) =>
      httpService.put<BaseResponse, void>(`/application/registration-form/${id}/cancel`),
    onError: errorHandler,
    ...options
  })
}

export const useCreateContractWithContractType = (
  options: MutationOptions<WithId<ICreateContractDto>, BaseResponse<string>>
) => useUpdate<BaseResponse<string>, ICreateContractDto>('/generate-contract', options)
