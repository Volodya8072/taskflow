'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<div
						className='bg-[#222222] rounded p-5 md:p-10 text-center hover:-translate-y-3 transition-transform duration-300'
						key={statistic.label}
					>
						<div className='text-xl'>{statistic.label}</div>
						<div className='text-3xl font-semibold'>{statistic.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}
