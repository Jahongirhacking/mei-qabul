import { useTranslation } from "react-i18next"

import { Flex, Typography } from "antd"
import { Globe, Mail, MapPin, Phone } from "lucide-react"

// const socials = [
//   {
//     icon: <Facebook size={20} />,
//     title: "Facebook",
//     link: "https://www.facebook.com/share/Dqygmjco6vYoU5EN/?mibextid=qi2Omg"
//   },
//   {
//     icon: <Instagram size={20} />,
//     title: "Instagram",
//     link: "https://www.instagram.com/kuaf_uz?igsh=MWFqMGdnN3pudGZjNQ=="
//   },
//   {
//     title: "YouTube",
//     link: "https://youtube.com/@kuafuz?si=OwPIhG7Rp7SnrC2S",
//     icon: <Youtube size={20} />
//   },
//   {
//     title: "Telegram",
//     link: "https://t.me/kuaf_edu",
//     icon: <Send size={20} />
//   }
// ]

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-university-secondary text-white home-footer">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between flex-wrap align-center gap-8">
          <section>
            <Flex gap={18} align="center" wrap>
              <img className="w-40" src="/logo.png" alt="logo" />
              <Typography.Text strong style={{ maxWidth: 450, color: '#fff', fontSize: 18 }} className="university-name">Филиал Национального исследовательского университета «МЭИ» в городе Ташкенте</Typography.Text>
            </Flex>
          </section>

          <section className="flex flex-col md:flex-row gap-24">
            {/* <div>
              <h3 className="text-lg font-semibold mb-6">{t("footer.socials")}</h3>
              <ul className="space-y-4">
                {socials.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center">
                      <span className="text-university-primary mr-2">{item.icon}</span>
                      <span className="text-gray-300 hover:text-university-secondary-300">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            <div>
              <h3 className="text-lg font-semibold mb-6">{t("footer.contact")}</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Globe size={20} className="text-university-primary mr-2" />
                  <span className="text-gray-300">{t("footer.site")}</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="text-university-primary mr-2" />
                  <span className="text-gray-300">{t("footer.phone")}</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="text-university-primary mr-2" />
                  <span className="text-gray-300">{t("footer.email")}</span>
                </li>
                <li className="flex items-start">
                  <MapPin size={20} className="text-university-primary mr-2 mt-1" />
                  <span className="text-gray-300">{t("footer.address")}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="border-t border-university-secondary-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
