import { saveUserStepState } from '@/api/services/user.service'
import { EduLevel } from '@/types/Classificatory'
import { AdmissionTypeEnum, ExamTypeEnum } from '@/types/enum'
import { create } from 'zustand'

export type StepState = {
  eduTypeId: number
  eduLevelId: number
  specialtyId: number
  degreeId: number
  examType: ExamTypeEnum
  admissionTypeId: number
  eduInstitutionTypeId: number
  languageId: number
  graduatedYear: number
  eduLevels: EduLevel[]
  speciality: string
  university: string
  diplomaUrl: string
}

export type AdmissionStepState = {
  stepState: Partial<StepState>
  currentStep: number
}

type State = AdmissionStepState & {
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  changeStepState: (stepState: Partial<StepState>) => void
  saveStepState: () => ReturnType<typeof saveUserStepState>
}

export const useAdmissionStore = create<State>((set, get) => ({
  stepState: { admissionTypeId: AdmissionTypeEnum.Bachelor },
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  changeStepState: (newState) =>
    set((state) => ({ stepState: { ...state.stepState, ...newState } })),
  saveStepState: () => {
    const { stepState, currentStep } = get()

    return saveUserStepState({
      stepState,
      currentStep: currentStep + 1
    })
  }
}))
