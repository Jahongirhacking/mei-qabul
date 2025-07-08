import { useCallback, useState } from "react"

import {
  Exam,
  QuestionOption,
  TestCheckDto,
  TestResult,
  TestState,
  removeExam,
  saveExamResult,
  useCheckExamResult
} from "@/api/services/exam.service"
import AnimatedButton from "@/components/AnimatedButton"
import { TestTimer } from "@/components/TestTimer"
import { cn } from "@/lib/utils"
import { Form, Radio } from "antd"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

type Props = {
  exams: Exam[]
  test: TestResult
}

const saveIntervalTime = 10 * 1000 // delay in ms

export function ExamForm({ exams, test }: Props) {
  const [state, setState] = useState<TestState>(test?.data || {})
  const [isTestEnded, setIsTestEnded] = useState(false)

  const { create: finishTest, isCreating } = useCheckExamResult({
    onSuccess: () => {
      removeExam()
      toast.success("Test muvaffaqiyatli yakunlandi!")
      window.location.href = "/user/applications"
    }
  })

  const onTimeEnd = useCallback(() => {
    setIsTestEnded(true)
  }, [])

  const debounced = useDebouncedCallback((data: TestState) => {
    saveExamResult({
      data
    })
  }, saveIntervalTime)

  const submit = (values: TestState) => {
    const data: TestCheckDto[] = []

    for (const [subjectId, questions] of Object.entries(values)) {
      const dto: TestCheckDto = {
        subjectId: Number(subjectId),
        selectedOptionIds: Object.values(questions) as number[]
      }

      data.push(dto)
    }

    finishTest(data)
  }

  return (
    <div>
      <Form
        scrollToFirstError
        onFinish={submit}
        initialValues={state}
        layout="vertical"
        onValuesChange={(_, allState: TestState) => {
          setState(allState)
          debounced(allState)
        }}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-4">
          <section className="grid gap-8">
            {exams.map((exam) => (
              <div key={exam.subjectId}>
                <div>
                  <h3 className="font-bold text-2xl mb-6 text-center text-university-secondary-500">
                    {exam.subjectName}
                  </h3>
                </div>
                <div className="grid gap-4">
                  {exam.questions.map((question, index: number) => (
                    <QuestionCard
                      index={index + 1}
                      key={question.id}
                      questionId={question.id}
                      subjectId={exam.subjectId}
                      question={question.question}
                      options={question.options}
                      questionPhoto={question.questionPhoto}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="sticky top-[5vh] max-w-[360px] rounded-3xl bg-white p-4 h-fit mt-14">
            <TestTimer onTimeEnd={onTimeEnd} startTime={test.startTime} />

            <div>
              {exams.map((exam) => (
                <div key={exam.subjectId} className="mt-8">
                  <h3 className="font-semibold text-lg mb-4 text-university-secondary-500">
                    {exam.subjectName}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {exam.questions.map((item, index) => (
                      <a
                        href={`#${item.id}`}
                        key={item.id}
                        className={cn(
                          "rounded-full size-8 bg-gray-100 flex items-center justify-center",
                          {
                            "bg-university-secondary-500 text-white":
                              !!state[exam.subjectId]?.[item.id]
                          }
                        )}
                      >
                        <span>{index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <AnimatedButton
                disabled={isTestEnded}
                loading={isCreating}
                type="submit"
                className="w-full"
              >
                TESTNI YAKUNLASH
              </AnimatedButton>
            </div>
          </section>
        </div>
      </Form>
    </div>
  )
}

type QuestionCardProps = {
  question: string
  questionPhoto?: string
  options: QuestionOption[]
  index: number
  questionId: number
  subjectId: number
}

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingLeft: 8
}

function QuestionCard({
  question,
  options,
  index,
  questionId,
  subjectId,
  questionPhoto
}: QuestionCardProps) {
  return (
    <div id={questionId.toString()} className="rounded-3xl bg-white p-4">
      <Form.Item
        label={
          <div className="flex gap-1 font-semibold text-2xl">
            <div>
              <span>{index}.</span>
            </div>
            <div className="grow">
              <div>
                <span>{question}</span>
              </div>
              {questionPhoto && <img src={questionPhoto} className="max-h-36" alt="question" />}
            </div>
          </div>
        }
        name={[`${subjectId}`, `${questionId}`]}
        className="mb-0"
        rules={[{ required: true, message: "Test javobini belgilang!" }]}
      >
        <Radio.Group
          style={style}
          options={options.map((item) => ({
            label: renderOption(item.optionText),
            value: item.id
          }))}
        />
      </Form.Item>
    </div>
  )
}

function renderOption(option: string) {
  const isUrl = option.startsWith("http://") || option.startsWith("https://")

  if (isUrl) {
    return <img src={option} alt="option" className="max-h-20" />
  }

  return <span className="text-xl hover:text-blue-500">{option}</span>
}
