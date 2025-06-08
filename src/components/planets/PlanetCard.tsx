'use client'

import { useRouter } from 'next/navigation'
import { Planet } from '@/types'
import { formatNumber, formatTime } from '@/lib/utils'
import { FaStar } from 'react-icons/fa'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PlanetCardProps {
  planet: Planet
}

export const PlanetCard = ({ planet }: PlanetCardProps) => {
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    router.push(`/${planet.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(planet.id)
  }

  const massValue = planet.mass?.massValue ?? 0
  const massExponent = planet.mass?.massExponent ?? 0
  const radius = planet.meanRadius ?? 0
  const orbitalPeriod = planet.sideralOrbit ?? 0
  const rotationPeriod = planet.sideralRotation ?? 0
  const moonsCount = planet.moons?.length ?? 0
  const imageUrl = planet.imageUrl || '/placeholder-planet.jpg'

  const favoriteButton = mounted ? (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleFavoriteClick}
      className='absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80'
      aria-label={
        isFavorite(planet.id) ? 'Remove from favorites' : 'Add to favorites'
      }
    >
      <FaStar
        className={`text-xl ${
          isFavorite(planet.id) ? 'text-yellow-400' : 'text-gray-400'
        }`}
      />
    </motion.button>
  ) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className='relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl'
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      aria-label={`View details of ${planet.englishName}`}
    >
      <div className='relative w-full h-48 overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={imageUrl}
          alt={`Image of ${planet.englishName}`}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent' />
        {favoriteButton}
      </div>

      <div className='p-6'>
        <div className='flex justify-between items-start mb-4'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            {planet.englishName}
          </h2>
        </div>

        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>Mass:</span>
            <span className='font-medium text-gray-900 dark:text-white'>
              {massValue && massExponent
                ? `${formatNumber(massValue, massExponent)} kg`
                : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>Radius:</span>
            <span className='font-medium text-gray-900 dark:text-white'>
              {radius ? `${formatNumber(radius)} km` : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>
              Orbital Period:
            </span>
            <span className='font-medium text-gray-900 dark:text-white'>
              {orbitalPeriod ? `${formatTime(orbitalPeriod)} days` : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>
              Rotation Period:
            </span>
            <span className='font-medium text-gray-900 dark:text-white'>
              {rotationPeriod ? `${formatTime(rotationPeriod)} hours` : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>Moons:</span>
            <span className='font-medium text-gray-900 dark:text-white'>
              {moonsCount} {moonsCount === 1 ? 'moon' : 'moons'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
