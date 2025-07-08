import { Link, Outlet } from "react-router-dom"

import { logoDarkPath } from "@/app/config"
import { useAuthStore } from "@/app/store/authStore"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { AdmissionTracking } from "@/components/shared/AdmissionTracking"
import { UserCircle } from "lucide-react"
import SelectLanguage from "./SelectLanguage"

export default function ProfileLayout() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen relative bg-gray-50 pb-8">
      <header className="p-2 py-4 md:px-12 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="w-36">
              <Link to="/">
                <img src={logoDarkPath} alt="logo" className="w-32" />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-2">
              <div className="w-40 text-end">
                <Link to="/user">
                  <button className="flex gap-2 px-6 py-2 items-center rounded-full shadow p-1 bg-glow text-white">
                    <span> {user.firstName || user.phoneNumber}</span> <UserCircle size={24} />
                  </button>
                </Link>
              </div>
              <SelectLanguage />
            </div>

          </div>
        </div>
      </header>

      <div className="container">
        <AdmissionTracking />

        <div className="grid md:grid-cols-[auto_1fr] gap-4 mt-8">
          <ProfileSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
