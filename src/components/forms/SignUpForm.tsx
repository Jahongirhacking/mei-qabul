import { useNavigate, useSearchParams } from "react-router-dom"

import { SignUpDto, signUp } from "@/api/services/auth.service"
import { setToken } from "@/api/services/storage.service"
import { useAuthStore } from "@/app/store/authStore"
import AnimatedButton from "@/components/AnimatedButton"
import { TextInput } from "@/components/inputs/TextInput"
import { User } from "@/types/User"
import { Form } from "antd"
import { toast } from "sonner"

export const SignUpForm = () => {
  const [searchParams] = useSearchParams()
  const phoneNumber = searchParams.get("phoneNumber") || ""

  const setUser = useAuthStore((state) => state.setUser)

  const navigate = useNavigate()

  const onFinish = async (data: Pick<SignUpDto, "phoneNumber" | "password">) => {
    try {
      const response = await signUp({ ...data, phoneNumber })

      toast.success("Регистрация успешно завершена")
      setToken(response.data.token)
      setUser({ phoneNumber: data.phoneNumber } as User)

      navigate("/admission")
    } catch {
      toast.error("Произошла ошибка при регистрации!")
    }
  }

  return (
    <div className="mt-24 md:mt-10">
      <Form onFinish={onFinish} layout="vertical" autoComplete="off">
        <div className="w-fit p-8 rounded-3xl bg-white min-w-96">
          <h1 className="text-university-secondary-700 text-2xl mb-4 font-bold">Регистрация</h1>

          <Form.Item name="password" label="Новый пароль" rules={[{ required: true }]}>
            <TextInput />
          </Form.Item>

          <Form.Item
            name="passwordConfirm"
            label="Повторите пароль"
            dependencies={["password"]}
            rules={[
              {
                required: true
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Пароли не совпадают"))
                }
              })
            ]}
          >
            <TextInput />
          </Form.Item>

          <AnimatedButton type="submit" className="w-full">
            Подтверждение
          </AnimatedButton>
        </div>
      </Form>
    </div>
  )
}
