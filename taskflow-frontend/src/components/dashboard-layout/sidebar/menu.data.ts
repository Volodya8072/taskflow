import { Wrench , TextSelect,CalendarHeart  } from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: TextSelect,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard'
	},
	{
		icon: CalendarHeart,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	{
		icon: Wrench ,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	}
]
