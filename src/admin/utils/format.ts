import dayjs from 'dayjs'

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDateTime = (date?: string) => {
  if (!date) return null

  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export const formatTime = (date?: string) => {
  if (!date) return null

  return dayjs(date).format('HH:mm')
}

export const numberFormat = (number_?: number) => {
  return new Intl.NumberFormat('ru').format(number_ ?? 0)
}

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.addEventListener('error', (error) => reject(error))
  })

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
}

export function formatToPhoneMask(value?: string): string {
  if (!value) return ''

  const clearedValue = value.replace(/\D/g, '')

  const formattedValue = generatePhoneMask(clearedValue)

  return formattedValue
}

export const generatePhoneMask = (cleaned: string) => {
  // +998 (99) 999 99 99

  if (cleaned.length < 12) cleaned = `998${cleaned}`

  const parts = [
    `+${cleaned.slice(0, 3)}`, // Country code
    `(${cleaned.slice(3, 5)})`, // First group (region/operator code)
    cleaned.slice(5, 8), // Second group (main number)
    cleaned.slice(8, 10), // Third group
    cleaned.slice(10, 12) // Fourth group
  ]

  // Filter out empty parts and format
  return parts.filter((part) => part.length > 0).join(' ')
}

export function clearPhoneMask(value: string = '', hidePlus = false) {
  const digits = value.replace(/\D/g, '') // Remove non-digit characters
  return hidePlus ? digits : `+${digits}`
}
