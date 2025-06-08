'use client'

import { FavoriteButton } from './FavoriteButton'

interface FavoriteWrapperProps {
  planetId: string
}

export const FavoriteWrapper = ({ planetId }: FavoriteWrapperProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className='absolute top-2 right-2 z-10' onClick={handleFavoriteClick}>
      <FavoriteButton planetId={planetId} />
    </div>
  )
}
