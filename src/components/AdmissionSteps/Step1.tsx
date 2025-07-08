import { useState } from "react"
import { useTranslation } from "react-i18next"

import { SignUpDto } from "@/api/services/auth.service"
import { UserPersonalInfo, getUserPersonalInfo, useSaveUserPersonalInfo } from "@/api/services/user.service"
import { useAdmissionStore } from "@/app/store/admissionStore"
import { useAuthStore } from "@/app/store/authStore"
import AnimatedButton from "@/components/AnimatedButton"
import { UserInfoCard } from "@/components/cards/UserInfoCard"
import { PINFLFormItem } from "@/components/formItems/PINFLFormItem"
import { SerialAndNumberFormItem } from "@/components/formItems/SerialAndNumberFormItem"
import { useSaveStepState } from "@/hooks/useSaveStepState"
import { BaseResponse } from "@/types/IRequest"
import { User } from "@/types/User"
import { Form } from "antd"
import { AxiosError } from "axios"
import { ChevronRight, Search } from "lucide-react"
import { toast } from "sonner"

export function AdmissionStep1() {
  const { t } = useTranslation()
  const authUser = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(2)
    }
  })

  const [foundUser, setFoundUser] = useState<UserPersonalInfo>()

  const isSavedUser = !!authUser?.pinfl || !!authUser?.serialAndNumber
  const user = isSavedUser ? authUser : foundUser

  const { isCreating: saveUserPersonalInfoLoading, create: saveUserPersonalInfo } = useSaveUserPersonalInfo({
    onSuccess() {
      setUser(user as User)
      saveStepState()
    }
  })

  const items = [
    {
      label: t("label.fio"),
      value: `${user?.lastName} ${user?.firstName} ${user?.fatherName}`
    },
    {
      label: t("label.pinfl"),
      value: user?.pinfl
    },
    {
      label: t("label.serialAndNumber"),
      value: user?.serialAndNumber
    },
    {
      label: t("label.birthDate"),
      value: user?.birthDate
    }
  ]

  const nextStep = () => {
    if (!isSavedUser) {
      saveUserPersonalInfo(user as User)
    } else {
      saveStepState()
    }
  }

  const submit = (values: Pick<SignUpDto, "pinfl" | "serialAndNumber">) => {
    getUserPersonalInfo(values)
      .then((response) => {
        setFoundUser(response.data)
      })
      .catch((error: AxiosError<BaseResponse>) => {
        toast.error(error.response?.data?.message)
      })
  }

  return (
    <div className="md:min-w-[500px]">
      <h1 className="font-semibold text-lg mb-6">{t("admission.personalInfo")}</h1>

      <Form disabled={isSavedUser} autoComplete="off" onFinish={submit} layout="vertical">
        {isSavedUser || (
          <>
            <section>
              <PINFLFormItem name="pinfl" label={t("label.pinfl")} />
              <SerialAndNumberFormItem name="serialAndNumber" label={t("label.serialAndNumber")} />
            </section>

            <div className="mt-4 mb-4 flex items-center justify-end">
              <AnimatedButton variant="secondary" type="submit" className="bg-transparent text-blue-500 text-lg font-semibold py-1 px-6 border-none ">
                <Search size={20} /> {t("action.search")}
              </AnimatedButton>
            </div>
          </>
        )}

        {!!user && (
          <section>
            <UserInfoCard items={items} />
          </section>
        )}

        <div className="mt-6 flex items-center justify-end">
          <AnimatedButton loading={saveUserPersonalInfoLoading || saveStepStateLoading} disabled={!user} type="button" onClick={nextStep}>
            {t("action.next")} <ChevronRight size={20} />
          </AnimatedButton>
        </div>
      </Form>
    </div>
  )
}
