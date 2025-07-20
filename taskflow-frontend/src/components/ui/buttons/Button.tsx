import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'linear rounded-xl bg-transparent border border-[#353435] py-2 px-7 text-base font-medium text-white transition hover:bg-[#353435] active:bg-slate-600',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
