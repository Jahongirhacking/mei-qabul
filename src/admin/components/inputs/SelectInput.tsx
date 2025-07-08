import { Select, SelectProps } from 'antd'

export function SelectInput(props: SelectProps) {
  return (
    <Select
      variant="filled"
      allowClear
      optionFilterProp="label"
      showSearch
      filterOption
      {...props}
    />
  )
}
