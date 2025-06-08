import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type = 'text', ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-gray-200 mb-1.5'>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg',
            'text-gray-100 placeholder:text-gray-400',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500',
            'hover:bg-gray-700/70 transition-colors duration-200',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
