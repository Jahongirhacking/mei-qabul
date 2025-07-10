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
