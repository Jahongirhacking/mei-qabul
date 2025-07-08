import { httpService } from '@/api/http'
import { MutationOptions } from '@/api/query'
import { useCreate, useGet } from '@/api/services/crud.service'
import { BaseResponse } from '@/types/IRequest'

export type Exam = {
  priority: number
  subjectId: number
  subjectName: string
  questions: Question[]
}

export type Question = {
  id: number
  question: string
  questionPhoto?: string
  options: QuestionOption[]
}

export type QuestionOption = {
  id: number
  optionText: string
  isCorrect: boolean
}

export type TestState = {
  [subjectId: string]: {
    [questionId: string]: number | undefined
  }
}

export type TestResult = {
  startTime: string
  data: TestState
}

export type TestDto = {
  startTime?: string
  data: TestState
}

export type TestCheckDto = {
  subjectId: number
  selectedOptionIds: number[]
}

export const useGetExams = () => useGet<Exam[]>('/test')

export const useCreateExam = (options: MutationOptions<void, BaseResponse>) =>
  useCreate<BaseResponse, void>('/test', options)

export const removeExam = () => httpService.delete('/test')

export const useGetExamTest = () => useGet<TestResult>('/test/temporary-test-result')

export const useCreateExamTest = (options: MutationOptions<TestDto, TestResult>) =>
  useCreate<TestResult, TestDto>('/test/temporary-test-result', options)

export const useCheckExamResult = (options: MutationOptions<TestCheckDto[], BaseResponse>) =>
  useCreate<BaseResponse, TestCheckDto[]>('/test/check', options)

export const saveExamResult = (test: TestDto) => {
  httpService.post('/test/temporary-test-result', test)
}
