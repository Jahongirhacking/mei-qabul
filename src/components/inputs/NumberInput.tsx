import { InputNumber, InputNumberProps } from 'antd'

export function NumberInput({ ...props }: InputNumberProps) {
  return <InputNumber size="large" className="w-full" controls={false} {...props} />
}
