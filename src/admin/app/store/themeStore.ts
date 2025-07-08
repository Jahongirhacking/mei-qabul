import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'

type ThemeStore = {
  theme: ThemeMode
  changeTheme: (mode: ThemeMode) => void
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: (document.documentElement.dataset.theme || 'light') as ThemeMode,
  changeTheme: (mode: ThemeMode) => {
    set({ theme: mode })
    localStorage.setItem('theme', mode)
  }
}))
