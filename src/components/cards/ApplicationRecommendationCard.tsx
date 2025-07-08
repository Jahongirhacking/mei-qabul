import { Application } from '@/api/services/application.service'
import { InfoItem } from '@/components/cards/UserInfoCard'
import { ApplicationStatusText } from '@/components/shared/ApplicationStatusText'
import { ExamTypeText } from '@/components/shared/ExamTypeText'
import { FailMessage } from '@/components/shared/FailMessage'
import { SuccessMessage } from '@/components/shared/SuccessMessage'
import { ApplicationStatusEnum, ExamStatusEnum } from '@/types/enum'
import { Button } from 'antd'

type Props = {
  onApplicationCancel: (id: number) => void
  application: Application
  hideCancel?: boolean
}

export function ApplicationRecommendationCard({
  application,
  onApplicationCancel,
  hideCancel = false
}: Props) {
  const isCancelVisible = application.status === ApplicationStatusEnum.APPROVED && !hideCancel

  const items = [
    {
      label: 'Qabul turi',
      value: application.admissionType
    },
    {
      label: "Ta'lim yo'nalishi",
      value: application.speciality
    },
    {
      label: "Ta'lim shakli",
      value: application.degree
    },
    {
      label: "Ta'lim tili",
      value: application.language
    },
    {
      label: 'Imtihon turi',
      value: <ExamTypeText type={application.examType} />
    }
  ]

  return (
    <div>
      {application.status === ApplicationStatusEnum.APPROVED &&
        application.examStatus === ExamStatusEnum.SUCCESS && (
          <SuccessMessage application={application} />
        )}
      {application.status === ApplicationStatusEnum.APPROVED &&
        application.examStatus === ExamStatusEnum.FAILED && (
          <FailMessage application={application} />
        )}

      <div className="gap-6 rounded-3xl bg-university-green">
        <div className="flex justify-between items-start  py-5 px-8 border-b border-gray-400">
          <h2 className="text-xl font-semibold">Ariza ID - {application.id}</h2>
          <p>
            Status: <ApplicationStatusText status={application.status} />
          </p>
        </div>

        <div className="px-8 py-4">
          <div className="space-y-3">
            {items.map((item, index) => (
              <InfoItem key={index} {...item} />
            ))}
          </div>
        </div>

        {isCancelVisible && (
          <div className="px-8 pb-4 flex justify-end">
            <Button shape="round" danger onClick={() => onApplicationCancel(application.id)}>
              Arizani bekor qilish
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
