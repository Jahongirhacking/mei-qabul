import { useTranslation } from "react-i18next"

import { Award, Globe, Laptop } from "lucide-react"

const advantages = [
  {
    icon: <Award className="w-8 h-8 text-blue-600" />
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />
  },
  {
    icon: <Laptop className="w-8 h-8 text-blue-600" />
  }
]

export const AdvantagesSection = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-glow">{t("advantageSection.title")}</h2>
          <p className="mt-4 text-lg text-gray-600">{t("advantageSection.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6 mx-auto">{advantage.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3" style={{ color: '#005096' }}>{t(`advantageSection.advantages.${index}.title`)}</h3>
              <p className="text-gray-600 text-center">{t(`advantageSection.advantages.${index}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
