import { InputNumber, InputNumberProps } from 'antd'

export function NumberInput({ ...props }: InputNumberProps) {
  return <InputNumber className="w-full" variant="filled" controls={false} {...props} />
}
