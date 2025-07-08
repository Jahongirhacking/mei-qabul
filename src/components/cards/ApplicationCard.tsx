import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Application } from '@/api/services/application.service'
import { InfoItem } from '@/components/cards/UserInfoCard'
import { ApplicationStatusText } from '@/components/shared/ApplicationStatusText'
import { ExamTypeText } from '@/components/shared/ExamTypeText'
import { FailMessage } from '@/components/shared/FailMessage'
import { SuccessMessage } from '@/components/shared/SuccessMessage'
import { cn } from '@/lib/utils'
import { ApplicationStatusEnum, ExamStatusEnum } from '@/types/enum'
import { Button } from 'antd'
import { Copy } from 'lucide-react'

import locationImage from '../../assets/locations-card.png'

type Props = {
  onApplicationCancel: (id: number) => void
  application: Application
  hideCancel?: boolean
}

const defaultMessage = 'Imtihon vaqti hali belgilanmagan'

export function ApplicationCard({ application, onApplicationCancel, hideCancel = false }: Props) {
  const [isCopied, setCopied] = useState(false)

  const isCancelVisible =
    application.status === ApplicationStatusEnum.APPROVED &&
    application.examStatus === ExamStatusEnum.NEW &&
    !hideCancel

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
      label: 'Manzil',
      value: application.examLocation.address
    },
    {
      label: 'Sana',
      value: application.examLocation.date || defaultMessage
    },
    {
      label: 'Vaqt',
      value: application.examLocation.time || defaultMessage
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
      label: 'Izoh',
      value: application.examLocation.description
    }
  ]

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

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
        </section>

        <section className="gap-2 rounded-3xl bg-university-green p-8 w-[330px] flex flex-col justify-between items-center">
          <h2 className="text-xl font-semibold">OTM geolokatsiyasi</h2>

          <a target="_blank" href={application.examLocation.location} className="rounded-lg">
            <img src={locationImage} alt="shartnoma" className="size-40 object-cover rounded-2xl" />
          </a>

          <div className="relative">
            <CopyToClipboard text={application.examLocation.location} onCopy={handleCopy}>
              <button className="flex items-center gap-2 hover:text-university-teal">
                <Copy /> <b>Joylashuvni nusxalash</b>
              </button>
            </CopyToClipboard>
            <span
              className={cn('absolute left-1/2 -translate-x-1/2 hidden', {
                'text-university-teal-700 inline': isCopied
              })}
            >
              <i>Nusxalandi</i>
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
