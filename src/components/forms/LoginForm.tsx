import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { AuthDto, checkAccessCode, checkUser, login, sendSMS } from "@/api/services/auth.service"
import { setToken } from "@/api/services/storage.service"
import { getMe } from "@/api/services/user.service"
import { useAuthStore } from "@/app/store/authStore"
import AnimatedButton from "@/components/AnimatedButton"
import { PhoneFormItem, clearMask } from "@/components/formItems/PhoneFormItem"
import { TextInput } from "@/components/inputs/TextInput"
import { BaseResponse } from "@/types/IRequest"
import { Checkbox, Flex, Form, Input } from "antd"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const LoginForm = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm<AuthDto>()
  const source = localStorage.getItem("source") || undefined
  const [isAuthorizedBefore, setIsAuthorizedBefore] = useState<null | boolean>(null)
  const [isCodeSent, setIsCodeSent] = useState(false)

  const setUser = useAuthStore((state) => state.setUser)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [timer, setTimer] = useState(120)

  const navigate = useNavigate()

  const onFinish = ({ phoneNumber, code, password }: AuthDto) => {
    const phone = clearMask(phoneNumber, true)

    if (isAuthorizedBefore === null) {
      checkUser(phone)
        .then(() => {
          setIsAuthorizedBefore(true)
        })
        .catch((error: AxiosError<BaseResponse>) => {
          if (error.status === 404) {
            sendSMS({ phoneNumber: phone, source })
              .then(() => {
                setIsCodeSent(true)

                const interval = setInterval(() => {
                  console.log({ timer })

                  setTimer((prev) => prev - 1)
                }, 1000)

                intervalRef.current = interval
              })
              .catch((error: AxiosError<BaseResponse>) => {
                toast.error(error.response?.data?.message)
              })
            setIsAuthorizedBefore(false)
          } else {
            toast.error(error.response?.data?.message)
          }
        })

      return
    }

    if (isAuthorizedBefore) {
      login({ phoneNumber: phone, password })
        .then(async ({ data }) => {
          setToken(data.token)

          const user = await getMe()

          setUser(user)

          const isApplied = !!user?.applicantRegistrationForm

          const path = isApplied ? "/user/applications" : "/admission"

          toast.success("Вы успешно вошли!")

          navigate(path)
        })
        .catch(() => {
          toast.error("Пароль введён неверно!")
        })
    } else {
      checkAccessCode({ phoneNumber: phone, code })
        .then(() => navigate(`/sign-up?phoneNumber=${phone}`))
        .catch(() => {
          toast.error("Код введён неверно!")
        })
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        console.log("clear interval login form")
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const forgotPassword = () => {
    const phoneNumber = form.getFieldValue("phoneNumber")
    const phone = clearMask(phoneNumber, true)
    sendSMS({ phoneNumber: phone, source })
    navigate("/forgot-password?phone=" + phone)
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="login-form">
      <div className="w-fit p-8 rounded-3xl bg-white max-w-96">
        <h1 className="text-university-secondary-700 text-xl mb-4 font-bold text-center">{t("universityName")}</h1>
        <p className="text-university-secondary-700 text-xl mb-2 text-center text-balance">Добро пожаловать на платформу "Qabul-2025"!</p>
        <p className="mb-6 text-gray-500 text-center">Пожалуйста, войдите в систему или зарегистрируйтесь.</p>

        <PhoneFormItem name="phoneNumber" label="Номер телефона" />

        {isAuthorizedBefore !== null &&
          (isAuthorizedBefore ? (
            <div>
              <Form.Item name="password" label="Пароль">
                <Input.Password />
              </Form.Item>
              <div className="flex justify-end">
                <button onClick={forgotPassword} type="button" className="text-sm text-end text-university-secondary-500 hover:bg-blue-200 rounded-sm px-1">
                  Забыли пароль?
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Form.Item name="code" label="Код">
                <TextInput />
              </Form.Item>

              {isCodeSent && (
                <div>
                  {timer > 0 ? (
                    <p className="text-sm text-end text-university-secondary-500 cursor-pointer">Вы можете запросить новый код {timer}c</p>
                  ) : (
                    <p className="text-sm text-end text-university-secondary-500 cursor-pointer">Отправить код повторно</p>
                  )}
                </div>
              )}
            </div>
          ))}


        <Flex gap={8}>
          <Checkbox checked={!!isAuthorizedBefore} onChange={e => setIsAuthorizedBefore(e.target.checked || null)} />
          <span>У меня есть пароль</span>
        </Flex>

        <AnimatedButton type="submit" className="w-full mt-6">
          Подтверждение
        </AnimatedButton>
      </div>
    </Form>
  )
}
