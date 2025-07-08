import { Application } from '@/api/services/application.service'
import { InfoItem } from '@/components/cards/UserInfoCard'
import { ApplicationStatusText } from '@/components/shared/ApplicationStatusText'
import { ExamTypeText } from '@/components/shared/ExamTypeText'
import { ApplicationStatusEnum } from '@/types/enum'
import { Button } from 'antd'

type Props = {
  onApplicationCancel: (id: number) => void
  application: Application
  hideCancel?: boolean
}

export function ApplicationOnlineCard({
  application,
  onApplicationCancel,
  hideCancel = false
}: Props) {
  const isCancelVisible = application.status !== ApplicationStatusEnum.CANCELLED && !hideCancel

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
      label: 'Fanlar',
      value: application.subjects.join(', ')
    },
    {
      label: 'Imtihon turi',
      value: <ExamTypeText type={application.examType} />
    },
    {
      label: "Ta'lim shakli",
      value: application.degree
    }
  ]

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-5 w-full">
      <section className="gap-6 rounded-3xl bg-university-green">
        <div className="flex justify-between items-start  py-5 px-8 border-b border-gray-400 gap-2">
          <h2 className="text-xl font-semibold">Ariza ID - {application.id}</h2>
          <p>
            Ariza holati: <ApplicationStatusText status={application.status} />
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
      </section>
    </div>
  )
}
