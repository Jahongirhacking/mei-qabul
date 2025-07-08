import { useTranslation } from "react-i18next"

import { useGetUserMe } from "@/api/services/user.service"
import { UserInfoCard } from "@/components/cards/UserInfoCard"
import { Download } from "lucide-react"

export default function ProfilePage() {
  const { data: user } = useGetUserMe()
  const { t } = useTranslation()

  const items = [
    {
      label: t("label.fio"),
      value: `${user?.lastName || ""} ${user?.firstName || ""} ${user?.fatherName || ""}`
    },
    {
      label: t("label.pinfl"),
      value: user?.pinfl
    },
    {
      label: t("label.serialAndNumber"),
      value: user?.serialAndNumber
    },
    {
      label: t("label.phoneNumber"),
      value: `+${user?.phoneNumber}`
    },
    {
      label: t("label.birthDate"),
      value: user?.birthDate
    },
    {
      label: t("label.nationality"),
      value: user?.nationality
    },
    {
      label: t("label.examType"),
      value: user?.examType
    },
    {
      label: t("label.applicantRegistrationForm"),
      value: <DownloadLink url={user?.applicantRegistrationForm} />
    },
    {
      label: "Talaba shartnomasi",
      value: <DownloadLink url={user?.contractUrl} />
    }
  ]

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-5">{t("welcome")}</h1>

      <UserInfoCard title={t("admission.personalInfo")} items={items} />
    </div>
  )
}

const DownloadLink = ({ url }: { url?: string }) => {
  if (!url) return null

  return (
    <a target="_blank" href={url} className="text-blue-500 font-semibold flex items-center gap-2">
      <Download size={18} /> Yuklash
    </a>
  )
}
