import { useNavigate } from 'react-router-dom'

import { useSignInMutation } from '@/admin/api/services/auth.service'
import { setToken } from '@/admin/api/services/storage.service'
import paths from '@/admin/app/router/paths'
import { useAuthStore } from '@/admin/app/store/authStore'
import { siteConfig } from '@/admin/config'
import { Button, ConfigProvider, Form, Input } from 'antd'
import { toast } from 'sonner'

export interface SignInInputs {
  username: string
  password: string
}

// const initialValues: SignInInputs = {
//   username: '998939717199',
//   password: '1230'
// }

export default function LoginPage() {
  const navigate = useNavigate()
  const reload = useAuthStore((state) => state.reload)

  const { mutate: signIn, isPending } = useSignInMutation({
    onSuccess: async ({ data: user }) => {
      setToken(user.token)
      const isAuthenticated = await reload()
      if (!isAuthenticated) {
        toast.error('Failed to log in.')
        return
      }
      toast.success('Successfully logged in.')
      navigate(paths.statistics)
    }
  })

  const onSubmit = (data: SignInInputs) => {
    signIn(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mt-4">{siteConfig.title}</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeBg: 'transparent',
                  colorTextPlaceholder: '#64748b'
                }
              },
              token: {
                colorText: 'white'
              }
            }}
          >
            <Form
              onFinish={onSubmit}
              className="space-y-6 text-white"
              layout="vertical"
              variant="filled"
            >
              <Form.Item<SignInInputs> label="Login" name="username" rules={[{ required: true }]}>
                <Input size="large" placeholder="Enter your login" />
              </Form.Item>
              <Form.Item<SignInInputs>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" placeholder="Enter your password" />
              </Form.Item>

              <div className="pt-12">
                <Button
                  shape="round"
                  loading={isPending}
                  className="w-full"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  Войти
                </Button>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
