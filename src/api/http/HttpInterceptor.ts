import { clearStorage, getToken } from '@/api/services/storage.service'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class HttpInterceptor {
  constructor() {}

  public connect(client: AxiosInstance): void {
    client.interceptors.request.use(this.requestFulfilled, this.requestRejected)
    client.interceptors.response.use(this.responseFulfilled, this.responseRejected)
  }

  private requestFulfilled(config: InternalAxiosRequestConfig) {
    config.headers.setAuthorization(`Bearer ${getToken()}`)
    return config
  }

  private requestRejected(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error)
  }

  private responseFulfilled(response: AxiosResponse): AxiosResponse['data'] {
    // extract data field from axios response
    return response.data
  }

  private responseRejected(error: AxiosError): Promise<AxiosError> {
    const { status } = error

    if (status === 401 || status === 403) {
      clearStorage()
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
}
