import { createRoot } from 'react-dom/client'

import '@/app/i18n/init'

import App from './App'
import './global.css'

createRoot(document.getElementById('root')!).render(<App />)
