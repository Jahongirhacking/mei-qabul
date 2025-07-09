import AntdConfigProvider from '@/app/providers/AntdConfigProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import ReactQueryProvider from '@/app/providers/ReactQueryProvider'
import { RouterProvider } from '@/app/providers/RouterProvider'
import { Toaster } from 'sonner'
import { AuthProvider as AuthAdminProvider } from './admin/app/providers/AuthProvider'

const App = () => (
  <ReactQueryProvider>
    <AuthProvider>
      <AuthAdminProvider>
        <AntdConfigProvider>
          <Toaster closeButton expand={true} richColors position="top-center" />
          <RouterProvider />
        </AntdConfigProvider>
      </AuthAdminProvider>
    </AuthProvider>
  </ReactQueryProvider>
)

export default App
