import { Trans, useTranslation } from "react-i18next"

import { AdvantagesSection } from "@/components/AdvantagesSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import { SpecialtiesSection } from "@/components/SpecialtiesSection"
import StepCard from "@/components/StepCard"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export default function HomePage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const source = searchParams.get("source")
    if (source) {
      localStorage.setItem("source", source)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col home-page">
      <Navbar />

      <HeroSection />

      <AdvantagesSection />

      <SpecialtiesSection />

      {/* Application Steps Section */}
      <section className="py-20 px-6 bg-university-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mx-auto max-w-3xl text-5xl font-semibold mb-4 text-white">
              <Trans i18nKey="applicationSteps.title">
                <span className="text-glow"> </span>
              </Trans>
            </h2>
            <p className="text-white max-w-2xl mx-auto mt-4">{t("applicationSteps.description")}</p>
          </div>

          <div className="flex align-center justify-center gap-10 flex-wrap">
            {[0, 1, 3].map((stepNumber, index) => (
              <StepCard
                key={stepNumber}
                number={index + 1}
                title={t(`applicationSteps.steps.${stepNumber}.title`)}
                description={t(`applicationSteps.steps.${stepNumber}.description`)}
                delay={index * 100}
              />
            ))}
          </div>

          {/* <p className="text-white text-center text-xl my-8">{t("videoSection.title")}</p> */}

          {/* <div className="mt-16">
            <VideoSection />
          </div> */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold mb-4 py-1 px-3" style={{ color: '#005096' }}>
              <Trans i18nKey="faq.title">
                <span className="text-glow"></span>
              </Trans>
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-university-secondary-800"></h3>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">{t("faq.description")}</p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
