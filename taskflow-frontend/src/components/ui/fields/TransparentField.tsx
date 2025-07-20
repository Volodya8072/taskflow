import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type TransparentFieldProps = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TransparentFieldProps>(
  ({ className, ...rest }, ref) => {
    const defaultClasses =
      'w-full border-none bg-transparent focus:outline-none focus:shadow-transparent'

    return (
      <input
        ref={ref}
        className={clsx(defaultClasses, className)}
        {...rest}
      />
    )
  }
)

TransparentField.displayName = 'TransparentField'
