import { AnimatedButton } from "@/components/AnimatedButton"
import { ArrowLeft, HomeIcon } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-university-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center space-y-6 bg-white rounded-2xl p-8 blue-card-shadow card-hover">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-university-primary/10 rounded-full blur-xl transform animate-pulse-soft"></div>
            <div className="w-20 h-20 bg-university-secondary text-white flex items-center justify-center text-3xl font-bold rounded-full mx-auto">404</div>
          </div>

          <h1 className="text-3xl font-bold text-university-secondary-700">Sahifa</h1>

          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>

          <div className="flex gap-2 justify-center">
            <AnimatedButton className="flex items-center justify-center gap-2" onClick={() => window.history.back()} variant="secondary">
              <p className="flex items-center justify-center gap-2">
                <ArrowLeft size={16} />
                Orqaga
              </p>
            </AnimatedButton>

            <AnimatedButton onClick={() => (window.location.href = "/")}>
              <p className="flex items-center justify-center gap-2">
                <HomeIcon size={16} />
                Bosh sahifa
              </p>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
