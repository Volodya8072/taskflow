import clsx from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useOutside } from '@/hooks/useOutside'
import { type FC } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import './DatePickerStyles.scss'

dayjs.extend(LocalizedFormat)

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  position?: 'left' | 'right'
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  position = 'right',
}) => {
  const { isShow: open, setIsShow: setOpen, ref } = useOutside(false)

  const selectedDate = value ? new Date(value) : undefined

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date.toISOString())
    } else {
      onChange('')
    }
    setOpen(false)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}>
        {value ? dayjs(value).format('LL') : 'Select a date'}
      </button>


      {open && (
        <div
          className={clsx(
            'absolute z-10 rounded-xl bg-[#191f1c] p-2.5 shadow slide',
            position === 'left' ? '-left-4' : '-right-4'
          )}
          style={{ top: 'calc(100% + 0.7rem)' }}
        >
          <DayPicker
            mode="single"
            startMonth={new Date(2023, 0)}
            endMonth={new Date(2054, 11)}
            autoFocus={open}
            defaultMonth={selectedDate}
            selected={selectedDate}
            onSelect={handleSelect}
            weekStartsOn={1}
          />
        </div>
      )}
    </div>
  )
}

