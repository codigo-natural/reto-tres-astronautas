export default function LoadingPlanetDetail() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
        <div className='md:flex'>
          {/* Planet Image Skeleton */}
          <div className='md:w-1/2 relative min-h-[300px] md:min-h-0'>
            <div className='w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          </div>

          {/* Planet Info Skeleton */}
          <div className='md:w-1/2 p-6 md:p-8'>
            <div className='flex justify-between items-start mb-4'>
              <div className='h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
              <div className='h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse'></div>
            </div>
            <div className='h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6'></div>
            <div className='h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
          </div>
        </div>

        {/* Planet Details Grid Skeleton */}
        <div className='p-6 md:p-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className='flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md'
              >
                <div className='w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse'></div>
                <div className='flex-1'>
                  <div className='h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2'></div>
                  <div className='h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moons Section Skeleton */}
        <div className='mt-8 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg'>
          <div className='h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600'
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse'></div>
                  <div className='h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
