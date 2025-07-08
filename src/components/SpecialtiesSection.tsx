import { Trans, useTranslation } from "react-i18next"

// import { useGetPublicSpecialties } from "@/api/services/public.service"

export const SpecialtiesSection = () => {
  const { t } = useTranslation()
  // const { data = [] } = useGetPublicSpecialties()

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl max-w-4xl mx-auto font-bold text-university-secondary-600 mb-6">
            <Trans i18nKey="specialtiesSection.title">
              <span className="text-university-primary"></span>
              <span className="text-glow font-semibold"></span>
            </Trans>
          </h2>
          <p className="text-md max-w-3xl mx-auto  text-gray-400 mb-6">{t("specialtiesSection.description")}</p>
        </div>

        <div>
          {/* {data?.map((item) => (
            <div key={item.eduType} className="mb-8">
              <div className="my-6">
                <h2 className="text-3xl font-bold text-university-secondary-600">{item.eduType}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {item.specialities.map((course, index) => (
                  <PublicSpecialtyCard key={course.speciality} title={course.speciality} features={course.degreeAndContractPrices} delay={index * 100} />
                ))}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  )
}
