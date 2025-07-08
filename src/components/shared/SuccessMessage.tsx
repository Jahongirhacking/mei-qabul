import { Application } from '@/api/services/application.service'

type Props = {
  application: Application
}

export const SuccessMessage = ({ application }: Props) => {
  return (
    <div className="bg-glow text-white p-5 rounded-3xl mb-6">
      <h1 className="text-2xl mb-4">
        <span className="font-bold mr-2 text-3xl">Tabriklaymiz!</span>
        <span className="text-2xl">Siz talabalikka tavsiya etildingiz!</span>
      </h1>
      {application.score && <p className="text-xl">To‘plangan ball: {application.score}</p>}
      <h4>
        <span className="text-xl">Izoh:</span> {application.examComment}
      </h4>
    </div>
  )
}
