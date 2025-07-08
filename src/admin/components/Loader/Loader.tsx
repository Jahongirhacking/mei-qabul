import { Spinner } from '@/admin/components/Spinner'
import clsx from 'clsx'

import s from './Loader.module.css'

type Props = {
  mini?: boolean
}

export const Loader = ({ mini }: Props) => {
  return (
    <div
      className={clsx('flex', 'justify-center', 'items-center', 'h-[calc(100vh_-_72px)]', {
        [s.Mini]: !!mini
      })}
    >
      <Spinner />
    </div>
  )
}
