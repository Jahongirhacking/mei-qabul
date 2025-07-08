import { Spinner } from '@/admin/components/Spinner'
import { Spin, type SpinProps } from 'antd'

export const FormLoader = ({ children, ...props }: SpinProps) => {
  return (
    <Spin
      indicator={
        <div>
          <Spinner />
        </div>
      }
      {...props}
    >
      {children}
    </Spin>
  )
}
