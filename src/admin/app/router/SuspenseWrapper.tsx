import { type ReactNode, Suspense } from 'react'

import { GlobalSpinner } from '@/admin/components/GlobalSpinner'

export default function SuspenseWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<GlobalSpinner />}>{children}</Suspense>
}
