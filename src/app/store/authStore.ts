import { createContext, useContext } from 'react'

import { getUser } from '@/api/services/auth.service'
import { clearStorage, getToken } from '@/api/services/storage.service'
import { User } from '@/types/User'
import { createStore, useStore } from 'zustand'

const isLoggedIn = () => !!getToken()

interface IAuthStore {
  isAuthenticated: boolean
  state: 'loading' | 'finished'
  user: User
  logout: () => void
  reload: () => Promise<boolean>
  setUser: (user: User) => void
  updateUser: (user: Partial<User>) => void
  isApplied: () => boolean
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
  createStore<IAuthStore>((set, get) => {
    const getUserProfile = () => {
      getUser()
        .then((user) => {
          set({
            user,
            isAuthenticated: true,
            state: 'finished'
          })
        })
        .catch(() => {
          set({
            isAuthenticated: false,
            state: 'finished'
          })
        })
    }

    if (isLoggedIn()) {
      getUserProfile()
    }

    return {
      isAuthenticated: false,
      state: isLoggedIn() ? 'loading' : 'finished',
      user: undefined as unknown as User,
      logout: () => {
        clearStorage()
        window.location.href = '/'
      },
      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          state: 'finished'
        })
      },
      updateUser: (user: Partial<User>) => {
        console.log({ user })

        set((state) => ({
          user: {
            ...state.user,
            ...user
          }
        }))
      },
      reload: async () => {
        set({
          state: 'loading'
        })

        try {
          const user = await getUser()
          set({
            user,
            isAuthenticated: true,
            state: 'finished'
          })

          return true
        } catch {
          return false
        }
      },
      isApplied() {
        const { user } = get()
        return !!user?.applicantRegistrationForm
      }
    } satisfies IAuthStore
  })
