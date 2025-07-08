import { memo } from 'react'

import s from './Spinner.module.css'

export const Spinner = memo(() => {
  return (
    <div className={s.Spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
})
