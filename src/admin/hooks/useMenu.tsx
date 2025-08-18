import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { RoleEnum } from '@/admin/types/enum'
import {
  ClipboardList, File, Gauge, Minus, Settings
} from 'lucide-react'

export type MenuType = {
  label: string
  key: string
  icon?: JSX.Element
  permission: RoleEnum[]
  children?: MenuType[]
}

export const useMenu = (): MenuType[] => {
  const { t } = useTranslation()
  const userRole = useAuthStore((state) => state.userRole)

  const menu: MenuType[] = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        key: paths.statistics,
        icon: <Gauge size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      },
      // {
      //   label: t('admin.menu.admissions'),
      //   key: paths.admissions,
      //   icon: <Dock size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      // },
      {
        label: t('admin.menu.applications'),
        key: paths.applications,
        icon: <ClipboardList size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
      },
      // {
      //   label: t('admin.menu.online_applications_results'),
      //   key: paths.online_applications_results,
      //   icon: <ListChecks size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      // },
      // {
      //   label: t('admin.menu.documents'),
      //   key: paths.documents,
      //   icon: <FileCheck size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
      //   children: [
      //     {
      //       label: t('admin.menu.certificates'),
      //       key: paths.certificates,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     }
      //   ]
      // },
      // {
      //   label: t('admin.menu.contracts'),
      //   key: paths.contracts,
      //   icon: <ReceiptText size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
      //   children: [
      //     {
      //       label: t('admin.menu.bachelorContracts'),
      //       key: paths.bachelorContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.masterContracts'),
      //       key: paths.masterContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.secondDegreeContracts'),
      //       key: paths.secondDegreeContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.targetedContracts'),
      //       key: paths.targetedContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.technicalContracts'),
      //       key: paths.technicalContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.transferContracts'),
      //       key: paths.transferContracts,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.cancellationRequests'),
      //       key: paths.cancellationRequests,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     }
      //   ]
      // },

      // {
      //   label: t('admin.menu.specialtiesAndQuotas'),
      //   key: paths.specialtiesAndQuotas,
      //   icon: <TableOfContents size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
      //   children: [
      //     {
      //       label: t('admin.menu.specialties'),
      //       key: paths.specialties,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     },
      //     {
      //       label: t('admin.menu.quotas'),
      //       key: paths.quotas,
      //       icon: <Minus size={18} />,
      //       permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      //     }
      //   ]
      // },
      // {
      //   label: t('admin.menu.tests'),
      //   key: paths.tests,
      //   icon: <FileText size={18} />,
      //   permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      // },
      {
        label: t('admin.menu.reports'),
        key: paths.reports,
        icon: <File size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('admin.menu.reports_applications'),
            key: paths.reports_applications,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },
      {
        label: t('admin.menu.settings'),
        key: paths.settings,
        icon: <Settings size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('admin.menu.users'),
            key: paths.users,
            icon: <Minus size={18} />,
            permission: [RoleEnum.VAZIRLIK, RoleEnum.SUPER_ADMIN]
          },
          {
            label: t('admin.menu.applicants'),
            key: paths.applicants,
            icon: <Minus size={18} />,
            permission: [RoleEnum.VAZIRLIK, RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN]
          }
        ]
      }
    ]
  }, [])

  return menu
    .filter((item) => item.permission.includes(userRole))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.permission.includes(userRole))
    }))
}
