import { forwardRef } from 'react'
import clsx from 'clsx'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  extra?: string
  state?: 'error' | 'success'
  isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      extra,
      type = 'text',
      placeholder,
      state,
      disabled,
      isNumber,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        isNumber &&
        !/[0-9]/.test(event.key) &&
        !['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(
          event.key
        )
      ) {
        event.preventDefault()
      }
    }

    return (
      <div className={extra}>
        <label
          htmlFor={id}
          className="ml-1.5 text-sm font-medium text-white/60 dark:text-white"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={clsx(
            'mt-2 flex w-full items-center justify-center rounded-xl border bg-transparent p-3 text-base outline-none placeholder:font-normal placeholder:text-white/30 transition-colors duration-500 focus:border-[#353435]',
            {
              '!border-none !bg-gray-200 dark:!bg-white/20 dark:placeholder:!text-[rgba(255,255,255,0.40)]':
                disabled,
              'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400':
                state === 'error',
              'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400':
                state === 'success',
              'border-[#353435]': !state && !disabled,
            }
          )}
          {...rest}
        />
      </div>
    )
  }
)

Field.displayName = 'Field'
