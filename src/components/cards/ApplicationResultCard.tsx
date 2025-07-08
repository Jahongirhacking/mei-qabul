import { useMemo } from 'react'

import { Application } from '@/api/services/application.service'
import { InfoItem } from '@/components/cards/UserInfoCard'
import { ApplicationStatusText } from '@/components/shared/ApplicationStatusText'
import { ExamTypeText } from '@/components/shared/ExamTypeText'
import { FailMessage } from '@/components/shared/FailMessage'
import { SuccessMessage } from '@/components/shared/SuccessMessage'
import { ApplicationStatusEnum, ExamStatusEnum, ExamTypeEnum } from '@/types/enum'
import { Button } from 'antd'

type Props = {
  application: Application
  isCancelVisible?: boolean
  onApplicationCancel: (id: number) => void
}

export function ApplicationResultCard({
  application,
  onApplicationCancel,
  isCancelVisible
}: Props) {
  const isCancelShowed = application.status === ApplicationStatusEnum.APPROVED && isCancelVisible

  const items = useMemo(() => {
    const sharedItems = [
      {
        label: 'Qabul turi',
        value: application.admissionType
      },
      {
        label: "Ta'lim yo‘nalishi",
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

    switch (application.examType) {
      case ExamTypeEnum.RECOMMENDATION:
        return sharedItems
      case ExamTypeEnum.INTERVIEW:
        return sharedItems
      default:
        return [
          ...sharedItems,
          {
            label: 'Fanlar',
            value: application.subjects.join(', ')
          },
          {
            label: 'To‘plangan ball',
            value: application.score
          }
        ]
    }
  }, [application])

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
      <div className="grid md:grid-cols-[1fr_auto] gap-5">
        <section className="gap-6 rounded-3xl bg-university-green">
          <div className="flex justify-between items-start  py-5 px-8 border-b border-gray-400">
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

          {application.status === ApplicationStatusEnum.CANCELLED && (
            <div>
              <p className="text-red-500 px-8 pb-4">Izoh: {application.comment}</p>
            </div>
          )}

          {isCancelShowed && (
            <div className="px-8 pb-4 flex justify-end">
              <Button shape="round" danger onClick={() => onApplicationCancel(application.id)}>
                Arizani bekor qilish
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
