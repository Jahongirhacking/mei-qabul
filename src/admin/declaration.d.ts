declare module '*.module.css'
declare module '*.css'
declare module '*.mp4'
declare module '*.jpg'
declare module '*.png'
declare module '*.svg'

/// <reference types="vite/client" />

interface ImportMetaEnvironment {
  readonly APP_BASE_URL: string
  readonly APP_TITLE: string
  readonly APP_DESCRIPTION: string
  readonly APP_ONE_ID_URL: string
  readonly MODE: 'development' | 'production'
  readonly APP_YANDEX_QUERY_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment
}
