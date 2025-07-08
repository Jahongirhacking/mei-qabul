import { MutationOptions } from '@/admin/api/query'
import { useCreate, useGet } from '@/admin/api/services/crud.service'
import { BaseResponse, Pagination, PaginationOptions, QueryParam } from '@/admin/types/IRequest'

export type Question = {
  id: number
  question?: string
  questionPhoto?: string
  options: QuestionOption[]
}

export interface QuestionOption {
  id?: number
  optionText: string
  isCorrect: boolean
}

export type QuestionOptionDto = {
  id?: number
  question: string
  questionPhoto?: string
  options: QuestionOption[]
}

export type QuestionDto = {
  subjectId: number
  languageId: number | null
  questions: QuestionOptionDto[]
}

export const useGetQuestions = (options: PaginationOptions) =>
  useGet<Pagination<Question[]>, PaginationOptions>('/question', options)

export const useGetQuestion = (id: QueryParam, languageId?: QueryParam) =>
  useGet<QuestionOptionDto[]>(`/question/by-subject/${id}`, { languageId })

export const useCreateOrUpdateQuestion = (options: MutationOptions<QuestionDto, BaseResponse>) =>
  useCreate<BaseResponse, QuestionDto>('/question', options)
