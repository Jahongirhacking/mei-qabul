import { Input } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'

const { Search } = Input

interface SearchInputProps extends SearchProps {
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch, ...props }: SearchInputProps) => {
  const search: SearchProps['onSearch'] = (value) => {
    onSearch(value)
  }

  return (
    <Search
      style={{
        maxWidth: 220
      }}
      allowClear
      placeholder="Qidirish"
      onSearch={search}
      enterButton
      {...props}
    />
  )
}
