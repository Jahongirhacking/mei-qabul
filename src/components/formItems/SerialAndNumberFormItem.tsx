import InputMask from 'react-input-mask'

import { Input, InputProps } from 'antd'
import FormItem, { FormItemProps } from 'antd/es/form/FormItem'

type MaskedInputProps = {
  onChange?: (value: string) => void
}

export function SerialAndNumberFormItem(props: FormItemProps) {
  return (
    <FormItem
      rules={[
        { required: true },
        {
          validator(_rule, value, callback) {
            // value is ab_______ remove underscore, length is 9 ,example AB3541414, the mask adds extra one underscore, so we need to remove it, but it will be 9
            const clearedValue = value?.replace(/_/g, '')
            const isValid = clearedValue?.length === 9

            if (!clearedValue) {
              callback('Seriyasi va raqami kiritilmagan!')
              return
            }

            if (!isValid) {
              callback('Seriyasi va raqami noto`g`ri kiritildi!')
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
      mask="aa9999999"
      placeholder='AB1234567'
      onChange={(e) => {
        onChange?.(e.target.value.slice(0, 9).toUpperCase())
      }}
      {...props}
    >
      {(inputProps: InputProps) => <Input {...inputProps} size="large" />}
    </InputMask>
  )
}
