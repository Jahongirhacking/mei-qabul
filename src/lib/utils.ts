import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function openInNewTab(url: string) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function checkIsValidValues(obj: Record<string, unknown>) {
  return Object.values(obj).every(Boolean)
}
