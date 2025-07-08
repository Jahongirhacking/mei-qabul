import { ArrowRight, Ghost, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 relative">
          <Ghost className="w-24 h-24 mx-auto text-indigo-500 animate-float" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/5 rounded-full blur-sm transform-gpu animate-float-shadow" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! It seems you've ventured into uncharted territory. The page you're looking for has
          gone on vacation or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/admin/login"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </a>

          <a
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-200 transition-colors hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Student Page
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
