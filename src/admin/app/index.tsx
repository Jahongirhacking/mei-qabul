import { Router } from '@/admin/app/providers/RouterProvider'
import { useAuthStore } from '@/admin/app/store/authStore'
import { GlobalSpinner } from '@/admin/components/GlobalSpinner'
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/AuthProvider'

export default function App() {
  const state = useAuthStore((store) => store.state)

  if (state === 'finished') {
    return (
      <AuthProvider>
        <div className='admin-layout'>
          <Toaster closeButton richColors position="top-center" toastOptions={{ duration: 4000 }} />

          <Router />
        </div>
      </AuthProvider>
    )
  }

  return <GlobalSpinner />
}
