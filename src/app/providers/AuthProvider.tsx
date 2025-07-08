import { type PropsWithChildren, useRef } from 'react'

import { AuthStore, Provider, initializeAuthStore } from '@/app/store/authStore'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const storeReference = useRef<AuthStore>()

  if (!storeReference.current) {
    storeReference.current = initializeAuthStore()
  }

  return <Provider value={storeReference.current}>{children}</Provider>
}
