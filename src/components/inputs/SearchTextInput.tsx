import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'

const { Search } = Input

export function SearchTextInput({ ...props }: SearchProps) {
  return <Search {...props} />
}
