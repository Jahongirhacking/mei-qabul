import { Link } from "react-router-dom"

import { logoDarkPath } from "@/app/config"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  contentClassName?: string
  // headerClassName?: string
}

const Container = ({ children, header, contentClassName }: Props) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="sticky w-full top-0 z-50 px-4 py-6 md:px-12 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/">
                <img src={logoDarkPath} alt="logo" className="w-32" />
              </Link>
            </div>

            {header}

            <Link to="/">
              <button className="text-university-secondary rounded-full shadow p-1 hover:bg-university-secondary hover:text-white">
                <XIcon size={20} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className={cn("grow flex justify-center py-8", contentClassName)}>{children}</div>
    </div>
  )
}

export default Container
