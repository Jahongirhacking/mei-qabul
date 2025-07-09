import { AdmiceFormValues } from '@/admin/pages/Applications/ApplicationsPage'
import {
  GenerateContractDto,
  IApproveOrRejectCanecellationRequestDto,
  IContract,
  ICreateApplicationDto,
  IDownloadExcelApplicationForCallCenterOptions,
  IDownloadExcelCanceledApplicationsOptions,
  IDownloadExcelContractsOptions,
  IDownloadExcelExamsApplicationsOptions,
  IDownloadExcelOnlineApplicationsResultsOptions,
  IDownloadExcelSertificatesOptions,
  IGetApplicationByIdResponse,
  IGetApplicationsOptions,
  IGetApplicationsResponse,
  IGetCancellationRequestsOptions,
  IGetContractPricesByUniversityResponse,
  IGetContractPricesOptionsByUniversity,
  IGetContractPricesResponse,
  IGetContractTemplatesOptions,
  IGetContractsOptions,
  IGetContractsResponse,
  IGetOnlineApplicationsOptions,
  IGetOnlineApplicationsResultsResponse,
  IGetRejectedApplicationsOptions,
  IUpdateApplicationDto,
  IUpdateContractDto,
  PlannedExamDto
} from '@/admin/types/Contracts'
import { BaseResponse, Pagination, PaginationOptions } from '@/admin/types/IRequest'
import { errorHandler } from '@/admin/utils/lib'

import { httpService } from '../http'
import { MutationOptions, useMutation } from '../query'
import { useCreate, useDownloadExcel, useGet } from './crud.service'

// Constant templates api
export const useGetContractTemplates = (options: IGetContractTemplatesOptions) =>
  useGet<Pagination<IContract[]>, PaginationOptions>('/contract-template', options)

export const useSynchronizeContractTemplates = (
  options: MutationOptions<void, BaseResponse<void>>
) => useCreate<BaseResponse<void>, void>('/contract-template/synchronize', options)

// Constant prices api
export const useGetContractPrices = () =>
  useGet<IGetContractPricesResponse[]>('/contract-price/contract-detail')

