import { useState } from 'react'

import { useAdmissionStore } from '@/app/store/admissionStore'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
  onSuccess?: () => void
}

export const useSaveStepState = ({ onSuccess }: Props = {}) => {
  const [loading, setLoading] = useState(false)
  const handleSaveStepState = useAdmissionStore((state) => state.saveStepState)

  async function saveStepState() {
    try {
      setLoading(true)

      await handleSaveStepState()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Qabul ma'lumotlarini saqlashda xatolik yuz berdi!")
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    saveStepStateLoading: loading,
    saveStepState
  }
}
