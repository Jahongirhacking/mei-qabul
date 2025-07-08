import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  QuestionOptionDto,
  useCreateOrUpdateQuestion,
  useGetQuestion
} from '@/admin/api/services/question.service'
import { FormLoader } from '@/admin/components/FormLoader'
import { Loader } from '@/admin/components/Loader'
import { QuestionsForm } from '@/admin/components/forms/QuestionsForm'

export default function TestAddPage() {
  const navigate = useNavigate()
  const { subjectId } = useParams<{ subjectId: string }>()
  const [languageId, setLanguageId] = useState<number | null>(null)
  const { data: response, isFetching, isError, refetch } = useGetQuestion(subjectId, languageId)

  const { create, isCreating } = useCreateOrUpdateQuestion({
    onSuccess: () => {
      refetch()
      navigate(-1)
    }
  })

  const submit = ({
    questions,
    languageId
  }: {
    questions: QuestionOptionDto[]
    languageId: number | null
  }) => {
    create({ subjectId: Number(subjectId), questions: questions || [], languageId })
  }

  if (isFetching) {
    return <Loader />
  }

  if (isError || !response) {
    return <h1>Bunday ma'lumot mavjud emas</h1>
  }

  return (
    <FormLoader spinning={isCreating}>
      <QuestionsForm onFinish={submit} initialValues={response} setLanguageId={setLanguageId} />
    </FormLoader>
  )
}
