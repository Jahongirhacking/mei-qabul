import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuthStore } from "@/app/store/authStore"
import { cn } from "@/lib/utils"
import { LogOut, MenuIcon, XIcon } from "lucide-react"

const menu = [
  {
    name: "Главная страница",
    icon: "🏠",
    link: "/user"
  },
  {
    name: "Мои заявления",
    icon: "📝",
    link: "/user/applications"
  },
  // {
  //   name: "Mening shartnomam",
  //   icon: "📋",
  //   link: "/user/contracts"
  // },
  // {
  //   name: "Til sertifikatlari",
  //   icon: "📜",
  //   link: "/user/certificates"
  // }
]

export function ProfileSidebar() {
  const pathname = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const logout = useAuthStore((state) => state.logout)

  const handleMenuSelect = (link: string) => {
    setIsMenuOpen(false)
    navigate(link)
  }

  return (
    <div className="relative">
      <aside className="md:block hidden">
        <nav className="w-64">
          <ul className="space-y-3">
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  className={cn(
                    "flex items-center gap-3 p-3 hover:bg-university-green-100 rounded-full cursor-pointer",
                    {
                      "bg-university-green": pathname.pathname === item.link
                    }
                  )}
                  to={item.link}
                >
                  <span>{item.icon}</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={logout}
          className={cn(
            "flex items-center w-full gap-3 p-3 px-4 hover:bg-university-green-100 rounded-full cursor-pointer mt-24 text-red-600"
          )}
        >
          <LogOut size={18} />
          Выход
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <div className="flex justify-between md:hidden">
        <h3 className="text-xl font-semibold text-teal-700">Личный кабинет</h3>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 rounded-xl bg-white shadow-lg animate-fade-in z-10">
          <ul className="py-4 px-6 space-y-3">
            {menu.map((item) => (
              <li
                onClick={() => handleMenuSelect(item.link)}
                key={item.name}
                className="py-2 font-medium text-university-secondary-800 hover:text-university-primary"
              >
                {item.name}
              </li>
            ))}

            <li
              onClick={logout}
              className="py-2 font-medium text-red-600 hover:text-red-400 cursor-pointer"
            >
              Выход
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
