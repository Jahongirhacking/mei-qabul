import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { Loader } from "@/components/Loader"
import { IApplicationInfoResponseForQrCode } from "@/types/User"
import { Button } from "antd"
import axios from "axios"
import { Download } from "lucide-react"

import "./QrCodeApplicationInfoPage.css"

export default function QrCodeApplicationInfoPage() {
  const { id } = useParams()
  const [data, setData] = useState<IApplicationInfoResponseForQrCode>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://qabul.kuaf.uz/api/application/qr-code/${id}`)
      if (response.data) {
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.error("Qr code malumotlarini olishda xatolik:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
    }
  }, [id])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="qrcode-container">
      <div className="qrcode-title-container">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="w-32" />
        </Link>
        <h2>{data?.university}</h2>
      </div>
      <div className="qrcode-data-container">
        <h2>Ariza malumotlari</h2>
        <div className="qrcode-data-item-container">
          <div className="qrcode-data-item white">
            <p className="qrcode-key">F.I.O</p>
            <p className="qrcode-value">
              {data?.lastName} {data?.firstName} {data?.fatherName}
            </p>
          </div>
          <div className="qrcode-data-item grey">
            <p className="qrcode-key">Ta'lim shakli:</p>
            <p className="qrcode-value">{data?.degree}</p>
          </div>
          <div className="qrcode-data-item white">
            <p className="qrcode-key">Mutaxassisligi va kodi:</p>
            <p className="qrcode-value">
              {data?.speciality} - {data?.specialityCode}
            </p>
          </div>
          <div className="qrcode-data-item grey">
            <p className="qrcode-key">Ariza fayli:</p>
            <a href={data?.url} download target="_blank">
              <Button icon={<Download size={16} />}>Yuklab olish</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
