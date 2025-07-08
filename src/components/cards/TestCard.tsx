import { Link, useNavigate } from 'react-router-dom'

import { Application } from '@/api/services/application.service'
import {
  TestResult,
  useCreateExam,
  useCreateExamTest,
  useGetExamTest
} from '@/api/services/exam.service'
import { TEST_COUNT, TEST_DURATION } from '@/app/config'
import AnimatedButton from '@/components/AnimatedButton'
import { Loader } from '@/components/Loader'
import { ApplicationStatusEnum } from '@/types/enum'
import { Progress, ProgressProps } from 'antd'

const conicColors: ProgressProps['strokeColor'] = {
  '0%': '#40DB5C',
  '50%': '#03C7FD',
  '100%': '#40DB5C'
}

const countInPercent = (count: number, total: number) => {
  return Math.round((count / total) * 100)
}

const calculateAnsweredTestCount = (data?: TestResult['data']) => {
  if (!data) return 0

  return Object.values(data).reduce((acc, val) => acc + Object.values(val).length, 0)
}

const getCurrentRemainedTime = (remainedTime: number) => {
  // Ensure remainedTime is not negative
  const time = Math.max(0, remainedTime)

  // convert time to to minutes
  return Math.floor(time / 60)
}

const calculateRemainedTimeInMinutes = (startTime?: string) => {
  if (!startTime) return 120

  const start = new Date(startTime).getTime()
  const now = new Date().getTime()
  const elapsedTime = Math.floor((now - start) / 1000) // Convert to seconds
  const newRemainingTime = TEST_DURATION - elapsedTime

  return getCurrentRemainedTime(newRemainingTime)
}

interface Props {
  application: Application
}

export function TestCard({ application }: Props) {
  const { data: test, isLoading: testLoading } = useGetExamTest()

  const navigate = useNavigate()

  const isApplicationConfirmed = application?.status === ApplicationStatusEnum.APPROVED

  const { create, isCreating: isCreatingTest } = useCreateExamTest({
    onSuccess: () => {
      navigate('/admission/exam')
    }
  })

  const { create: createExam, isCreating: isCreatingExam } = useCreateExam({
    onSuccess: () => {
      create({
        startTime: new Date().toISOString(),
        data: {}
      })
    }
  })

  const restartTest = () => {
    create({
      startTime: new Date().toISOString(),
      data: {}
    })
  }

  const startTest = () => {
    createExam()
  }

  if (testLoading) {
    return <Loader />
  }

  const isTestStarted = !!test?.startTime
  const progress = calculateAnsweredTestCount(test?.data)
  const remainedTimeInMinutes = calculateRemainedTimeInMinutes(test?.startTime)
  const isTestEnded = remainedTimeInMinutes === 0

  const renderButton = () => {
    if (isTestEnded) {
      return (
        <AnimatedButton
          onClick={restartTest}
          loading={isCreatingExam || isCreatingTest}
          className="w-fit"
        >
          Qayta test topshirish
        </AnimatedButton>
      )
    }

    if (isTestStarted) {
      return (
        <Link to="/admission/exam">
          <AnimatedButton className="w-fit">Davom ettirish</AnimatedButton>
        </Link>
      )
    }

    if (isApplicationConfirmed) {
      return (
        <AnimatedButton onClick={startTest} className="w-fit">
          Testni boshlash
        </AnimatedButton>
      )
    }

    return null
  }

  return (
    <div className="flex gap-6 max-md:flex-col-reverse rounded-3xl bg-university-green p-8  md:w-[600px]">
      <div className="flex flex-col max-md:items-center">
        <div className="grow">
          <h2 className="text-xl font-semibold mb-3">Imtihon testi</h2>

          <p className="text-balance text-gray-600 mb-5">
            Jami <b>60</b> ta, 2 ta fandan, har biridan 30 tadan savol
          </p>
        </div>

        <div>{renderButton()}</div>
      </div>

      <div className="flex flex-col items-center">
        <Progress
          format={() => <span className="text-teal-500 font-bold text-4xl">{progress}</span>}
          size={160}
          strokeWidth={9}
          type="circle"
          percent={countInPercent(progress, TEST_COUNT)}
          strokeColor={conicColors}
        />

        <p className="text-sm mt-6">
          Qolgan vaqt: <b>{remainedTimeInMinutes} daqiqa</b>
        </p>
      </div>
    </div>
  )
}
