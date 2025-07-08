import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ministry_logo_dark from '@/admin/app/assets/icons/ministry_logo_dark.png'
import paths from '@/admin/app/router/paths'
import { siteConfig } from '@/admin/config'
import { useMenu } from '@/admin/hooks/useMenu'
import { Flex, Layout, Menu } from 'antd'
import type { SelectInfo } from 'rc-menu/lib/interface'

import s from './SideNav.module.css'

interface SideNavProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

export const SideNav = React.memo(function SideNav({ collapsed, setCollapsed }: SideNavProps) {
  const menu = useMenu()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)

  const [basePath, selectedSubmenuPath, selectedSubmenuItemPath] = pathname.split('/')

  // console.log('basePath', basePath)
  // console.log('selectedSubmenuPath', selectedSubmenuPath)
  // console.log('selectedSubmenuItemPath', selectedSubmenuItemPath)

  const fullPath = [basePath, selectedSubmenuPath, selectedSubmenuItemPath]
    .filter(Boolean)
    .join('/')

  // console.log('fullPath', fullPath)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 992)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true)
    }
  }, [pathname, isMobile])

  const handleMenu = ({ key }: SelectInfo) => {
    navigate(key)
  }

  const renderMenu = () => (
    <Menu
      onSelect={handleMenu}
      mode="inline"
      inlineIndent={10}
      defaultOpenKeys={[selectedSubmenuPath]}
      selectedKeys={[
        pathname.startsWith('/contract-prices')
          ? paths.contractPrices
          : pathname.startsWith('/monthly-report')
            ? paths.users
            : pathname.startsWith('/application-create')
              ? paths.applications
              : `/${fullPath}`
      ]}
      items={menu}
    />
  )

  return (
    <Layout.Sider
      width={325}
      breakpoint="lg"
      collapsible
      onCollapse={(value) => setCollapsed(value)}
      collapsed={collapsed}
      collapsedWidth="80"
      trigger={null}
    >
      <a className={s.Logo} href="/" style={{ fontWeight: 'bold' }}>
        <Flex gap={8}>
          {collapsed ? (
            <img style={{ width: '40px' }} src={ministry_logo_dark} alt="vazirlikLogi" />
          ) : (
            siteConfig.title
          )}
        </Flex>
      </a>
      <nav className={s.SideNav}>{renderMenu()}</nav>
    </Layout.Sider>
  )
})
