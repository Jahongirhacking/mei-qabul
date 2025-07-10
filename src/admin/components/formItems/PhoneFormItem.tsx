import { PatternFormat } from 'react-number-format'

import { Form, FormItemProps, Input, InputProps } from 'antd'

const validatePhone = (_: unknown, value: string) => {
  const digits = value.replace(/\D/g, '') // Remove non-digit characters
  if (digits.length === 12) {
    return Promise.resolve()
  }
  return Promise.reject(new Error("Iltimos to'g'ri telefon raqam kiriting"))
}

const CustomInput = (props: InputProps) => {
  return <Input variant="filled" placeholder="+998 (__) ___ __ __" type="number" {...props} />
}

type PatternProps = {
  // value?: string
  // onChange?: (value: string) => void
  hidePlus?: boolean
}

const PatternInput = ({ hidePlus, ...props }: PatternProps) => {
  // const formattedValue = formatToMask(value)

  // console.log({ value, formattedValue, hidePlus, props })

  return (
    <PatternFormat<InputProps>
      format="+998 (##) ### ## ##"
      mask="_"
      customInput={CustomInput}
      // value={value}
      // onChange={(event) => onChange?.(clearMask(event.target.value, hidePlus))}
      {...props}
    />
  )
}

type PhoneFormItemProps = {
  hidePlus?: boolean
} & FormItemProps

export function PhoneFormItem({ hidePlus, ...props }: PhoneFormItemProps) {
  return (
    <Form.Item
      name="phone"
      rules={[
        { required: props.required, message: 'Telefon raqam kiriting' },
        { validator: validatePhone }
      ]}
      {...props}
    >
      <PatternInput hidePlus={hidePlus} />
    </Form.Item>
  )
}
