import type { AxiosRequestConfig, AxiosError } from 'axios'
import { instance as axiosInstance } from './axiosInstance'
import type { IMeta } from '../../types'
import { getBaseUrl } from '../config/envConfig'


interface AxiosRequestArgs {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  meta?: IMeta
  contentType?: string
}

interface SuccessResponse<T> {
  data: T
}

interface ErrorResponse {
  error: {
    status?: number
    data: any
  }
}

export async function axiosRequest<T = any>(
  args: AxiosRequestArgs
): Promise<SuccessResponse<T> | ErrorResponse> {
  const { url, method, data, params, contentType } = args
  const baseUrl = getBaseUrl()

  try {
    const response = await axiosInstance({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    })

    return { data: response.data }
  } catch (error) {
    const err = error as AxiosError
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}
