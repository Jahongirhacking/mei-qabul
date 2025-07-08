export interface PaginationOptions {
  page: number
  size: number
}

interface BasePagination {
  pageable: {
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
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
