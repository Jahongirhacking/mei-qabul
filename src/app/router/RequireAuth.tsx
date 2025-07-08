import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import paths from "@/app/router/paths"
import { useAuthStore } from "@/app/store/authStore"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={`${paths.login}?redirect=${pathname}`} replace />
  }

  return children
}
