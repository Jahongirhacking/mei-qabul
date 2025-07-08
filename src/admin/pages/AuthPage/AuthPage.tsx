import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { authenticateUser } from '@/admin/api/services/auth.service'
import { setToken } from '@/admin/api/services/storage.service'
import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { Spinner } from '@/admin/components/Spinner'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const reload = useAuthStore((state) => state.reload)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    authenticateUser({ code, state })
      .then(async (response) => {
        setToken(response.jwtToken)
        const isAuthenticated = await reload()
        if (isAuthenticated) {
          navigate(paths.statistics)
        } else {
          navigate(paths.serverError)
        }
      })
      .catch(() => {
        navigate(paths.serverError)
      })
  }, [navigate, pathname, reload, searchParams])

  return <Spinner />
}
