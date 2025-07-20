import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { TypeTaskFormState, ITaskResponse } from '@/types/task.types'
import { taskService } from '@/services/task.service'

export function useCreateTask() {
  const queryClient = useQueryClient()

  const mutation: UseMutationResult<
    AxiosResponse<ITaskResponse>, 
    Error,                       
    TypeTaskFormState             
  > = useMutation({
    mutationKey: ['tasks', 'create'],
    mutationFn: (taskData: TypeTaskFormState) => taskService.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    createTask: mutation.mutate,
    isCreating: mutation.status === 'pending',
    error: mutation.error ?? null,
  }
}
