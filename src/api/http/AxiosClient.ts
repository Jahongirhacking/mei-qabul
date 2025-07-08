import { HttpInterceptor } from '@/api/http/HttpInterceptor'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export class AxiosClient {
  private readonly axiosInstance: AxiosInstance

  constructor(options: CreateAxiosDefaults, interceptor: HttpInterceptor) {
    this.axiosInstance = axios.create(options)

    interceptor.connect(this.axiosInstance)
  }

  public get<R>(url: string, options?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.get<R, R>(url, options)
  }

  public post<R, B>(url: string, body: B, options?: AxiosRequestConfig<B>): Promise<R> {
    return this.axiosInstance.post<R, R>(url, body, options)
  }

  public put<R, B>(url: string, body?: B, options?: AxiosRequestConfig<B>): Promise<R> {
    return this.axiosInstance.put<R, R>(url, body, options)
  }

  public patch<R, B>(url: string, body?: B, options?: AxiosRequestConfig<B>): Promise<R> {
    return this.axiosInstance.patch<R, R>(url, body, options)
  }

  public delete<R>(url: string, options?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.delete<R, R>(url, options)
  }
}
