import { PatternFormat } from 'react-number-format'

import { Form, FormItemProps, Input, InputProps } from 'antd'

const CustomInput = (props: InputProps) => {
  return <Input size="large" placeholder="+998 (__) ___ __ __" {...props} />
}

type PatternProps = {
  // value?: string
  // onChange?: (value: string) => void
  hidePlus?: boolean
  disabled?: boolean
}

const PatternInput = ({ hidePlus, disabled, ...props }: PatternProps) => {
  // const formattedValue = formatToMask(value)

  // console.log({ value, formattedValue, hidePlus, props })

  return (
    <PatternFormat<InputProps>
      format="+998 (##) ### ## ##"
      mask="_"
      customInput={CustomInput}
      disabled={disabled}
      // value={value}
      // onChange={(event) => onChange?.(clearMask(event.target.value, hidePlus))}
      {...props}
    />
  )
}

type PhoneFormItemProps = {
  hidePlus?: boolean
  disabled?: boolean
} & FormItemProps

export function PhoneFormItem({ hidePlus, disabled, ...props }: PhoneFormItemProps) {
  return (
    <Form.Item
      name="phone"
      rules={[{ required: props.required, message: 'Please input your phone number!' }]}
      {...props}
    >
      <PatternInput hidePlus={hidePlus} disabled={disabled} />
    </Form.Item>
  )
}
// TODO: complete
export function formatToMask(value?: string) {
  // console.log(value)

  if (value) {
    const digits = value.replace(/\D/g, '') // Remove non-digit characters

    console.log({ digits, value })

    if (digits.startsWith('998')) {
      const withCountryCode = `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`
      console.log({ withCountryCode })

      return withCountryCode
    } else {
      console.log({
        check: `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`
      })

      return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`
    }
  }
}

export function clearMask(value: string = '', hidePlus = false) {
  const digits = value.replace(/\D/g, '') // Remove non-digit characters
  return hidePlus ? digits : `+${digits}`
}
