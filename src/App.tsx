import AntdConfigProvider from '@/app/providers/AntdConfigProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import ReactQueryProvider from '@/app/providers/ReactQueryProvider'
import { RouterProvider } from '@/app/providers/RouterProvider'
import { Toaster } from 'sonner'

const App = () => (
  <ReactQueryProvider>
    <AuthProvider>
      <AntdConfigProvider>
        <Toaster closeButton expand={true} richColors position="top-center" />
        <RouterProvider />
      </AntdConfigProvider>
    </AuthProvider>
  </ReactQueryProvider>
)

export default App
