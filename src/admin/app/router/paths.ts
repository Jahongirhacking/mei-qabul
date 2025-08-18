export default {
  // public paths
  home: '/admin/',
  login: '/admin/login',
  serverError: '/admin/server-error',
  notFound: '/admin/not-found',
  auth: '/admin/auth',

  // private route paths
  reports: '/admin/reports',
  reports_applications: '/admin/reports-applications',
  statistics: '/admin/statistics',

  // admissions
  admissions: '/admin/admissions',

  // applications
  applications: '/admin/applications',
  application_create: '/admin/application-create',
  online_applications_results: '/admin/online-applications-results',

  // contracts
  contracts: '/admin/contracts',
  bachelorContracts: '/admin/bachelor-contracts',
  masterContracts: '/admin/master-contracts',
  secondDegreeContracts: '/admin/second-degree-contracts',
  targetedContracts: '/admin/targeted-contracts',
  technicalContracts: '/admin/technical-contracts',
  transferContracts: '/admin/transfer-contracts',
  cancellationRequests: '/admin/cancellation-requests',

  // documents
  documents: '/admin/documents',
  certificates: '/admin/certificates',

  // specialty and quotas
  specialtiesAndQuotas: '/admin/specialties-and-quotas',
  specialties: '/admin/specialties',
  quotas: '/admin/quotas',

  // exams and tests
  examTests: '/admin/exam-tests',
  tests: '/admin/tests',
  offlineExam: '/admin/offline-exam',

  // settings
  settings: '/admin/settings',
  aboutOtm: '/admin/about-otm',
  admissionDeadlines: '/admin/admission-deadlines',
  links: '/admin/links',
  contractTemplates: '/admin/contract-templates',
  contractPrices: '/admin/contract-prices',
  educationPeriod: '/admin/education-period',
  users: '/admin/users',
  applicants: '/admin/applicants'
} as const
