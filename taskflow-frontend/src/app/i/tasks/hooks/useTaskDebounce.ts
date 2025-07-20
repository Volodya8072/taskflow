import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeTaskFormState } from '@/types/task.types'
import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'

interface IUseTaskDebounce {
  watch: UseFormWatch<TypeTaskFormState>
  itemId?: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
  const { createTask } = useCreateTask()
  const { updateTask } = useUpdateTask()

  // debounce для створення
  const debouncedCreateTask = useCallback(
    debounce(async (formData: TypeTaskFormState) => {
      try {
    	 createTask(formData)
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    }, 444),
    [createTask]
  )

  // debounce для оновлення
  const debouncedUpdateTask = useCallback(
    debounce(async (formData: TypeTaskFormState) => {
      if (!itemId) return
      try {
        await updateTask({ id: itemId, data: formData })
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    }, 666),
    [updateTask, itemId]
  )

  useEffect(() => {
    const subscription = watch(formData => {
      if (itemId) {
        debouncedUpdateTask({
          ...formData,
          priority: formData.priority || undefined,
        })
      } else {
        debouncedCreateTask(formData)
      }
    })

    return () => {
      subscription.unsubscribe()
      // очищаємо debounce при демонтфжі
      debouncedCreateTask.cancel()
      debouncedUpdateTask.cancel()
    }
  }, [watch, itemId, debouncedCreateTask, debouncedUpdateTask])
}
