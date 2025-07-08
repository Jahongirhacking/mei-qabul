import { useAuthStore } from '@/admin/app/store/authStore'
import { RoleEnum } from '@/admin/types/enum'

type Response = {
  isSuperAdmin: boolean
  isAdmin: boolean
  isUserAdmin: boolean
  isVazirlikAdmin: boolean
  hasPermission: (permission: RoleEnum[]) => boolean
}

export const usePermission = (): Response => {
  const role = useAuthStore((state) => state.userRole)

  const isSuperAdmin = role === RoleEnum.SUPER_ADMIN
  const isUserAdmin = role === RoleEnum.USER
  const isAdmin = role === RoleEnum.ADMIN
  const isVazirlikAdmin = role === RoleEnum.VAZIRLIK

  const hasPermission = (permission: RoleEnum[]): boolean => {
    return permission.includes(role)
  }

  return {
    isSuperAdmin,
    isUserAdmin,
    isAdmin,
    isVazirlikAdmin,
    hasPermission
  }
}
