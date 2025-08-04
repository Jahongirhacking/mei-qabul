import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useGetApplications } from '@/api/services/application.service'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton, { AnimatedButtonProps } from '@/components/AnimatedButton'
import { ApplicationStatusEnum } from '@/types/enum'
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Skeleton, Steps, Tag } from 'antd'
import { Download } from 'lucide-react'

export const AdmissionTracking = () => {
  const user = useAuthStore((state) => state.user)

  const { data: application, isLoading } = useGetApplications()

  const isApplied: boolean = !!application

  const getApplicationStatus = () => {
    if (!application) {
      return "Вы не подали заявление"
    }

    if (application?.status === ApplicationStatusEnum.APPROVED) {
      return <Tag icon={<CheckCircleOutlined />} color='success'>Заявление принято</Tag>
    }

    if (application?.status === ApplicationStatusEnum.CANCELLED) {
      return <Tag icon={<CloseCircleOutlined />} color='error'>Заявление не принято</Tag>
    }

    return <Tag icon={<SyncOutlined spin />} color='processing'>Заявление рассматривается</Tag>
  }

  const getCurrentStep = () => {
    if (application) {
      return 1
    }
    return 0
  }

  return (
    <div className="mt-4 gap-8 bg-white rounded-2xl p-4">
      <div className="max-w-5xl mx-auto">
        <div className='profile-steps'>
          {
            isLoading
              ? <Skeleton.Input active style={{ width: '100%' }} />
              : (
                <Steps
                  progressDot
                  labelPlacement="vertical"
                  current={getCurrentStep()}
                  items={[
                    {
                      title: <Title>{isApplied ? 'Заявление подано' : 'Заявление отсутствует'}</Title>,
                      description: !isApplied && (
                        <Link to="/admission">
                          <StepBtn>Подать заявление</StepBtn>
                        </Link>
                      )
                    },

                    {
                      title: <Title>{getApplicationStatus()}</Title>,
                      description: isApplied && user?.applicantRegistrationForm && (
                        <a
                          target="_blank"
                          href={user.applicantRegistrationForm}
                          download="Регистрационный_листa.pdf"
                          style={{ marginTop: 10, display: 'block' }}
                        >
                          <StepBtn>
                            <Download size={18} /> Регистрационный лист
                          </StepBtn>
                        </a>
                      )
                    },
                  ]}
                />
              )
          }
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
