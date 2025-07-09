import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGetApplications } from '@/api/services/application.service'
import {
  removeExam,
  useCreateExam,
  useCreateExamTest,
  useGetExamTest
} from '@/api/services/exam.service'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton, { AnimatedButtonProps } from '@/components/AnimatedButton'
import { useTest } from '@/hooks/useTest'
import { ApplicationStatusEnum, ExamTypeEnum } from '@/types/enum'
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Steps, Tag } from 'antd'
import { Download } from 'lucide-react'

export const AdmissionTracking = () => {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const { data: application, isLoading } = useGetApplications()
  const { data: test, isLoading: testLoading } = useGetExamTest()
  const { isTestEnded, isTestStarted, remainedTimeInMinutes } = useTest(test)

  const isApplicationConfirmed = application?.status === ApplicationStatusEnum.APPROVED

  const { isCreating: isCreatingTest, createAsync: createTestAsync } = useCreateExamTest({
    onSuccess: () => {
      navigate('/admission/exam')
    }
  })

  const { isCreating: isCreatingExam, createAsync: createExamAsync } = useCreateExam({})

  const startTest = async () => {
    await createExamAsync()

    await createTestAsync({
      startTime: new Date().toISOString(),
      data: {}
    })
  }

  const restartTest = async () => {
    await removeExam()
    await createExamAsync()

    await createTestAsync({
      startTime: new Date().toISOString(),
      data: {}
    })
  }

  if (isLoading || testLoading) {
    return null
  }

  const isApplied: boolean = !!application
  const examType: ExamTypeEnum = user?.examType

  const isOfflineExam = examType === ExamTypeEnum.OFFLINE

  const getExamTitle = () => {
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

  const examDescription = () => {
    if (!application) return null

    if (application && application.score) {
      return <span className="whitespace-nowrap">To‘plangan ball - {application.score}</span>
    }

    if (isOfflineExam) {
      return (
        <span className="whitespace-nowrap">
          Imtihon vaqti:{' '}
          {application?.examLocation?.date
            ? `${application?.examLocation?.date} ${application?.examLocation?.time}`
            : 'Не указано'}
        </span>
      )
    }

    if (isTestStarted && !isTestEnded) {
      return (
        <Link to="/admission/exam">
          <StepBtn>Продолжить</StepBtn>
        </Link>
      )
    }

    if (!isApplicationConfirmed) {
      return null
    }

    if (isTestStarted && isTestEnded) {
      return (
        <StepBtn loading={isCreatingTest || isCreatingExam} onClick={restartTest}>
          Testni boshlash
        </StepBtn>
      )
    }

    return (
      <StepBtn loading={isCreatingTest || isCreatingExam} onClick={startTest}>
        Testni boshlash
      </StepBtn>
    )
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

              {
                title: <Title>{getExamTitle()}</Title>,
                subTitle:
                  isTestStarted && !isTestEnded
                    ? 'Qolgan vaqt: ' + remainedTimeInMinutes + ' daqiqa'
                    : null,
                description: examDescription()
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
