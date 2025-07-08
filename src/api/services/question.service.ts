import { MutationOptions } from '@/api/query'
import { useCreate, useGet, useUpdate } from '@/api/services/crud.service'
import { BaseResponse, Pagination, PaginationOptions, QueryParam, WithId } from '@/types/IRequest'

export type Question = {
  id: number
  question: string
  options: QuestionOption[]
}

export interface QuestionOption {
  id: number
  optionText: string
  isCorrect: boolean
}

export type QuestionDto = {
  subjectId: number
  questions: Omit<Question, 'id'>[]
}

export const useGetQuestions = (options: PaginationOptions) =>
  useGet<Pagination<Question[]>, PaginationOptions>('/question', options)

export const useGetQuestion = (id: QueryParam) => useGet<Question>(`/question/${id}`)

export const useCreateQuestion = (options: MutationOptions<QuestionDto, BaseResponse>) =>
  useCreate<BaseResponse, QuestionDto>('/question', options)

export const useUpdateQuestion = (options: MutationOptions<WithId<QuestionDto>, BaseResponse>) =>
  useUpdate<BaseResponse, QuestionDto>('/question', options)
