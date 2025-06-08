interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  const baseClasses =
    'bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'
  const clickableClasses = onClick
    ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300'
    : ''
  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
