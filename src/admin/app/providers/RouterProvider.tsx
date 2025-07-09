import { Route, Routes } from 'react-router-dom'

import { Layout } from '@/admin/app/layout/Layout/index'
import RequireAuth from '@/admin/app/router/RequireAuth'
import SuspenseWrapper from '@/admin/app/router/SuspenseWrapper'
import { privateRoutes, publicRoutes } from '@/admin/app/router/routes'

export function Router() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Layout />
        }
      >
        {privateRoutes.map((route) => (
          <RequireAuth>
            <Route key={route.path} path={route.path} element={route.element} />
          </RequireAuth>
        ))}
      </Route>

      {publicRoutes.map((publicRoute) => (
        <Route
          key={publicRoute.path}
          path={publicRoute.path}
          element={<SuspenseWrapper>{publicRoute.element}</SuspenseWrapper>}
        />
      ))}
    </Routes>
  )
}
