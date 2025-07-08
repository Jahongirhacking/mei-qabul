import { useLocation, useNavigate } from 'react-router-dom'

import { useMenu } from '@/admin/hooks/useMenu'
import { Menu, MenuProps } from 'antd'

export const SidebarMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const menu = useMenu()
  // const theme = useTheme((state) => state.theme);

  const handleSelectMenu: MenuProps['onSelect'] = ({ key: path }) => {
    navigate(path)
  }

  return (
    <Menu
      mode="inline"
      // defaultOpenKeys={[activeMenu]}
      selectedKeys={[pathname]}
      // selectedKeys={[activeSubMenu]}
      inlineIndent={12}
      items={menu}
      onSelect={handleSelectMenu}
    />
  )
}
