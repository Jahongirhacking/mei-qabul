import { useTranslation } from "react-i18next"

import { Exam } from "@/api/services/exam.service"
import AnimatedButton from "@/components/AnimatedButton"
import { BookOpen, BrainCircuit, Clock, GraduationCap } from "lucide-react"

type Props = {
  startExam: () => void
  exams: Exam[]
}

const iconClass = "size-8 text-blue-600"

const icons = [<BookOpen className={iconClass} />, <GraduationCap className={iconClass} />, <BrainCircuit className={iconClass} />]

export function ExamStartCard({ startExam, exams }: Props) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("welcome")}</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Test Information Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Test o‘tkaziladigan fanlar:</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Subject Cards */}
          {exams.map((exam, index) => (
            <div className="bg-blue-50 rounded-xl p-6 flex items-center space-x-4">
              {icons[index]}
              <div>
                <h3 className="font-medium text-gray-900">{exam.subjectName}</h3>
                <p className="text-blue-600">{exam.questions.length} ta</p>
              </div>
            </div>
          ))}
        </div>

        {/* Time Information */}
        <div className="flex items-center space-x-3 mb-8 bg-gray-50 p-4 rounded-lg">
          <Clock className="w-6 h-6 text-gray-600" />
          <div className="text-xl">
            <span className="text-gray-700 font-medium">Berilgan muddat:</span>
            <span className="ml-2 text-gray-900">2 soat</span>
          </div>
        </div>

        {/* Start Button */}
        <AnimatedButton className="w-full" onClick={startExam}>
          {t("action.startTest")}
        </AnimatedButton>
      </div>
    </div>
  )
}
