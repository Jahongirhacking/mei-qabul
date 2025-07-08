export enum RoleEnum {
  SUPER_ADMIN = 'ROLE_SUPERADMIN',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
  VAZIRLIK = 'ROLE_VAZIRLIK'
}

export enum EduTypeIdEnum {
  BAKALAVR = 11,
  MAGISTR = 12
}

export enum AdmissionTypeIdEnum {
  BAKALAVR = 1,
  MAGISTR = 2,
  TRANSFER = 3,
  SECOND_DEGREE = 4,
  TARGET_ADMISSION = 5,
  TECHNICAL = 6
}

export enum ExamTypeEnum {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  RECOMMENDATION = 'RECOMMENDATION'
}

export enum ExamStatusEnum {
  NEW = 'NEW',
  PLANNED = 'PLANNED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum ApplicationStatusEnum {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED'
}

export enum ApplicationStatusIdEnum {
  CANCELLED = 3,
  APPROVED = 2,
  NEW = 1
}

export enum ContractStatusIdEnum {
  REQUESTED_CANCELLATION = 4,
  CANCELLED = 3,
  APPROVED = 2
}

export enum ContractStatusEnum {
  REQUESTED_CANCELLATION = 'REQUESTED_CANCELLATION',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
  NEW = 'NEW'
}