export const useSynchronizeContractPrices = (options: MutationOptions<void, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, void>('/contract-price/synchronize', options)

export const useGetContractPricesByUniversity = (options: IGetContractPricesOptionsByUniversity) =>
  useGet<IGetContractPricesByUniversityResponse[], IGetContractPricesOptionsByUniversity>(
    '/contract-price/by-university',
    options
  )

//Contracts api
export const useGetContracts = (options: IGetContractsOptions) =>
  useGet<Pagination<IGetContractsResponse[]>, IGetContractsOptions>('/admin/applications', options)

export const useGetApplications = (options: IGetApplicationsOptions) =>
  useGet<Pagination<IGetApplicationsResponse[]>, IGetApplicationsOptions>(
    '/admin/applications',
    options
  )

export const useGetRejectedApplications = (options: IGetRejectedApplicationsOptions) =>
  useGet<Pagination<IGetApplicationsResponse[]>, IGetRejectedApplicationsOptions>(
    '/admin/applicant/registration-forms/cancelled',
    options
  )

export const usePlannedExam = (options: MutationOptions<PlannedExamDto, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, PlannedExamDto>('/admin/registration-form/plan-exam', options)

export const useUpdateEnContractPrices = (options: MutationOptions<unknown, BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, unknown>('/contract-price', options)

export const useRejectApplications = (options: MutationOptions<number[], BaseResponse<void>>) =>
  useCreate<BaseResponse<void>, number[]>('/admin/application/reject', options)

export const useCancelContract = (options: MutationOptions<number[], BaseResponse<void>>) => {
  return useMutation({
    mutationFn: (body: number[]) =>
      httpService.put<BaseResponse<void>, number[]>(`/admin/contract/cancel`, body),
    onError: errorHandler,
    ...options
  })
}

export const useGenerateContract = (
  options: MutationOptions<GenerateContractDto, BaseResponse<string>>
) => useCreate<BaseResponse<string>, GenerateContractDto>('/admin/contract', options)

export const useRejectContract = (
  options: MutationOptions<GenerateContractDto, BaseResponse<string>>
) => useCreate<BaseResponse<string>, GenerateContractDto>('/admin/application/cancel', options)

export const useDownloadExcelCanceledApplications = (
  options: MutationOptions<IDownloadExcelCanceledApplicationsOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelCanceledApplicationsOptions>(
    '/admin/application/cancelled/excel',
    options
  )

export const useDownloadExcelExamsApplications = (
  options: MutationOptions<IDownloadExcelExamsApplicationsOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelExamsApplicationsOptions>(
    '/admin/application/excel',
    options
  )

export const useDownloadExcelSertificates = (
  options: MutationOptions<IDownloadExcelSertificatesOptions, Blob>
) => useDownloadExcel<Blob, IDownloadExcelSertificatesOptions>('/admin/certificate/excel', options)

export const useDownloadExcelContracts = (
  options: MutationOptions<IDownloadExcelContractsOptions, Blob>
) => useDownloadExcel<Blob, IDownloadExcelContractsOptions>('/admin/contract/excel', options)

export const useDownloadExcelCancellationRequests = (
  options: MutationOptions<IDownloadExcelContractsOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelContractsOptions>(
    '/admin/request-cancellation/contracts/excel',
    options
  )

export const useGetCancellationRequests = (options: IGetCancellationRequestsOptions) =>
  useGet<Pagination<IGetContractsResponse[]>, IGetCancellationRequestsOptions>(
    '/admin/request-cancellation/contracts',
    options
  )

export const useApproveOrRejectCanecellationRequest = (
  options: MutationOptions<IApproveOrRejectCanecellationRequestDto, BaseResponse<void>>
) =>
  useCreate<BaseResponse<void>, IApproveOrRejectCanecellationRequestDto>(
    '/admin/request-cancellation/contract/approve',
    options
  )

export const useDownloadExcelApplications = (
  options: MutationOptions<IDownloadExcelApplicationForCallCenterOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelApplicationForCallCenterOptions>(
    '/call-center/applications/excel',
    options
  )

export const useGetOnlineApplicationsresults = (options: IGetOnlineApplicationsOptions) =>
  useGet<Pagination<IGetOnlineApplicationsResultsResponse[]>, IGetOnlineApplicationsOptions>(
    '/admin/application/online-exam',
    options
  )

export const useDownloadExcelOnlineApplicationsresults = (
  options: MutationOptions<IDownloadExcelOnlineApplicationsResultsOptions, Blob>
) =>
  useDownloadExcel<Blob, IDownloadExcelOnlineApplicationsResultsOptions>(
    '/admin/application/online-exam/excel',
    options
  )

export const useAproveRecommendation = (
  id: number,
  options: MutationOptions<AdmiceFormValues, BaseResponse<void>>
) => {
  return useMutation({
    mutationFn: (body: AdmiceFormValues) =>
      httpService.put<BaseResponse<void>, AdmiceFormValues>(
        `/admin/application/${id}/approve/recommendation`,
        body
      ),
    onError: errorHandler,
    ...options
  })
}

export const useAproveTargetApplication = (
  id: number,
  options: MutationOptions<void, BaseResponse<void>>
) => {
  return useMutation({
    mutationFn: () => httpService.put<BaseResponse<void>, void>(`/admin/application/${id}/approve`),
    onError: errorHandler,
    ...options
  })
}

export const useRejectTargetApplication = (
  id: number,
  options: MutationOptions<{ message: string }, BaseResponse<void>>
) => {
  return useMutation({
    mutationFn: (body: { message: string }) =>
      httpService.put<BaseResponse<void>, { message: string }>(
        `/admin/application/${id}/reject`,
        body
      ),
    onError: errorHandler,
    ...options
  })
}

export const useGetApplicationById = (id: number | undefined) =>
  useGet<BaseResponse<IGetApplicationByIdResponse>>(`/admin/application/${id}`, undefined, {
    enabled: !!id
  })

export const useUpdateApplication = (
  id: number,
  options: MutationOptions<IUpdateApplicationDto, BaseResponse<void>>
) => {
  return useMutation({
    mutationFn: (body: IUpdateApplicationDto) =>
      httpService.put<BaseResponse<void>, IUpdateApplicationDto>(
        `/admin/application/${id}/update`,
        body
      ),
    onError: errorHandler,
    ...options
  })
}

export const useUpdateContract = (
  id: number,
  options: MutationOptions<IUpdateContractDto, BaseResponse<void>>
) => {
  return useMutation({
    mutationFn: (body: IUpdateContractDto) =>
      httpService.put<BaseResponse<void>, IUpdateContractDto>(
        `/admin/application-and-contract/${id}`,
        body
      ),
    onError: errorHandler,
    ...options
  })
}

export const useCreateApplications = (
  options: MutationOptions<ICreateApplicationDto, BaseResponse<void>>
) => useCreate<BaseResponse<void>, ICreateApplicationDto>('/admin/application', options)
