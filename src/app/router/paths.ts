export default {
  // public Routes
  home: '/',
  login: '/login',
  serverError: '/server-error',
  notFound: '/not-found',
  auth: '/auth',

  // private Routes
  yearlyReport: '/yearly-report',
  monthlyReport: '/monthly-report',
  reports: '/reports',
  users: '/users',
  classifiers: '/classifiers',
  funds: '/funds',

  specialties: '/specialties',
  quotas: '/quotas',
  contracts: '/contracts',
  applications: '/applications',
  checkDocuments: '/check-documents',
  examResults: '/exam-results',
  examTests: '/exam-tests',
  tests: '/tests',
  offlineExam: '/offline-exam',
  settings: '/settings',
  about: '/about',
  admissionDates: '/admission-dates',
  edit: '/edit'
} as const
