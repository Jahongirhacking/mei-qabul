import { MutationOptions, httpService, useMutation } from '@/admin/api'
import { SignInInputs } from '@/admin/pages/LoginPage/LoginPage'
import { BaseResponse } from '@/admin/types/IRequest'
import { AuthParams, AuthResponse, SignInResponse, User } from '@/admin/types/User'

export const useSignInMutation = (
  props: MutationOptions<SignInInputs, BaseResponse<SignInResponse>>
) => {
  return useMutation({
    mutationFn: (data: SignInInputs) =>
      httpService.post<BaseResponse<SignInResponse>, SignInInputs>('/auth/sign-in', data),
    ...props
  })
}

export const getUser = () => httpService.get<User>('/admin/info')

export const authenticateUser = (params: AuthParams) =>
  httpService.get<AuthResponse>('/public/authAdmin/', {
    params
  })
