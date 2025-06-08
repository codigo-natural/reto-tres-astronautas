'use client'

import Image from 'next/image'
import { Planet } from '@/types'
import { formatNumber, formatTime } from '@/lib/utils'
import { FavoriteButton } from './FavoriteButton'
import {
  FaGlobeAmericas,
  FaWeightHanging,
  FaRulerCombined,
  FaTemperatureHigh,
  FaSun,
  FaMoon,
  FaUserAstronaut,
  FaCalendarAlt,
  FaAngleDoubleUp,
} from 'react-icons/fa'

interface PlanetDetailViewProps {
  planet: Planet
}

const DetailItem: React.FC<{
  icon: React.ReactNode
  label: string
  value: string | number | undefined | null
}> = ({ icon, label, value }) => {
  if (value === undefined || value === null || value === '') return null
  return (
    <section className='group relative flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

      <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      <span className='text-blue-500 dark:text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300'>
        {icon}
      </span>
      <div className='relative z-10'>
        <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
          {label}
        </p>
        <p className='text-md text-gray-800 dark:text-gray-100 font-medium'>
          {String(value)}
        </p>
      </div>
    </section>
  )
}

export const PlanetDetailView = ({ planet }: PlanetDetailViewProps) => {
  const massValue = planet.mass?.massValue ?? 0
  const massExponent = planet.mass?.massExponent ?? 0
  const radius = planet.meanRadius ?? 0
  const orbitalPeriod = planet.sideralOrbit ?? 0
  const moonsCount = planet.moons?.length ?? 0

  return (
    <main className='container mx-auto px-4 py-8'>
      <article className='bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
        <div className='md:flex'>
          <figure className='md:w-1/2 relative min-h-[300px] md:min-h-0'>
            <Image
              src={planet.imageUrl || '/placeholder-planet.png'}
              alt={`Image of ${planet.englishName}`}
              fill
              className='object-cover'
              priority
            />
          </figure>
          <section className='md:w-1/2 p-6 md:p-8'>
            <header className='flex justify-between items-start mb-4'>
              <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'>
                {planet.englishName}
              </h1>
              <FavoriteButton planetId={planet.id} />
            </header>
            {planet.name !== planet.englishName && (
              <p className='text-lg text-gray-500 dark:text-gray-400 mb-1'>
                ({planet.name})
              </p>
            )}
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
              A fascinating {planet.bodyType?.toLowerCase()}
              system.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <DetailItem
                icon={<FaGlobeAmericas />}
                label='Type'
                value={planet.bodyType}
              />
              <DetailItem
                icon={<FaWeightHanging />}
                label='Mass'
                value={
                  massValue && massExponent
                    ? `${formatNumber(massValue, massExponent)} kg`
                    : 'N/A'
                }
              />
              <DetailItem
                icon={<FaRulerCombined />}
                label='Mean Radius'
                value={radius ? `${formatNumber(radius)} km` : 'N/A'}
              />
              <DetailItem
                icon={<FaTemperatureHigh />}
                label='Avg. Temp.'
                value={
                  planet.avgTemp
                    ? `${planet.avgTemp - 273.15}°C (${planet.avgTemp}K)`
                    : 'N/A'
                }
              />
              <DetailItem
                icon={<FaSun />}
                label='Sidereal Orbit'
                value={
                  orbitalPeriod ? `${formatTime(orbitalPeriod)} days` : 'N/A'
                }
              />
              <DetailItem icon={<FaMoon />} label='Moons' value={moonsCount} />
              <DetailItem
                icon={<FaUserAstronaut />}
                label='Discovered By'
                value={planet?.discoveredBy || 'N/A'}
              />
              <DetailItem
                icon={<FaCalendarAlt />}
                label='Discovery Date'
                value={planet.discoveryDate || 'N/A'}
              />
              <DetailItem
                icon={<FaAngleDoubleUp />}
                label='Axial Tilt'
                value={planet.axialTilt ? `${planet.axialTilt}°` : 'N/A'}
              />
              <DetailItem
                icon={<FaRulerCombined />}
                label='Gravity'
                value={planet.gravity ? `${planet.gravity} m/s²` : 'N/A'}
              />
              <DetailItem
                icon={<FaRulerCombined />}
                label='Density'
                value={planet.density ? `${planet.density} g/cm³` : 'N/A'}
              />
            </div>
          </section>
        </div>
      </article>

      {planet.moons && planet.moons.length > 0 && (
        <section className='mt-8 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg'>
          <h2 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-white'>
            Moons ({planet.moons.length})
          </h2>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {planet.moons.map((moon) => {
              const moonName = moon.rel.split('/').pop() || ''
              const displayName =
                moonName.charAt(0).toUpperCase() + moonName.slice(1)
              return (
                <li
                  key={moonName}
                  className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400'></div>
                    <h3 className='text-lg font-medium text-gray-800 dark:text-gray-100'>
                      {displayName}
                    </h3>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </main>
  )
}
