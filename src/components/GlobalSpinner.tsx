import { Loader } from '@/components/Loader'

export function GlobalSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader />
      </div>
    </div>
  )
}
