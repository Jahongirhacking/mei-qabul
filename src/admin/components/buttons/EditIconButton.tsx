import { Button, ButtonProps } from 'antd'
import { Pencil } from 'lucide-react'

export function EditIconButton(props: ButtonProps) {
  return (
    <Button type="text" {...props}>
      <Pencil size={18} />
    </Button>
  )
}
