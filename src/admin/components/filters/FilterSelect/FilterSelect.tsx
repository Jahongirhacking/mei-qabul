import { Form, type FormItemProps, Select, type SelectProps } from 'antd'

interface FilterSelectProps extends SelectProps {
  label: FormItemProps['label']
  name: FormItemProps['name']
  width: number
}

export const FilterSelect = ({ label, name, width, ...props }: FilterSelectProps) => {
  return (
    <Form.Item label={label} name={name} className="Mb">
      <Select
        allowClear
        optionFilterProp="label"
        showSearch
        filterOption={true}
        style={{ width }}
        {...props}
      />
    </Form.Item>
  )
}
