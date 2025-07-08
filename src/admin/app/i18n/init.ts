import { initReactI18next } from 'react-i18next'

import { use } from 'i18next'

import uz from './translations/uz.json'

use(initReactI18next).init({
  debug: false,
  fallbackLng: 'uz',
  interpolation: {
    escapeValue: false
  },
  resources: {
    uz: {
      translation: uz
    }
  }
})
