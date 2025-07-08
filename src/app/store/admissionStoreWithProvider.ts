import { createContext, useContext } from 'react'

import { saveUserStepState } from '@/api/services/user.service'
import { EduLevel } from '@/types/Classificatory'
import { ExamTypeEnum } from '@/types/enum'
import { createStore, useStore } from 'zustand'

export type AdmissionStore = ReturnType<typeof initializeAdmissionStore>

const AdmissionContext = createContext<AdmissionStore | null>(null)

export const Provider = AdmissionContext.Provider

export const useAdmissionStore = <T>(selector: (state: State) => T) => {
  const store = useContext(AdmissionContext)

  if (!store) throw new Error('AdmissionStore is missing the provider')

  return useStore(store, selector)
}

type StepState = {
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

export const initializeAdmissionStore = (
  initialState: AdmissionStepState = {} as AdmissionStepState
) =>
  createStore<State>((set, get) => {
    return {
      stepState: {},
      currentStep: 1,
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      changeStepState: (newState) =>
        set((state) => ({ stepState: { ...state.stepState, ...newState } })),
      saveStepState: () => {
        const { stepState, currentStep } = get()

        return saveUserStepState({
          stepState,
          currentStep
        })
      }
    } satisfies State
  })
