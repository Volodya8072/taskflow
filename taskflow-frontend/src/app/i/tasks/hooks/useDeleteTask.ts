import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { taskService } from '@/services/task.service'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  const mutation: UseMutationResult<
    AxiosResponse<any>, 
    Error,             
    string              
  > = useMutation({
    mutationKey: ['tasks', 'delete'],
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    deleteTask: mutation.mutate,
    isDeleting: mutation.status === 'pending',
    error: mutation.error ?? null,
  }
}
