import { initReactI18next } from 'react-i18next'

import * as i18next from 'i18next'

import ru from './translations/ru.json'
import uz from './translations/uz.json'

const currentMode = import.meta.env.MODE

i18next.use(initReactI18next).init({
  debug: currentMode === 'development',
  lng: localStorage.getItem('lang') ?? 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false
  },
  resources: {
    uz: {
      translation: uz
    },
    ru: {
      translation: ru
    }
  }
} satisfies i18next.InitOptions)
