import { createContext, useContext } from 'react'

import { getUser } from '@/admin/api/services/auth.service'
import { clearStorage, getToken, setSavedRole } from '@/admin/api/services/storage.service'
import { User } from '@/admin/types/User'
import { RoleEnum } from '@/admin/types/enum'
import { createStore, useStore } from 'zustand'

const isLoggedIn = () => !!getToken()

interface IAuthStore {
  isAuthenticated: boolean
  state: 'loading' | 'finished'
  user: User
  userRole: RoleEnum
  logout: () => void
  reload: () => Promise<boolean>
  changeRole: (role: number) => void
}

export type AuthStore = ReturnType<typeof initializeAuthStore>

const AuthContext = createContext<AuthStore | null>(null)

export const Provider = AuthContext.Provider

export const useAuthStore = <T>(selector: (state: IAuthStore) => T) => {
  const store = useContext(AuthContext)

  if (!store) throw new Error('AuthStore is missing the provider')

  return useStore(store, selector)
}

export const initializeAuthStore = () =>
  createStore<IAuthStore>((set) => {
    const getUserProfile = () => {
      getUser()
        .then((user) => {
          const userRole = user.currentRole.name as RoleEnum
          setSavedRole(user.currentRole.name)
          set({
            user,
            userRole,
            isAuthenticated: true,
            state: 'finished'
          })
        })
        .catch(() => {
          clearStorage()
          set({
            isAuthenticated: false,
            state: 'finished'
          })
        })
    }

    if (isLoggedIn()) {
      if (window.location.pathname.includes('admin')) {
        getUserProfile()
      }
    }

    return {
      isAuthenticated: false,
      state: isLoggedIn() ? 'loading' : 'finished',
      user: undefined as unknown as User,
      userRole: undefined as unknown as RoleEnum,
      logout: () => {
        set({
          state: 'loading'
        })

        new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
          clearStorage()
          window.location.href = '/admin/login'
          set({
            isAuthenticated: false,
            state: 'finished',
            user: undefined
          })
        })
      },
      reload: async () => {
        try {
          const user = await getUser()
          const userRole = user.currentRole.name as RoleEnum
          setSavedRole(userRole)
          set({
            user,
            userRole,
            isAuthenticated: true,
            state: 'finished'
          })

          return true
        } catch {
          return false
        }
      },
      changeRole: (roleId: number) => {
        set((state) => {
          return {
            userRole: state.user.roles.find((role) => role.id === roleId)?.name
          }
        })
      }
    } satisfies IAuthStore
  })
