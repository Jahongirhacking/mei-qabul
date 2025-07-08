import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { ErrorBoundaryFallback } from '@/admin/components/ErrorBoundaryFallback'
import { Loader } from '@/components/Loader'
import { Layout as AntdLayout } from 'antd'

import { Header } from '../Header'
import { SideNav } from '../SideNav'
import s from './Layout.module.css'

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <AntdLayout className={s.Layout}>
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      <AntdLayout>
        <Header toggle={toggle} collapsed={collapsed} />
        <AntdLayout.Content>
          <div className={s.Main}>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </div>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  )
}
