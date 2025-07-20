import Link from 'next/link'

import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div className=''>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center rounded-xl py-1.5 mt-2 px-5 transition-colors hover:bg-[#353435]'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
