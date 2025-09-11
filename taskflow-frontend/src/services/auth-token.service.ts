import Cookies from 'js-cookie'

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}

const isProd = process.env.NODE_ENV === 'production'

export const getAccessToken = () => {
  return Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

export const saveAccessToken = (accessToken: string, days = 1) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    expires: days
  })
}

export const removeAccessToken = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd
  })
}
