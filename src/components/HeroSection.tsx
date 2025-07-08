import { useEffect, useRef } from "react"
import { Trans, useTranslation } from "react-i18next"

import heroImage from "../assets/hero.png"

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      },
      {
        threshold: 0.1
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-university-secondary rounded-b-[64px] hero-section">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 rounded-full bg-university-primary/20 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/3 w-80 h-80 rounded-full bg-university-primary/10 blur-3xl"></div>
      <div className="absolute left-1/2 bottom-8 md:bottom-20 -translate-x-1/2">
        <p className="text-glow text-lg md:text-3xl font-semibold whitespace-nowrap">
          <Trans i18nKey="heroSection.title">
            <span className="text-white"></span>
          </Trans>
        </p>
      </div>

      <div className="container mx-auto px-6 pt-36 pb-24 md:pt-40 md:pb-32">
        <div className="flex flex-col md:flex-row items-center">
          <section ref={sectionRef} className="w-full md:w-6/12 mb-12 md:mb-0 transition-all duration-700 opacity-0 translate-y-10">
            <div className="text-white max-w-6xl">
              <div className="mb-4 inline-block">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <Trans i18nKey="heroSection.subtitle">
                    <span className="text-glow"></span>
                  </Trans>
                </h1>
                <p className="bg-glow w-fit py-4 md:px-12 px-4 text-center rounded-md text-white font-bold text-7xl">{t("heroSection.beStudent")}</p>
              </div>
              <p className="text-white/80 mb-8 text-xl">
                <Trans i18nKey="heroSection.description">
                  <span className="text-glow font-semibold"></span>
                </Trans>
              </p>
            </div>
          </section>

          <section className="w-full md:w-6/12 flex justify-center md:justify-end animate-float">
            <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] bg-university-secondary-400 rounded-full overflow-hidden">
              <img src={heroImage} alt="Student with laptop" className="absolute top-0 right-0 h-[480px] object-cover object-top" />
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
