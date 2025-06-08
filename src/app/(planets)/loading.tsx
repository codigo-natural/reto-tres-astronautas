export default function LoadingPlanets() {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      <div className='h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8'></div>
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
        <div className='h-10 bg-gray-300 dark:bg-gray-700 rounded w-full md:w-1/3'></div>
        <div className='h-10 bg-gray-300 dark:bg-gray-700 rounded w-full md:w-1/4'></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='bg-gray-200 dark:bg-gray-700 shadow-lg rounded-lg'
          >
            <div className='w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-t-lg'></div>
            <div className='p-4'>
              <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
