export interface PaginationOptions {
  page: number
  size: number
}

interface BasePagination {
  page: {
    totalElements: number
    size: number
    number: number
    totalPages: number
  }
}

export interface Pagination<T> extends BasePagination {
  content: T
}

export type FileType = {
  id?: number
  url: string
  isMain?: boolean
  fileName: string
}

export interface IMessage<T = null> {
  message: string
  errorMessage: string
  status: boolean
  object: T
}

export type QueryParam = string | null | undefined | number

export type WithId<T> = {
  data: T
  id: number | QueryParam
}

export type BaseError = {
  message: string
}

export type BaseResponse<T = unknown> = {
  statusCode: number
  message: string
  timeStamp: string
  data: T
}
