import { httpService } from "@/api"
import { BaseResponse } from "@/types/IRequest"
import { SignInResponse, User } from "@/types/User"

export type AuthDto = {
  phoneNumber: string
  code: string
  password: string
}

export type SignUpDto = {
  pinfl: string
  serialAndNumber: string
  eduInstitutionId: number
  graduatedYear: number
  password: string
  phoneNumber: string
}

interface ISendSmsParams {
  phoneNumber?: string
  source?: string
}

export const getUser = () => httpService.get<User>("/user/info")

export const checkAccessCode = (data: Pick<AuthDto, "code" | "phoneNumber">) => httpService.post<BaseResponse<string>, Pick<AuthDto, "code" | "phoneNumber">>("/auth/check-access-code", data)

export const checkUser = (phone: string) => httpService.get<BaseResponse>("/user/check-user", { params: { phoneNumber: phone } })

export const sendSMS = (params: ISendSmsParams) => httpService.get(`/auth/access-code`, { params })

export const login = (data: Omit<AuthDto, "code">) => httpService.post<BaseResponse<SignInResponse>, Omit<AuthDto, "code">>("/auth/sign-in", data)

export const signUp = (data: Pick<SignUpDto, "phoneNumber" | "password">) => httpService.post<BaseResponse<{ token: string }>, Pick<SignUpDto, "phoneNumber" | "password">>("/auth/sign-up", data)

export const resetPassword = (data: AuthDto) => httpService.post<BaseResponse<SignInResponse>, AuthDto>("/auth/reset-password", data)
