import Link from 'next/link'
import { FaRocket, FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center px-4'>
      <div className='text-center space-y-8'>
        {/* Animated Stars Background */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className='absolute w-1 h-1 bg-white rounded-full animate-twinkle'
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className='relative z-10'>
          <h1 className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
            404
          </h1>
          <div className='mt-4 space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-300'>
              Houston, we have a problem!
            </h2>
            <p className='text-gray-400 max-w-md mx-auto'>
              Looks like this planet is not in our solar system. The page you&apos;re
              looking for has drifted into deep space.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/'
              className='inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium'
            >
              <FaHome className='mr-2' />
              Return to Earth
            </Link>
            <Link
              href='/'
              className='inline-flex items-center px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-200 text-white font-medium'
            >
              <FaRocket className='mr-2' />
              Explore Planets
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm'>
          <p>
            Lost in space? Don&apos;t worry, we&apos;ll help you find your way
            back.
          </p>
        </div>
      </div>
    </div>
  )
}
