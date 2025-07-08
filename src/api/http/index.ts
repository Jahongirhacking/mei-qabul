import { AxiosClient } from '@/api/http/AxiosClient'
import { HttpInterceptor } from '@/api/http/HttpInterceptor'
import type { CreateAxiosDefaults } from 'axios'

export const HOST = 'https://qabul.mpei.uz/api'

const options: CreateAxiosDefaults = {
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30_000 // default 30s
}
export const httpService = new AxiosClient(options, new HttpInterceptor())
