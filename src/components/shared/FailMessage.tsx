import { Application } from '@/api/services/application.service'

type Props = {
  application: Application
}

export const FailMessage = ({ application }: Props) => {
  return (
    <div className="bg-red-200 border border-red-500 text-red-700 p-5 rounded-3xl mb-6">
      <h1 className="text-2xl mb-4">
        <span className="font-bold mr-2 text-3xl">
          Afsuski, siz talabalikka tavsiya etilmadingiz!
        </span>
      </h1>
      {application.score && <p className="text-xl">To‘plangan ball: {application.score}</p>}
      <h4>
        <span className="text-xl">Izoh:</span> {application.examComment}
      </h4>
    </div>
  )
}
