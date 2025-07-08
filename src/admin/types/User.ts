import { RoleEnum } from './enum'

export interface User {
  id: number
  phoneNumber: string
  pinfl: string
  firstName: string
  lastName: string
  fatherName: string
  isActive: boolean
  universityId: number
  universityCode: string
  university: string
  roles: UserRole[]
  currentRole: CurrentRole
}

export interface Role {
  name: string
  id: number
}

export interface CurrentRole {
  id: number
  name: string
}

export type AuthResponse = {
  jwtToken: string
}

export type AuthParams = {
  code: string | null
  state: string | null
}

export type SignInResponse = User & {
  token: string
}

export type PassportResponse = {
  pinfl: string
  gender: string
  photo: string
  citizenship: string
  nationality: string
  birthDate: string
  lastName: string
  serialAndNumber: string
  fatherName: string
  passportExpireDate: string
  firstName: string
  givenDate: string
  country: string
  region: string
  district: string
  address: string
}

export type UserRole = {
  id: number
  name: RoleEnum
}
