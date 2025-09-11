import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { errorCatch } from './error'
import { getAccessToken, removeAccessToken } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

const axiosClassic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Додаємо токен до всіх запитів
axiosWithAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  console.log('Sending token:', token) // дебаг
  if (token) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Обробка відповіді та автоматичне оновлення токена
axiosWithAuth.interceptors.response.use(
  response => response,
  async (error: AxiosError & { config?: InternalAxiosRequestConfig & { _isRetry?: boolean } }) => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (err) {
        if (errorCatch(err) === 'jwt expired') removeAccessToken()
      }
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }
