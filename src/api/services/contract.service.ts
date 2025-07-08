import { httpService } from '@/api/http'
import { MutationOptions, useMutation } from '@/api/query'
import { QueryGetOption, useGet } from '@/api/services/crud.service'
import { errorHandler } from '@/lib/handler'
import { BaseResponse } from '@/types/IRequest'
import { ContractStatusEnum } from '@/types/enum'

export type Contract = {
  id: number
  language: string
  status: ContractStatusEnum
  degreeId: number
  specialityId: number
  languageId: number
  eduType: string
  bill: string
  academicYear: string
  eduPeriod: string
  contractNumber: string
  contractSum: number
  specialityCode: string
  speciality: string
  uuId: string
  degree: string
  score: number
  eduTypeId: number
  eduLevelId: number
  contractUrl: string
  contractRegisterDate: string
  rejectMessage: string
  eduLevel: string
  academicYearId: number
  statusId: number
  contractTemplateType: string
  contractTemplateTypeId: number
}

export const useGetContracts = (options?: QueryGetOption<Contract[]>) =>
  useGet<Contract[]>('/contracts', {}, options)

export const useCancelContract = (options?: MutationOptions<number>) => {
  return useMutation({
    mutationFn: (id: number) => httpService.put<BaseResponse, void>(`/application/${id}/cancel`),
    onError: errorHandler,
    ...options
  })
}
