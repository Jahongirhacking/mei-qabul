import { FileInput } from '@/admin/components/inputs/FileInput'
import FormItem, { FormItemProps } from 'antd/es/form/FormItem'

export function FileFormItem(props: FormItemProps) {
  return (
    <FormItem valuePropName="fileList" getValueFromEvent={({ fileList }) => fileList} {...props}>
      <FileInput />
    </FormItem>
  )
}
