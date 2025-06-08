import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = false, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto')}
      >
        {label && (
          <label className='block text-sm font-medium text-gray-200'>
            {label}
          </label>
        )}
        <div className='relative'>
          <select
            ref={ref}
            className={cn(
              'w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg',
              'text-gray-100 placeholder:text-gray-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:ring-red-500',
              'appearance-none cursor-pointer',
              'hover:bg-gray-700/70 transition-colors duration-200',
              className
            )}
            {...props}
          >
            {children}
          </select>
          {/* Custom dropdown arrow */}
          <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
