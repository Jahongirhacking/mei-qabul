import { Link } from 'react-router-dom'

import { useCancelApplication, useGetApplications } from '@/api/services/application.service'
import { useAuthStore } from '@/app/store/authStore'
import AnimatedButton from '@/components/AnimatedButton'
import { Loader } from '@/components/Loader'
import { ApplicationCard } from '@/components/cards/ApplicationCard'
import { ApplicationInterviewCard } from '@/components/cards/ApplicationInterviewCard'
import { ApplicationOnlineCard } from '@/components/cards/ApplicationOnlineCard'
import { ApplicationRecommendationCard } from '@/components/cards/ApplicationRecommendationCard'
import { ApplicationResultCard } from '@/components/cards/ApplicationResultCard'
import { TestCard } from '@/components/cards/TestCard'
import { UserInfoCard } from '@/components/cards/UserInfoCard'
import { ApplicationStatusEnum, ExamTypeEnum } from '@/types/enum'
import { Flex, Modal, Tag } from 'antd'
import { toast } from 'sonner'

export default function ApplicationsPage() {
  const updateUser = useAuthStore((state) => state.updateUser)

  const { confirm } = Modal

  const {
    data: application,
    isFetching: applicationsLoading,
    refetch: refetchApplications
  } = useGetApplications()
  // const { data: contracts = [], isLoading: contractsLoading } = useGetContracts()

  // const isCancelVisible = contracts.length === 0

  const { mutate: cancelApplication, isPending: isCancelApplicationPending } = useCancelApplication(
    {
      onSuccess: () => {
        refetchApplications()
        updateUser({ applicantRegistrationForm: undefined })
        toast.success('Ariza muvaffaqiyatli bekor qilindi!')
      }
    }
  )

  const onApplicationCancel = (applicationId: number) => {
    confirm({
      title: 'Rostdan ham arizani bekor qilmoqchimisiz?',
      content: 'Arizani bekor qilishni tasdiqlaysizmi?',
      okText: 'Ha, bekor qilish',
      cancelText: "Yo'q, orqaga qaytish",
      okType: 'danger',
      onOk() {
        cancelApplication(applicationId)
      }
    })
  }

  if (applicationsLoading || isCancelApplicationPending) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <Loader />
      </div>
    )
  }

  function renderContent() {
    if (!application) {
      return (
        <Link to="/admission">
          <AnimatedButton className="mb-5">Ariza topshirish</AnimatedButton>
        </Link>
      )
    }

    if (application.status === ApplicationStatusEnum.CANCELLED) {
      return (
        <div>
          <Link to="/admission">
            <AnimatedButton className="mb-5">Ariza topshirish</AnimatedButton>
          </Link>

          <ApplicationResultCard
            application={application}
            // isCancelVisible={isCancelVisible}
            onApplicationCancel={onApplicationCancel}
          />
        </div>
      )
    }

    if (
      application.status === ApplicationStatusEnum.APPROVED &&
      application.examType === ExamTypeEnum.OFFLINE
    ) {
      return (
        <ApplicationCard
          // hideCancel={!isCancelVisible}
          application={application}
          onApplicationCancel={onApplicationCancel}
        />
      )
    }

    if (application.status === ApplicationStatusEnum.APPROVED) {
      return (
        <ApplicationResultCard
          application={application}
          // isCancelVisible={isCancelVisible}
          onApplicationCancel={onApplicationCancel}
        />
      )
    }

    switch (application.examType) {
      case ExamTypeEnum.OFFLINE:
        return (
          <ApplicationCard
            // hideCancel={!isCancelVisible}
            application={application}
            onApplicationCancel={onApplicationCancel}
          />
        )
      case ExamTypeEnum.ONLINE:
        return (
          <div className="grid md:grid-cols-[1fr_auto] gap-2">
            <TestCard application={application} />

            <ApplicationOnlineCard
              // hideCancel={!isCancelVisible}
              application={application}
              onApplicationCancel={onApplicationCancel}
            />
          </div>
        )
      case ExamTypeEnum.RECOMMENDATION:
        return (
          <ApplicationRecommendationCard
            // hideCancel={!isCancelVisible}
            application={application}
            onApplicationCancel={onApplicationCancel}
          />
        )
      case ExamTypeEnum.INTERVIEW:
        return (
          <ApplicationInterviewCard
            // hideCancel={!isCancelVisible}
            application={application}
            onApplicationCancel={onApplicationCancel}
          />
        )
      default:
        return null
    }
  }


  const items = [
    {
      label: "Qabul turi:",
      value: `${application?.admissionType || ""}`
    },
    {
      label: "Форма обучения:",
      value: `${application?.degree || ""}`
    },
    {
      label: "Направление обучения:",
      value: `${application?.speciality || ""}`
    },
    {
      label: "Код направления обучения:",
      value: `${application?.specialityCode || ""}`
    },
    {
      label: "Предметы:",
      value: `${application?.subjects?.join(', ') || ""}`
    }
  ]

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-5">Мои заявления</h1>

      <UserInfoCard
        title={<Flex align='center' gap={12} wrap>Статус заявления: <Tag color='success'>{application?.status}</Tag></Flex>}
        items={items}
      />
      <div>{renderContent()}</div>
    </div>
  )
}
