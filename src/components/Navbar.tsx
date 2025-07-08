import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useAuthStore } from "@/app/store/authStore"
import { cn } from "@/lib/utils"
import { UserCircle } from "lucide-react"

import { AnimatedButton } from "./AnimatedButton"
import SelectLanguage from "./SelectLanguage"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isApplied = useAuthStore((state) => state.isApplied)
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-2 md:px-12",
        isScrolled ? "bg-university-secondary-500 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div>
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src="/logo.svg" alt="logo" className="w-32" />
            </Link>

            <div className="flex items-center justify-end gap-8">
              <div>
                {isAuthenticated ? (
                  <div className="flex gap-2">
                    {isApplied() || (
                      <Link to="/admission" className="hidden md:block">
                        <AnimatedButton>ARIZA TOPSHIRISH</AnimatedButton>
                      </Link>
                    )}

                    <Link to="/user">
                      <AnimatedButton>
                        <span className="hidden md:inline"> Mening kabinetim</span>
                        <UserCircle size={20} />
                      </AnimatedButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/admission" className="hidden md:block">
                      <AnimatedButton className="max-md:p-2">ARIZA TOPSHIRISH</AnimatedButton>
                    </Link>

                    <Link to="/login">
                      <AnimatedButton>Kirish</AnimatedButton>
                    </Link>
                  </div>
                )}
              </div>
              <SelectLanguage />
            </div>
          </div>

          {isApplied() || (
            <Link className="block md:hidden mt-4" to="/admission">
              <AnimatedButton className="w-full">ARIZA TOPSHIRISH</AnimatedButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
