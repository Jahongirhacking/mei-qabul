import { Form, Input } from 'antd'

export const FilterInputId = () => {
  return (
    <Form.Item label="ID" name="id" className="Mb">
      <Input allowClear placeholder="ID" />
    </Form.Item>
  )
}
