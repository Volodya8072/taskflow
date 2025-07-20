import { LoaderIcon } from "lucide-react"

const Loader = () => {
	return (
		<div className='flex justify-center items-center'>
			<LoaderIcon className="animate-spin h-10 w-10 text-white "/>
		</div>
	)
}

export default Loader
