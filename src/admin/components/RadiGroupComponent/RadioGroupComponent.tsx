import { useEffect } from 'react'

import { useParamActions } from '@/admin/hooks/useParamAction'
import { AdmissionTypeIdEnum } from '@/admin/types/enum'
import { Radio, RadioChangeEvent } from 'antd'

type Props = {
  setAdmissionTypeId: (id: number) => void
}
export default function RadioGroupComponent({ setAdmissionTypeId }: Props) {
  const { searchParams, setParam } = useParamActions()
  const admissionTypeId = Number(searchParams.get('tab'))

  useEffect(() => {
    if (admissionTypeId) setAdmissionTypeId(admissionTypeId)
    else setAdmissionTypeId(AdmissionTypeIdEnum.BAKALAVR)
  }, [admissionTypeId])

  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value
    setParam('tab', value)
  }

  return (
    <Radio.Group
      onChange={onChange}
      value={admissionTypeId || AdmissionTypeIdEnum.BAKALAVR}
      style={{ marginBottom: 16 }}
    >
      <Radio.Button value={AdmissionTypeIdEnum.BAKALAVR}>Bakalavr</Radio.Button>
      <Radio.Button value={AdmissionTypeIdEnum.MAGISTR}>Magistratura</Radio.Button>
      <Radio.Button value={AdmissionTypeIdEnum.TRANSFER}>O'qishni ko'chirish</Radio.Button>
      <Radio.Button value={AdmissionTypeIdEnum.SECOND_DEGREE}>Ikkinchi ta'lim</Radio.Button>
      <Radio.Button value={AdmissionTypeIdEnum.TARGET_ADMISSION}>Maqsadli qabul</Radio.Button>
      <Radio.Button value={AdmissionTypeIdEnum.TECHNICAL}>Texnikum bitiruvchilari</Radio.Button>
    </Radio.Group>
  )
}
