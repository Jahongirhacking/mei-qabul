import { useTranslation } from 'react-i18next'

import { useGetAdmissionTypes } from '@/api/services/common.service'
import { useAdmissionStore } from '@/app/store/admissionStore'
import AnimatedButton from '@/components/AnimatedButton'
import { useSaveStepState } from '@/hooks/useSaveStepState'
import { cn } from '@/lib/utils'
import { AdmissionType } from '@/types/Classificatory'
import { AdmissionTypeEnum } from '@/types/enum'
import { Form } from 'antd'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LibraryBig,
  Move3d,
  SquareLibrary,
  Users
} from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

const admissionTypeIcons = [
  <BookOpen size={20} />,
  <GraduationCap size={20} />,
  <Move3d size={20} />,
  <LibraryBig size={20} />,
  <SquareLibrary size={20} />,
  <Users size={20} />
]

const disabledAdmissionTypes: AdmissionTypeEnum[] = []
const hiddenAdmissionTypes = [
  AdmissionTypeEnum.Technical,
  AdmissionTypeEnum.Target,
  AdmissionTypeEnum.SecondEducation,
  AdmissionTypeEnum.Magistracy
]

export function AdmissionStep2() {
  const { t } = useTranslation()
  const { data: admissionTypes = [] } = useGetAdmissionTypes()

  const { eduTypeId, admissionTypeId } = useAdmissionStore(useShallow((state) => state.stepState))
  const setCurrentStep = useAdmissionStore((state) => state.setCurrentStep)
  const changeStepState = useAdmissionStore((state) => state.changeStepState)
  const { saveStepState, saveStepStateLoading } = useSaveStepState({
    onSuccess() {
      setCurrentStep(3)
    }
  })

  const isNextDisabled = !eduTypeId

  const nextStep = () => {
    saveStepState()
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const handleSelectAdmissionType = ({
    id: admissionTypeId,
    eduTypeId,
    eduLevels
  }: AdmissionType) => {
    if (eduLevels.length === 1) {
      changeStepState({ admissionTypeId, eduTypeId, eduLevelId: eduLevels[0].id, eduLevels })
    } else {
      changeStepState({ admissionTypeId, eduTypeId, eduLevelId: undefined, eduLevels })
    }
  }

  return (
    <div className="md:min-w-[500px]">
      <h1 className="font-semibold text-lg mb-6">{t('admission.admissionTypes')}</h1>

      <div className="grid md:grid-cols-1 gap-4">
        {admissionTypes
          .filter((item) => !hiddenAdmissionTypes.includes(item.id))
          .map((item, index) => (
            <div className="relative" key={item.id}>
              <button
                disabled={disabledAdmissionTypes.includes(item.id)}
                onClick={() => handleSelectAdmissionType(item)}
                className={cn(
                  'w-full p-4 flex justify-center items-center rounded-xl border-2 border-transparent bg-white shadow-md',
                  {
                    'hover:border-university-primary hover:bg-university-primary/10':
                      !disabledAdmissionTypes.includes(item.id),
                    'border-university-primary bg-university-primary/10':
                      admissionTypeId === item.id,
                    'cursor-not-allowed opacity-50': disabledAdmissionTypes.includes(item.id)
                  }
                )}
              >
                <div className="font-medium flex items-center gap-2">
                  <p className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                    {admissionTypeIcons[index]}
                  </p>
                  <span>{item.name}</span>
                </div>
              </button>

              {disabledAdmissionTypes.includes(item.id) && (
                <span className="text-sm opacity-80 text-muted-foreground text-red-500 absolute bottom-1 right-1">
                  {t('common.soon')}
                </span>
              )}
            </div>
          ))}
      </div>

      <Form layout="vertical">
        <div className="mt-6 flex justify-between">
          <AnimatedButton variant="secondary" onClick={prevStep}>
            <ChevronLeft size={20} /> {t('action.back')}
          </AnimatedButton>

          <AnimatedButton
            disabled={isNextDisabled}
            loading={saveStepStateLoading}
            onClick={nextStep}
          >
            {t('action.next')} <ChevronRight size={20} />
          </AnimatedButton>
        </div>
      </Form>
    </div>
  )
}
