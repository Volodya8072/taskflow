import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import { axiosWithAuth } from '@/api/interceptors'

class TaskService {
  private BASE_URL = '/user/tasks'

  async getTasks() {
    const { data } = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
    return data
  }

  async createTask(data: TypeTaskFormState) {
    const { data: created } = await axiosWithAuth.post(this.BASE_URL, data)
    return created
  }

  async updateTask(id: string, data: TypeTaskFormState) {
    const { data: updated } = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return updated
  }

  async deleteTask(id: string) {
    const { data: deleted } = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return deleted
  }
}

export const taskService = new TaskService()
