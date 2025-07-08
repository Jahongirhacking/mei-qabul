import { useState } from 'react'

import { QuestionOptionDto } from '@/admin/api/services/question.service'
import { Container } from '@/admin/components/Container'
import { Button, Checkbox, Flex, Form, FormProps } from 'antd'
import { Check, Plus, SaveIcon, Trash2, X } from 'lucide-react'

import { TextInput } from '../inputs/TextInput'

const NewQuestion: QuestionOptionDto = {
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
} & FormProps

export const TestForm = ({ initialValues, ...props }: Props) => {
  const [form] = Form.useForm()
  const [questions, setQuestions] = useState<QuestionOptionDto[]>(initialValues)

  const addNew = () => {
    setQuestions([...questions, NewQuestion])
  }

  const handleRemove = (index: number) => {
    const formState: QuestionOptionDto[] = form.getFieldValue('data')
    const newFormState = formState.filter((_, i) => i !== index)
    form.setFieldValue('data', newFormState)
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Form form={form} {...props}>
        <Container hasGoBack title={props.title}>
          <Flex vertical gap={10}>
            {questions?.map(({ question, options }, index) => (
              <div key={index} className="border border-gray-200 shadow-lg rounded-xl p-4 relative">
                <Form.Item
                  label="Savol nomi"
                  initialValue={question}
                  rules={[{ required: true, message: 'Kiriting' }]}
                  name={['data', index, 'question']}
                >
                  <TextInput />
                </Form.Item>

                <div className="px-24">
                  {options?.map((option, order) => (
                    <div key={order}>
                      <Form.Item
                        initialValue={option.optionText}
                        rules={[{ required: true, message: 'Kiriting' }]}
                        label={
                          <p className="flex items-center gap-2">
                            Javob {order + 1}
                            {option.isCorrect ? (
                              <Check size={18} color="green" />
                            ) : (
                              <X size={18} color="red" />
                            )}
                          </p>
                        }
                        name={['data', index, 'options', order, 'optionText']}
                      >
                        <TextInput />
                      </Form.Item>
                      <Form.Item
                        initialValue={option.isCorrect}
                        hidden
                        name={['data', index, 'options', order, 'isCorrect']}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </div>
                  ))}
                </div>

                <Button
                  className="absolute bottom-4 right-4"
                  danger
                  type="primary"
                  onClick={() => handleRemove(index)}
                  icon={<Trash2 size={16} />}
                />
              </div>
            ))}
            <Flex gap={10} className="w-full ">
              <Button onClick={addNew} type="primary" className="flex-1">
                <Plus size={18} />
                Yana savol qo'shish
              </Button>
              <Button htmlType="submit" className="save-green-button" type="primary">
                <SaveIcon size={18} />
                Saqlash
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Form>
    </div>
  )
}
