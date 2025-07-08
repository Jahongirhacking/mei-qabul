import React from 'react'

import { HOST } from '@/api/http'
import clsx from 'clsx'

export function Image({ src, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) {
    return (
      <div className="size-full flex-shrink-0 rounded-md border border-gray-200 bg-gray-100"></div>
    )
  }

  return (
    <div className="size-full flex-shrink-0 rounded-md border border-gray-200 bg-gray-100">
      <img
        src={`${HOST + src}`}
        className={clsx('size-full object-contain', className)}
        {...props}
      />
    </div>
  )
}
