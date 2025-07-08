import { AdmissionTypeEnum } from '@/types/enum'

export const TEST_COUNT = 60

export const TEST_DURATION = 2 * 60 * 60 // 2 hours in seconds

// from 2015 to 2025
export const GRADUATED_YEARS: number[] = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
  2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000
]
export const logoPath = '/logo.png'
export const logoDarkPath = '/logo.png'

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
