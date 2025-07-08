import InputMask from 'react-input-mask'

import { Input, InputProps } from 'antd'
import FormItem, { FormItemProps } from 'antd/es/form/FormItem'

type MaskedInputProps = {
  onChange?: (value: string) => void
}

export function PINFLFormItem(props: FormItemProps) {
  return (
    <FormItem
      rules={[
        { required: true },
        {
          validator(_rule, value, callback) {
            // value is 456_______ remove underscore, length is 14 ,example 123456786745, the mask adds extra one underscore, so we need to remove it, but it will be 14
            const clearedValue = value?.replace(/_/g, '')
            const isValid = clearedValue?.length === 14

            if (!clearedValue) {
              callback('JSHSHIR kiritilmagan!')
              return
            }

            if (!isValid) {
              callback('JSHSHIR noto`g`ri kiritildi!')
              return
            }

            callback()
          },
          validateTrigger: 'onSubmit'
        }
      ]}
      {...props}
    >
      <MaskedInput />
    </FormItem>
  )
}

function MaskedInput({ onChange, ...props }: MaskedInputProps) {
  return (
    <InputMask
      mask="99999999999999"
      placeholder='12345678901234'
      onChange={(e) => {
        onChange?.(e.target.value.slice(0, 14).toUpperCase())
      }}
      {...props}
    >
      {(inputProps: InputProps) => <Input {...inputProps} size="large" />}
    </InputMask>
  )
}
