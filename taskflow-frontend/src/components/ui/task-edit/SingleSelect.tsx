import cn from 'clsx'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useOutside } from '@/hooks/useOutside'

export interface IOption {
  label: string
  value: string
}

interface SingleSelectProps {
  data: IOption[]
  value: string
  onChange: (value: string) => void
  isColorSelect?: boolean
}

export function SingleSelect({
  data,
  value,
  onChange,
  isColorSelect,
}: SingleSelectProps) {
  const { isShow: open, setIsShow: setOpen, ref } = useOutside(false)

  const selectedOption = data.find(option => option.value === value)

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange('')
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div
      ref={ref}
      className={cn('relative min-w-10', { 'w-max': isColorSelect })}
    >
      <button onClick={handleToggle}>
        {selectedOption ? (
          <Badge
            variant={selectedOption.value}
            className="capitalize"
            style={isColorSelect ? { backgroundColor: selectedOption.value } : {}}
          >
            {selectedOption.label}
          </Badge>
        ) : (
          <Badge>Select to priority</Badge>
        )}
      </button>

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-0 right-0 opacity-30 hover:opacity-50 transition-opacity"
        >
          <X size={16} />
        </button>
      )}

      {open && (
        <div
          className="absolute w-full p-2.5 left-0 slide bg-[#131718] z-10 shadow rounded-xl"
          style={{ top: 'calc(100% + 0.5rem)' }}
        >
          {data.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={e => {
                e.preventDefault()
                onChange(option.value)
                setOpen(false)
              }}
              className="block mb-4 last:mb-0 capitalize rounded-lg"
              style={isColorSelect ? { backgroundColor: option.value } : {}}
            >
              <Badge variant={option.value}>{option.label}</Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
