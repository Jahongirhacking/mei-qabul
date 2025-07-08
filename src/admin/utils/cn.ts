import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDegreeName = (degreeId: number): string => {
  const degreeNames: Record<number, string> = {
    11: 'Kunduzgi',
    12: 'Kechki',
    13: 'Sirtqi',
    14: 'Maqsadli qabul',
    16: 'Masofaviy',
    17: 'Qo‘shma',
    15: 'Ikkinchi oliy (sirtqi)',
    18: 'Ikkinchi oliy (kunduzgi)',
    19: 'Ikkinchi oliy (kechki)'
  }

  return degreeNames[degreeId] || "Noma'lum daraja"
}

export const numberFormatter = (value?: string | number) =>
  `${value}`.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const years = Array.from({ length: new Date().getFullYear() - 2015 }, (_, i) => ({
  label: 2016 + i,
  value: 2016 + i
})).reverse()
