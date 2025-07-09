import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import paths from "@/app/router/paths"
import { useAuthStore } from "@/app/store/authStore"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  console.log(isAuthenticated, 'user requireAuth');

  if (!isAuthenticated && !window.location.pathname.includes('admin')) {
    return <Navigate to={`${paths.login}?redirect=${pathname}`} replace />
  }

  return children
}
