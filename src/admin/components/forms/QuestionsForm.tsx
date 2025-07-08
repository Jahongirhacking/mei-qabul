import { useSearchParams } from 'react-router-dom'

import { useGetEduLanguagesList } from '@/admin/api/services/common.service'
import { QuestionOptionDto } from '@/admin/api/services/question.service'
import { Container } from '@/admin/components/Container'
import { QuestionInput } from '@/admin/components/inputs/QuestionInput'
import { QuestionVariantInput } from '@/admin/components/inputs/QuestionVariantInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { TextInput } from '@/admin/components/inputs/TextInput'
import { Button, Checkbox, Divider, Form, FormProps } from 'antd'
import { Plus, SaveIcon, Trash2 } from 'lucide-react'

const newQuestion = {
  question: '',
  options: [
    {
      optionText: '',
      isCorrect: true
    },
    {
      optionText: '',
      isCorrect: false
    },
    {
      optionText: '',
      isCorrect: false
    },
    {
      optionText: '',
      isCorrect: false
    }
  ]
}

type Props = {
  initialValues: QuestionOptionDto[]
  setLanguageId: (id: number | null) => void
} & FormProps

const defaultOption = {
  label: 'Barchasi',
  value: null
}

export const QuestionsForm = ({ initialValues, setLanguageId, ...props }: Props) => {
  const [form] = Form.useForm<{ questions: QuestionOptionDto[] }>()
  const { data: languages = [] } = useGetEduLanguagesList()

  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')

  return (
    <Form initialValues={{ questions: initialValues, languageId: null }} form={form} {...props}>
      <Container hasGoBack title={`Test qo'shish yoki tahrirlash (${name})`}>
        <Form.Item
          label="Test tili"
          name="languageId"
          getValueFromEvent={(value) => {
            setLanguageId(value)
            return value
          }}
        >
          <SelectInput
            options={[
              defaultOption,
              ...languages.map((item) => ({ label: item.name, value: item.id }))
            ]}
          />
        </Form.Item>
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <div>
              <section className="grid grid-cols-2 gap-4 mb-8">
                <Button
                  onClick={() => {
                    add()
                    // need to set form value to show variants
                    const formQuestions = form.getFieldValue('questions')
                    formQuestions[formQuestions.length - 1] = newQuestion
                  }}
                  type="primary"
                >
                  <Plus size={18} />
                  Savol qo'shish
                </Button>
                <Button htmlType="submit" className="bg-green-500" type="primary">
                  <SaveIcon size={18} />
                  Saqlash
                </Button>
              </section>

              <section className="flex flex-col gap-4 overflow-auto h-[calc(100vh_-_245px)]">
                {fields.map((field, index) => {
                  return (
                    <div
                      key={field.key}
                      className="border border-gray-200 bg-neutral-50 rounded-xl p-4"
                    >
                      <section>
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">Savol №{index + 1}</h3>
                          <Button
                            type="primary"
                            danger
                            icon={<Trash2 size={20} />}
                            onClick={() => remove(field.name)}
                          />
                        </div>
                        <div className=" my-4">
                          <Form.Item label="Savol" name={[field.name, 'question']}>
                            <TextInput placeholder="Savolni kiriting" />
                          </Form.Item>
                          <Form.Item label="Savol (Rasm)" name={[field.name, 'questionPhoto']}>
                            <QuestionInput />
                          </Form.Item>
                        </div>
                      </section>

                      <Divider />

                      <section>
                        <Form.List name={[field.name, 'options']}>
                          {(options) => (
                            <div className="flex flex-col gap-4">
                              {options.map((option, order) => (
                                <div key={option.key} className="flex gap-4">
                                  <Form.Item
                                    label={`Variant ${order + 1}`}
                                    name={[option.name, 'isCorrect']}
                                    valuePropName="checked"
                                    className="mb-0"
                                    getValueFromEvent={() => {
                                      // only one option can be checked, when checked, need to uncheck other options
                                      const changedQuestionOptions: QuestionOptionDto['options'] =
                                        form.getFieldValue(['questions', field.name, 'options'])
                                      const newOptions = changedQuestionOptions.map(
                                        (item, index) => ({
                                          ...item,
                                          isCorrect: index === option.name
                                        })
                                      )
                                      form.setFieldValue(
                                        ['questions', field.name, 'options'],
                                        newOptions
                                      )

                                      return true // return true not to uncheck already checked option
                                    }}
                                  >
                                    <Checkbox />
                                  </Form.Item>
                                  <Form.Item
                                    name={[option.name, 'optionText']}
                                    className="grow mb-0"
                                  >
                                    <QuestionVariantInput />
                                  </Form.Item>
                                </div>
                              ))}
                            </div>
                          )}
                        </Form.List>
                      </section>
                    </div>
                  )
                })}
              </section>
            </div>
          )}
        </Form.List>
      </Container>
    </Form>
  )
}
