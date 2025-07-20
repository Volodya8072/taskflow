import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ListView } from './list-view/ListView'


export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default function TasksPage() {
	return (
		<div className='flex flex-col gap-7'>
			<Heading title='Tasks' />
			<ListView />
		</div>
	)
}
