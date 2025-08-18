import { Navigate, type RouteObject } from 'react-router-dom'

import paths from '@/admin/app/router/paths'
import AdmisssionsPage from '@/admin/pages/Admissions/AdmissionsPage'
import ApplicationCreatePage from '@/admin/pages/Applications/ApplicationCreatePage'
import ApplicationsPage from '@/admin/pages/Applications/ApplicationsPage'
import AuthPage from '@/admin/pages/AuthPage/AuthPage'
import BachelorContractsPage from '@/admin/pages/Contracts/BachelorContracts/BachelorContractsPage'
import CancellationRequestsPage from '@/admin/pages/Contracts/CancellationRequests/CancellationRequestsPage'
import MasterContractsPage from '@/admin/pages/Contracts/MasterContracts/MasterContractsPage'
import SecondDegreeContractsPage from '@/admin/pages/Contracts/SecondDegreeContracts/SecondDegreeContractsPage'
import TargetedAdmissionContractsPage from '@/admin/pages/Contracts/TargetedAdmissionContracts/TargetedAdmissionContractsPage'
import TechnicalContractsPage from '@/admin/pages/Contracts/TechnicalContracts/TechnicalContractsPage'
import TransferContractsPage from '@/admin/pages/Contracts/TransferContracts/TransferContractsPage'
import CertificatesPage from '@/admin/pages/Documents/CertificatesPage'
import OflineExamsPage from '@/admin/pages/ExamsAndTests/OflineExams/OflineExamsPage'
import TestAddPage from '@/admin/pages/ExamsAndTests/Tests/TestCreateOrUpdatePage'
import TestsPage from '@/admin/pages/ExamsAndTests/Tests/TestsPage'
import LoginPage from '@/admin/pages/LoginPage/LoginPage'
import NotFoundPage from '@/admin/pages/NotFoundPage/NotFoundPage'
import OnlineApplicationsResultsPage from '@/admin/pages/OnlineApplicationsResults/OnlineApplicationsResultsPage'
import ReportApplicationsPage from '@/admin/pages/Reports/ReportApplicationsPage'
import AboutOtmPage from '@/admin/pages/Settings/AboutOtm/AboutOtmPage'
import AdmissionDeadlinesPage from '@/admin/pages/Settings/AdmissionDeadlines/AdmissionDeadlinesPage'
import ApplicantsPage from '@/admin/pages/Settings/applicants'
import ContractPricesPage from '@/admin/pages/Settings/ContractPrices/ContractPricesPage'
import DetailContractPricesPage from '@/admin/pages/Settings/ContractPrices/DetailContractPricesPage'
import ContractTemplatesPage from '@/admin/pages/Settings/ContractTemplates/ContractTemplatesPage'
import EducationPeriodPage from '@/admin/pages/Settings/EducationPeriod/EducationPeriodPage'
import LinksPage from '@/admin/pages/Settings/Links/LinksPage'
import UserEditPage from '@/admin/pages/Settings/users/UserEditPage'
import UsersAddPage from '@/admin/pages/Settings/users/UsersAddPage'
import UsersPage from '@/admin/pages/Settings/users/UsersPage'
import QuotasPage from '@/admin/pages/SpecialtyAndQuotas/Quotas/QuotasPage'
import SpecialtiesPage from '@/admin/pages/SpecialtyAndQuotas/Specialty/SpecialtiesPage'
import { SpecialtyUpdatePage } from '@/admin/pages/SpecialtyAndQuotas/Specialty/SpecialtyUpdatePage'
import StatisticsPage from '@/admin/pages/Statistics/StatisticsPage'

export const publicRoutes: RouteObject[] = [
  {
    path: paths.login,
    element: <LoginPage />
  },
  {
    path: paths.auth,
    element: <AuthPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]

export const privateRoutes: RouteObject[] = [
  {
    path: paths.home,
    element: <Navigate to={paths.login} />
  },
  {
    path: paths.home,
    element: <LoginPage />
  },

  // Admissions routes
  {
    path: paths.admissions,
    element: <AdmisssionsPage />
  },

  // Application routes
  {
    path: paths.applications,
    element: <ApplicationsPage />
  },
  {
    path: paths.application_create,
    element: <ApplicationCreatePage />
  },
  {
    path: paths.offlineExam,
    element: <OflineExamsPage />
  },
  {
    path: paths.online_applications_results,
    element: <OnlineApplicationsResultsPage />
  },

  // Contracts routes
  {
    path: paths.bachelorContracts,
    element: <BachelorContractsPage />
  },
  {
    path: paths.masterContracts,
    element: <MasterContractsPage />
  },
  {
    path: paths.secondDegreeContracts,
    element: <SecondDegreeContractsPage />
  },
  {
    path: paths.targetedContracts,
    element: <TargetedAdmissionContractsPage />
  },
  {
    path: paths.technicalContracts,
    element: <TechnicalContractsPage />
  },
  {
    path: paths.transferContracts,
    element: <TransferContractsPage />
  },
  {
    path: paths.cancellationRequests,
    element: <CancellationRequestsPage />
  },

  // Documents routes
  {
    path: paths.certificates,
    element: <CertificatesPage />
  },

  // Specialties and Quotas routes
  {
    path: paths.specialties,
    element: <SpecialtiesPage />
  },
  {
    path: paths.specialties + '/edit/:id',
    element: <SpecialtyUpdatePage />
  },
  {
    path: paths.quotas,
    element: <QuotasPage />
  },

  //  Tests routes
  {
    path: paths.tests,
    element: <TestsPage />
  },
  {
    path: paths.tests + '/add/:subjectId',
    element: <TestAddPage />
  },

  // Reports routes
  {
    path: paths.reports_applications,
    element: <ReportApplicationsPage />
  },
  {
    path: paths.statistics,
    element: <StatisticsPage />
  },

  // Settings routes
  {
    path: paths.aboutOtm,
    element: <AboutOtmPage />
  },
  {
    path: paths.admissionDeadlines,
    element: <AdmissionDeadlinesPage />
  },
  {
    path: paths.links,
    element: <LinksPage />
  },
  {
    path: paths.contractTemplates,
    element: <ContractTemplatesPage />
  },
  {
    path: paths.contractPrices,
    element: <ContractPricesPage />
  },
  {
    path: paths.contractPrices + '/:id',
    element: <DetailContractPricesPage />
  },
  {
    path: paths.contractPrices,
    element: <DetailContractPricesPage />
  },
  {
    path: paths.educationPeriod,
    element: <EducationPeriodPage />
  },
  {
    path: paths.users,
    element: <UsersPage />
  },
  {
    path: paths.applicants,
    element: <ApplicantsPage />
  },
  {
    path: paths.users + '/create',
    element: <UsersAddPage />
  },
  {
    path: paths.users + '/edit/:id',
    element: <UserEditPage />
  },
]
