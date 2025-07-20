import { DropResult } from '@hello-pangea/dnd'
import { FILTERS } from '../columns.data'
import { useUpdateTask } from './useUpdateTask'

export function useTaskDnd() {
  const { updateTask } = useUpdateTask()

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    try {
      if (destination.droppableId === 'completed') {
        await updateTask({
          id: draggableId,
          data: { isCompleted: true },
        })
        return
      }

      const newCreatedAt = FILTERS[destination.droppableId]?.format()

      await updateTask({
        id: draggableId,
        data: {
          createdAt: newCreatedAt,
          isCompleted: false,
        },
      })
    } catch (error) {
      console.error('Failed to update task on drag end:', error)
    }
  }

  return { onDragEnd }
}
