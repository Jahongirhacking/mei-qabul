export enum RoleEnum {
  SUPER_ADMIN = 'ROLE_SUPERADMIN',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

export enum ExamTypeEnum {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  RECOMMENDATION = 'RECOMMENDATION',
  INTERVIEW = 'INTERVIEW'
}

export enum ApplicationStatusEnum {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED'
}

export enum ExamStatusEnum {
  NEW = 'NEW',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS'
}

export enum AdmissionTypeEnum {
  Bachelor = 1,
  Magistracy = 2,
  Transfer = 3,
  SecondEducation = 4,
  Target = 5,
  Technical = 6
}

export enum ContractStatusEnum {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  REQUESTED_CANCELLATION = 'REQUESTED_CANCELLATION'
}
