import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import type { ITaskResponse } from '@/types/task.types'
import { FILTERS } from './columns.data'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

// Утиліти для перевірки дат
const isToday = (date?: string) =>
	date ? dayjs(date).isSame(FILTERS.today, 'day') : false

const isTomorrow = (date?: string) =>
	date ? dayjs(date).isSame(FILTERS.tomorrow, 'day') : false

const isThisWeek = (date?: string) =>
	date ? dayjs(date).isSameOrBefore(FILTERS['on-this-week']) : false

const isNextWeek = (date?: string) =>
	date
		? dayjs(date).isAfter(FILTERS['on-this-week']) &&
		  dayjs(date).isSameOrBefore(FILTERS['on-next-week'])
		: false

const isLater = (date?: string) =>
	!date || dayjs(date).isAfter(FILTERS['on-next-week'])

export const filterTasks = (
	tasks: ITaskResponse[] | undefined,
	filter: string
) => {
	if (!tasks) return []

	const filters: Record<string, (task: ITaskResponse) => boolean> = {
		today: task => isToday(task.createdAt) && !task.isCompleted,
		tomorrow: task => isTomorrow(task.createdAt) && !task.isCompleted,
		'on-this-week': task =>
			!isToday(task.createdAt) &&
			!isTomorrow(task.createdAt) &&
			isThisWeek(task.createdAt) &&
			!task.isCompleted,
		'on-next-week': task =>
			isNextWeek(task.createdAt) && !task.isCompleted,
		later: task => isLater(task.createdAt) && !task.isCompleted,
		completed: task => task.isCompleted,
	}

	return tasks.filter(filters[filter] ?? (() => false))
}
