import type { InputHTMLAttributes, PropsWithChildren } from 'react'

type CheckboxProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> & {
  id?: string
  extra?: string
}

const Checkbox = ({ id, extra, ...rest }: CheckboxProps) => {
  return (
    <label className={`relative inline-flex items-center ${extra ?? ''}`}>
      <input
        id={id}
        type="checkbox"
        className={`
          peer appearance-none h-5 w-5 rounded-md border border-gray-600
          bg-transparent checked:bg-transparent checked:border-none cursor-pointer
          outline-none
        `}
        {...rest}
      />
      <span
			className={`
				absolute left-0.5 top-0 hidden w-4 h-4 peer-checked:block
				before:block before:w-4 before:h-4 before:content-['✓'] before:text-white before:text-center before:text-xl
			`}
		/>
    </label>
  )
}

export default Checkbox

