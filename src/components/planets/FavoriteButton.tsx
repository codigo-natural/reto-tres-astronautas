'use client'

import { FaStar } from 'react-icons/fa'
import { useFavoritesStore } from '@/store/favoritesStore'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FavoriteButtonProps {
  planetId: string
  className?: string
}

export const FavoriteButton = ({
  planetId,
  className = '',
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
        aria-label='Loading favorites...'
      >
        <FaStar className='w-5 h-5 text-gray-300 dark:text-gray-600' />
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(planetId)
      }}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={
        isFavorite(planetId) ? 'Remove from favorites' : 'Add to favorites'
      }
    >
      <motion.div
        animate={{
          scale: isFavorite(planetId) ? [1, 1.3, 1] : 1,
          rotate: isFavorite(planetId) ? [0, 15, -15, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.175, 0.885, 0.32, 1.275],
          times: [0, 0.2, 0.5, 1],
        }}
      >
        <FaStar
          className={`w-5 h-5 transition-colors duration-500 ease-in-out ${
            isFavorite(planetId)
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      </motion.div>
    </motion.button>
  )
}
