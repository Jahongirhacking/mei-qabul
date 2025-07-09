import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useAuthStore } from "@/app/store/authStore"
import { cn } from "@/lib/utils"
import { UserCircle } from "lucide-react"

import { universityName } from "@/app/config"
import { useIsMobile } from "@/hooks/use-mobile"
import { Flex, Typography } from "antd"
import { AnimatedButton } from "./AnimatedButton"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isApplied = useAuthStore((state) => state.isApplied)
  const isMobile = useIsMobile();
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
        isScrolled ? "bg-university-secondary-500 backdrop-blur-md shadow-md home-header" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div>
          <div className="flex items-center justify-between gap-x-4">
            <Link to="/">
              <Flex gap={12} align="center">
                <img src="/logo.png" alt="logo" className="w-20" />
                {
                  !isMobile && (
                    <Typography.Text strong style={{ maxWidth: 500, color: '#fff' }} className="university-name">{universityName}</Typography.Text>
                  )
                }
              </Flex>
            </Link>

            <div className="flex items-center justify-end gap-8">
              <div>
                {isAuthenticated ? (
                  <div className="flex gap-2 items-center">
                    {isApplied() || (
                      <Link to="/admission" className="hidden md:block">
                        <AnimatedButton>Подать заявление</AnimatedButton>
                      </Link>
                    )}

                    <Link to="/user">
                      <AnimatedButton>
                        <span className="hidden md:inline"> Личный кабинет</span>
                        <UserCircle size={20} />
                      </AnimatedButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Link to="/admission" className="hidden md:block">
                      <AnimatedButton className="max-md:p-2">Подать заявление</AnimatedButton>
                    </Link>

                    <Link to="/login">
                      <AnimatedButton>Войти</AnimatedButton>
                    </Link>
                  </div>
                )}
              </div>
              {/* <SelectLanguage /> */}
            </div>
          </div>

          {
            isMobile && (
              <Typography.Text strong style={{ maxWidth: 500, color: '#fff', textAlign: 'center', margin: '8px auto auto' }} className="university-name block">{universityName}</Typography.Text>
            )
          }

          {isApplied() || (
            <Link className="block md:hidden mt-4" to="/admission">
              <AnimatedButton className="w-full">Подать заявление</AnimatedButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
