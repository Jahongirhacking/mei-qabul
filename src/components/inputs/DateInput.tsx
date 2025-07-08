import { DatePicker, type DatePickerProps } from 'antd'
import dayjs from 'dayjs'

const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY'
const SERVER_DATE_FORMAT = 'YYYY-MM-DD'

export type Props = {
  onChange?: (_value: string | string[]) => void
  value?: DatePickerProps['value']
  dateFormat?: string
  serverDateFormat?: string
} & DatePickerProps

export const dateFormatter = (
  value?: Props['value'],
  serverDateFormat?: Props['serverDateFormat']
) => {
  if (value) {
    return dayjs(value, serverDateFormat)
  }
}

export function DateInput({
  value,
  onChange,
  dateFormat = DEFAULT_DATE_FORMAT,
  serverDateFormat = SERVER_DATE_FORMAT,
  ...props
}: Props) {
  return (
    <DatePicker
      size="large"
      style={{ width: '100%' }}
      format={{
        format: dateFormat,
        type: 'mask'
      }}
      placeholder={dateFormat}
      value={dateFormatter(value, dateFormat)}
      onChange={(_date: dayjs.Dayjs, dateString: string | string[]) => onChange!(dateString)}
      {...props}
    />
  )
}
