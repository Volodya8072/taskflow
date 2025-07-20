import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='flex flex-col md:grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar />
			<main className='p-5 overflow-x-hidden max-h-screen relative'>
				<Header />
				{children}
			</main>
		</div>
	)
}
