import { useTranslation } from "react-i18next"

import { useCreateExamTest, useGetExamTest, useGetExams } from "@/api/services/exam.service"
import { ExamStartCard } from "@/components/ExamStartCard"
import { GlobalSpinner } from "@/components/GlobalSpinner"
import { ExamForm } from "@/components/forms/ExamForm"
import Container from "@/components/shared/Container"

export default function AdmissionExamPage() {
  const { t } = useTranslation()
  const { data: exams, isLoading } = useGetExams()

  const { data: test, isLoading: testLoading, refetch } = useGetExamTest()

  const { create } = useCreateExamTest({
    onSuccess: () => {
      refetch()
    }
  })

  const startTest = () => {
    create({
      startTime: new Date().toISOString(),
      data: {}
    })
  }

  if (isLoading || testLoading) {
    return <GlobalSpinner />
  }

  if (!exams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center space-y-6 bg-white rounded-2xl p-8 blue-card-shadow card-hover">
            <h1 className="text-3xl font-bold text-university-secondary-700">Testlar topilmadi</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Container>
      {test ? (
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("welcome")}</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <ExamForm exams={exams} test={test} />
        </div>
      ) : (
        <ExamStartCard exams={exams} startExam={startTest} />
      )}
    </Container>
    // <div className="min-h-screen relative bg-gray-50">
    //   <header className="transition-all duration-300 ease-in-out p-6 md:px-12 bg-white/90 backdrop-blur-md shadow-md">
    //     <div className="container mx-auto">
    //       <div className="flex items-center justify-between">
    //         <div className="w-40">
    //           <Link to="/">
    //             <img src="/logo_dark.png" alt="logo" className="w-32" />
    //           </Link>
    //         </div>

    //         <div className="w-40 text-end">
    //           <button className="rounded-full shadow p-2 bg-university-secondary text-white">
    //             <User size={24} />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </header>

    //   <div className="mt-10">
    //     <div className="container mx-auto pb-12">
    //       {test ? (
    //         <div>
    //           <div className="text-center mb-12">
    //             <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("welcome")}</h1>
    //             <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
    //           </div>
    //           <ExamForm exams={exams} test={test} />
    //         </div>
    //       ) : (
    //         <ExamStartCard exams={exams} startExam={startTest} />
    //       )}
    //     </div>
    //   </div>
    // </div>
  )
}
