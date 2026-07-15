import { AdmissionTypeEnum } from '@/types/enum'

export const TEST_COUNT = 60

export const TEST_DURATION = 2 * 60 * 60 // 2 hours in seconds

// from current year down to 1990
const FIRST_GRADUATED_YEAR = 1990
export const GRADUATED_YEARS: number[] = Array.from(
  { length: new Date().getFullYear() - FIRST_GRADUATED_YEAR + 1 },
  (_, i) => new Date().getFullYear() - i
)
export const logoPath = '/logo.png'
export const logoDarkPath = '/logo.png'
export const universityName =
  'Филиал Федерального государственного бюджетного образовательного учреждения высшего образования «Национальный исследовательский университет «МЭИ» в городе Ташкенте'

export const guideVideoUrl = 'https://www.youtube.com/embed/C_5SRFcab-8'

export const TARGET_ADMISSION_TYPES = [
  {
    label: 'Bakalavriat',
    value: AdmissionTypeEnum.Bachelor,
    eduInstitutionTypes: [1, 2, 3, 4],
    isDiplomaFileRequired: false,
    eduLevelId: 11 // 1-course
  },
  {
    label: "Ikkinchi oliy ta'lim",
    value: AdmissionTypeEnum.SecondEducation,
    eduInstitutionTypes: [5], // second higher education
    isDiplomaFileRequired: true,
    eduLevelId: 12 // 2-course
  }
]
