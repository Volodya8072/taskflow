'use client'

import { AlignEndVertical, GanttChartSquare } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	return (
		<div className='border-r border-r-[#353435] h-full bg-[#232424] flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-7 border-b border-b-[#353435]'>

						<AlignEndVertical 
							size={35}/>
							
					<span className='text-2xl font-bold relative'>
						TaskFlow
					</span>
				</Link>
				<div className='p-2 relative'>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
