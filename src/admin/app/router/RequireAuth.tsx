import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  console.log(isAuthenticated, 'admin requireAuth');
  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />
  }

  return children
}
