import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useGetApplications } from '@/api/services/application.service'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton, { AnimatedButtonProps } from '@/components/AnimatedButton'
import { ApplicationStatusEnum } from '@/types/enum'
import { Steps } from 'antd'
import { Download } from 'lucide-react'

export const TargetAdmissionTracking = () => {
  const user = useAuthStore((state) => state.user)

  const { data: application, isLoading } = useGetApplications()

  if (isLoading) {
    return null
  }

  const isApplied: boolean = !!application
  const isHaveContract: boolean = !!user?.contractUrl

  const getExamTitle = () => {
    if (!application) {
      return 'Ariza topshirilmagan'
    }

    switch (application.status) {
      case ApplicationStatusEnum.NEW:
        return "Ariza ko'rib chiqilmoqda"
      case ApplicationStatusEnum.APPROVED:
        return 'Ariza tasdiqlangan'
      case ApplicationStatusEnum.CANCELLED:
        return 'Ariza bekor qilindi'
      default:
        return ''
    }
  }

  const getCurrentStep = () => {
    if (isHaveContract) {
      return 2
    }
    if (application) {
      return 1
    }
    return 0
  }

  return (
    <div className="mt-4 gap-8 bg-white rounded-2xl p-4">
      <div className="max-w-5xl mx-auto">
        <div>
          <Steps
            progressDot
            labelPlacement="vertical"
            current={getCurrentStep()}
            items={[
              {
                title: <Title>{isApplied ? 'Ariza topshirildi' : 'Ariza mavjud emas'}</Title>,
                description: isApplied || (
                  <Link to="/admission">
                    <StepBtn>Ariza topshirish</StepBtn>
                  </Link>
                )
              },
              {
                title: <Title>{getExamTitle()}</Title>
              },
              {
                title: (
                  <Title>
                    {isHaveContract ? 'Shartnoma shakllangan' : 'Shartnoma mavjud emas'}
                  </Title>
                ),
                description: isHaveContract ? (
                  <a target="_blank" href={user.contractUrl} download="Shartnoma.pdf">
                    <StepBtn>
                      <Download size={18} /> Shartnoma
                    </StepBtn>
                  </a>
                ) : null
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return <p className="whitespace-nowrap text-center">{children}</p>
}

const StepBtn = (props: AnimatedButtonProps) => {
  return <AnimatedButton className="py-1 px-3 whitespace-nowrap" {...props} />
}
