import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { RoleEnum } from '@/admin/types/enum'
import {
  ClipboardList,
  Dock,
  File,
  FileCheck,
  FileText,
  Gauge,
  ListChecks,
  Minus,
  ReceiptText,
  Settings,
  TableOfContents
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
      {
        label: t('menu.admissions'),
        key: paths.admissions,
        icon: <Dock size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      },
      {
        label: t('menu.applications'),
        key: paths.applications,
        icon: <ClipboardList size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('menu.all_applications'),
            key: paths.applications,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.offlineExam'),
            key: paths.offlineExam,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },
      {
        label: t('menu.online_applications_results'),
        key: paths.online_applications_results,
        icon: <ListChecks size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      },
      {
        label: t('menu.documents'),
        key: paths.documents,
        icon: <FileCheck size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('menu.certificates'),
            key: paths.certificates,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },
      {
        label: t('menu.contracts'),
        key: paths.contracts,
        icon: <ReceiptText size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('menu.bachelorContracts'),
            key: paths.bachelorContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.masterContracts'),
            key: paths.masterContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.secondDegreeContracts'),
            key: paths.secondDegreeContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.targetedContracts'),
            key: paths.targetedContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.technicalContracts'),
            key: paths.technicalContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.transferContracts'),
            key: paths.transferContracts,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.cancellationRequests'),
            key: paths.cancellationRequests,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },

      {
        label: t('menu.specialtiesAndQuotas'),
        key: paths.specialtiesAndQuotas,
        icon: <TableOfContents size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('menu.specialties'),
            key: paths.specialties,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          },
          {
            label: t('menu.quotas'),
            key: paths.quotas,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },
      {
        label: t('menu.tests'),
        key: paths.tests,
        icon: <FileText size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
      },
      {
        label: t('menu.reports'),
        key: paths.reports,
        icon: <File size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN],
        children: [
          {
            label: t('menu.reports_applications'),
            key: paths.reports_applications,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK, RoleEnum.ADMIN]
          }
        ]
      },
      {
        label: t('menu.settings'),
        key: paths.settings,
        icon: <Settings size={18} />,
        permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK],
        children: [
          {
            label: t('menu.about'),
            key: paths.aboutOtm,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.admissionDates'),
            key: paths.admissionDeadlines,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.links'),
            key: paths.links,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.contractTemplates'),
            key: paths.contractTemplates,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.contractPrices'),
            key: paths.contractPrices,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.educationPeriod'),
            key: paths.educationPeriod,
            icon: <Minus size={18} />,
            permission: [RoleEnum.SUPER_ADMIN, RoleEnum.VAZIRLIK]
          },
          {
            label: t('menu.users'),
            key: paths.users,
            icon: <Minus size={18} />,
            permission: [RoleEnum.VAZIRLIK, RoleEnum.SUPER_ADMIN]
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
