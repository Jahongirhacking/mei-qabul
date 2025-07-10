import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useGetApplications } from '@/api/services/application.service'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton, { AnimatedButtonProps } from '@/components/AnimatedButton'
import { Steps } from 'antd'
import { Download } from 'lucide-react'

export const AdmissionTracking = () => {
  const user = useAuthStore((state) => state.user)

  const { data: application, isLoading } = useGetApplications()

  if (isLoading) {
    return null
  }

  const isApplied: boolean = !!application

  const getCurrentStep = () => {
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
                title: <Title>{isApplied ? 'Заявление подано' : 'Заявление отсутствует'}</Title>,
                description: isApplied ? (
                  <>
                    {user?.applicantRegistrationForm && (
                      <a
                        target="_blank"
                        href={user.applicantRegistrationForm}
                        download="Регистрационный_листa.pdf"
                      >
                        <StepBtn>
                          <Download size={18} /> Регистрационный лист
                        </StepBtn>
                      </a>
                    )}
                  </>
                ) : (
                  <Link to="/admission">
                    <StepBtn>Подать заявление</StepBtn>
                  </Link>
                )
              },

              // {
              //   title: (
              //     <Title>
              //       {isHaveContract ? 'Shartnoma shakllangan' : 'Shartnoma mavjud emas'}
              //     </Title>
              //   ),
              //   description: isHaveContract ? (
              //     <a target="_blank" href={user.contractUrl} download="Shartnoma.pdf">
              //       <StepBtn>
              //         <Download size={18} /> Shartnoma
              //       </StepBtn>
              //     </a>
              //   ) : null
              // }
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
