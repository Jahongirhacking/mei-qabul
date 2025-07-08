import { FormProps } from 'antd'
import { toast } from 'sonner'

export const formErrorHandler: FormProps['onFinishFailed'] = ({ errorFields }) => {
  errorFields.forEach((field) => {
    field.errors.forEach((error) => {
      toast.error(error)
    })
  })
}
