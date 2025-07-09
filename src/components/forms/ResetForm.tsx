import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

import { AuthDto, checkAccessCode, resetPassword } from "@/api/services/auth.service"
import AnimatedButton from "@/components/AnimatedButton"
import { PhoneFormItem, clearMask } from "@/components/formItems/PhoneFormItem"
import { TextInput } from "@/components/inputs/TextInput"
import { formatToPhoneMask } from "@/lib/format"
import { Form } from "antd"
import moment from "moment"
import { toast } from "sonner"

export const ResetForm = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const phoneNumber = searchParams.get("phone") || ""

  const [savedCode, setSavedCode] = useState<null | string>(null)

  const [timer, setTimer] = useState(120)

  const navigate = useNavigate()

  const onFinish = ({ phoneNumber, code, password }: AuthDto) => {
    const phone = clearMask(phoneNumber, true)

    if (savedCode) {
      resetPassword({ phoneNumber: phone, code: savedCode, password })
        .then(() => {
          toast.success("Пароль успешно изменён!")
          navigate("/login")
        })
        .catch(() => {
          toast.error("Произошла ошибка при изменении пароля!")
        })
    } else {
      checkAccessCode({ phoneNumber: phone, code })
        .then(() => {
          setSavedCode(code)
        })
        .catch(() => {
          toast.error("Код введён неверно!")
        })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const initialValues = useMemo(() => {
    return {
      phoneNumber: formatToPhoneMask(phoneNumber)
    }
  }, [phoneNumber])

  return (
    <Form initialValues={initialValues} onFinish={onFinish} layout="vertical">
      <div className="w-fit p-8 rounded-3xl bg-white max-w-96">
        <h1 className="text-university-secondary-700 text-xl mb-4 font-bold text-center">{t("universityName")}</h1>
        <p className="text-university-secondary-700 text-xl mb-2 text-center text-balance">Добро пожаловать на платформу "Qabul-{moment().year()}"!</p>
        <p className="mb-6 text-gray-500 text-center">{savedCode ? "Новый пароль" : "На ваш номер телефона отправлен SMS-код для восстановления пароля"}</p>

        <PhoneFormItem name="phoneNumber" label={t("label.phoneNumber")} />

        {savedCode ? (
          <div>
            <Form.Item name="password" label={t("label.newPassword")} rules={[{ required: true }]}>
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
                    return Promise.reject(new Error("Parollar bir xil emas!"))
                  }
                })
              ]}
            >
              <TextInput />
            </Form.Item>
          </div>
        ) : (
          <div>
            <Form.Item name="code" label="Код">
              <TextInput />
            </Form.Item>

            <div>
              <p className="text-sm text-end text-university-secondary-500 cursor-pointer">Вы можете запросить новый код {timer}c</p>
            </div>
          </div>
        )}

        <AnimatedButton type="submit" className="w-full mt-6">
          Подтверждение
        </AnimatedButton>
      </div>
    </Form>
  )
}
