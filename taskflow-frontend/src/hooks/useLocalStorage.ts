import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IUseLocalStorage<T> {
  key: string
  defaultValue: T
}

export function useLocalStorage<T>({
  key,
  defaultValue
}: IUseLocalStorage<T>): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  // Зчитування зі сховища при першому рендері
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Error reading localStorage key:', key, err)
    } finally {
      setIsLoading(false)
    }
  }, [key])

  // Синхронізація значення при зміні
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Error setting localStorage key:', key, err)
    }
  }, [key, value])

  return [value, setValue, isLoading]
}
