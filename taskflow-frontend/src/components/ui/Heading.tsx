interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div className="pt-1.5">
			<h1 className='text-lg md:text-3xl font-normal md:font-medium'>{title}</h1>
		</div>
	)
}
