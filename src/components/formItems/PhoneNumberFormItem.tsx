// import InputMask from 'react-input-mask'
import { format } from '@react-input/mask'
import { Input, InputProps } from 'antd'

const options = {
  mask: '+998 (__) ___-__-__',
  replacement: { _: /\d/ },
  showMask: true
}

export function PhoneNumberFormItem() {
  return <CustomInput />
}

function CustomInput(props: InputProps) {
  // const ref = useMask(options)
  const defaultValue = format('99893971199', options)
  console.log({ props, defaultValue })

  return <Input size="large" defaultValue={defaultValue} placeholder={options.mask} />
}
