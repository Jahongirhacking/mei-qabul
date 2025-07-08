import { Input, InputProps } from 'antd'

export function TextInput({ ...props }: InputProps) {
  return <Input variant="filled" {...props} />
}
