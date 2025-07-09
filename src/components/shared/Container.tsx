import { Link } from "react-router-dom"

import { logoDarkPath, universityName } from "@/app/config"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Flex, Typography } from "antd"
import { XIcon } from "lucide-react"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  contentClassName?: string
  // headerClassName?: string
}

const Container = ({ children, header, contentClassName }: Props) => {
  const isMobile = useIsMobile();
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="sticky w-full top-0 z-50 px-4 py-6 md:px-12 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/">
                <Flex gap={12} align="center">
                  <img src={logoDarkPath} alt="logo" className="w-20" />
                  {!isMobile && (
                    <Typography.Text strong style={{ maxWidth: 500 }}>{universityName}</Typography.Text>
                  )}
                </Flex>
              </Link>
            </div>

            <Link to={window.location.pathname.includes('login') ? '/' : '/user'}>
              <button className="text-university-secondary rounded-full shadow p-1 hover:bg-university-secondary hover:text-white">
                <XIcon size={20} />
              </button>
            </Link>
          </div>
          {
            isMobile && (
              <Typography.Text strong style={{ maxWidth: 500, textAlign: 'center', margin: 'auto', display: 'block' }} className="university-name">{universityName}</Typography.Text>
            )
          }

          {header}
        </div>
      </header>

      <div className={cn("grow flex justify-center p-8", contentClassName)}>{children}</div>
    </div>
  )
}

export default Container
