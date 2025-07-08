import { MutationOptions } from '@/api/query'
import { useCreate, useCustomUpdate, useGet } from '@/api/services/crud.service'
import { BaseResponse } from '@/types/IRequest'

export interface TargetAdmissionDto {
  admissionTypeId: number
  graduatedYear: number
  eduInstitutionTypeId: number
  targetAdmissionTypeId: string
  workExperienceReference: string
  recommendation: string
  diploma?: string
  eduInstitutionType: string
}

export interface BachelorAdmissionDto {
  admissionTypeId: number
  graduatedYear: number
  eduInstitutionTypeId: number
  schoolCertificate: string
}

export interface TransferAdmissionDto {
  admissionTypeId: number
  university: string
  degreeId: number
  speciality: string
  eduLevelId: number
  transcript: string
}

export interface MasterAndSecondEducationAdmissionDto {
  admissionTypeId: number
  university: string
  speciality: string
  graduatedYear: number
  diploma: string
}

export interface TechnicalAdmissionDto {
  admissionTypeId: number
  university: string
  speciality: string
  graduatedYear: number
  diploma: string
}

export interface OldEduType<T> {
  id: number
  admissionTypeId: number
  admissionType: string
  oldEdu: T
}

export const useGetOldEdu = <T>() => {
  const { data, isFetching } = useGet<BaseResponse<OldEduType<T>>>('/old-edu/')

  return {
    oldEdu: data?.data?.oldEdu,
    isOldEduLoading: isFetching
  }
}

// targeted admission
export const useCreateTargetAdmission = (
  options: MutationOptions<TargetAdmissionDto, BaseResponse>
) => useCreate<BaseResponse, TargetAdmissionDto>('/old-edu/targeted-admission', options)

export const useUpdateTargetAdmission = (
  options: MutationOptions<TargetAdmissionDto, BaseResponse>
) => useCustomUpdate<BaseResponse, TargetAdmissionDto>('/old-edu/targeted-admission', options)

// bachelor admission
export const useCreateBachelorAdmission = (
  options: MutationOptions<BachelorAdmissionDto, BaseResponse>
) => useCreate<BaseResponse, BachelorAdmissionDto>('/old-edu/bachelor', options)

export const useUpdateBachelorAdmission = (
  options: MutationOptions<BachelorAdmissionDto, BaseResponse>
) => useCustomUpdate<BaseResponse, BachelorAdmissionDto>('/old-edu/bachelor', options)

// transfer admission
export const useCreateTransferAdmission = (
  options: MutationOptions<TransferAdmissionDto, BaseResponse>
) => useCreate<BaseResponse, TransferAdmissionDto>('/old-edu/transfer', options)

export const useUpdateTransferAdmission = (
  options: MutationOptions<TransferAdmissionDto, BaseResponse>
) => useCustomUpdate<BaseResponse, TransferAdmissionDto>('/old-edu/transfer', options)

// master and second education admission
export const useCreateMasterAndSecondEduAdmission = (
  options: MutationOptions<MasterAndSecondEducationAdmissionDto, BaseResponse>
) => useCreate<BaseResponse, MasterAndSecondEducationAdmissionDto>('/old-edu/master', options)

export const useUpdateMasterAndSecondEduAdmission = (
  options: MutationOptions<MasterAndSecondEducationAdmissionDto, BaseResponse>
) => useCustomUpdate<BaseResponse, MasterAndSecondEducationAdmissionDto>('/old-edu/master', options)

// Technical admission
export const useCreateTechnicalEduAdmission = (
  options: MutationOptions<TechnicalAdmissionDto, BaseResponse>
) => useCreate<BaseResponse, TechnicalAdmissionDto>('/old-edu/technical-school', options)

export const useUpdateTechnicalEduAdmission = (
  options: MutationOptions<TechnicalAdmissionDto, BaseResponse>
) => useCustomUpdate<BaseResponse, TechnicalAdmissionDto>('/old-edu/technical-school', options)
