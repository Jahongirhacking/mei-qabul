import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAdmissionStore } from "@/app/store/admissionStore"
import { useAuthStore } from "@/app/store/authStore"
import { AdmissionStep1 } from "@/components/AdmissionSteps/Step1"
import { AdmissionStep3 } from "@/components/AdmissionSteps/Step3"
import { AdmissionStep4 } from "@/components/AdmissionSteps/Step4"
import Container from "@/components/shared/Container"
import { Steps } from "antd"

const stepsCount = 3
const steps = Array.from({ length: stepsCount })

export default function AdmissionPage() {
  const { t } = useTranslation()
  const user = useAuthStore((state) => state.user)
  const currentStep = useAdmissionStore((state) => state.currentStep)
  const changeStepState = useAdmissionStore((state) => state.changeStepState)
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)

  const savedStep = user?.step?.currentStep
  const savedData = user?.step?.stepState

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AdmissionStep1 />
      case 2:
        return <AdmissionStep3 />
      case 3:
        return <AdmissionStep4 />
      default:
        return null
    }
  }

  useEffect(() => {
    if (savedData || savedStep) {
      setCurrentStep(savedStep || 1)
      changeStepState(savedData || {})
    }
  }, [changeStepState, savedData, savedStep, setCurrentStep])

  return (
    <Container
      header={
        <div className="hidden md:block">
          <Steps progressDot current={currentStep - 1} items={steps.map((_, index) => ({ description: t(`admission.steps.${index}`) }))} />
        </div>
      }
    >
      <div>{renderStep()}</div>
    </Container>
  )
}
