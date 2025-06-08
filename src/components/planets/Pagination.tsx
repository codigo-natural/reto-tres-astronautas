'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Button } from '../ui/Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setIsLoading(true)
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())

      try {
        await router.push(`${pathname}?${params.toString()}`, { scroll: false })
      } finally {
        setIsLoading(false)
      }
    },
    [searchParams, router, pathname]
  )

  if (totalPages <= 1) return null

  return (
    <div className='flex flex-col items-center space-y-4 my-8'>
      <div className='flex items-center space-x-4'>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage || isLoading}
          variant='outline'
          className='flex items-center space-x-2 px-4 py-2 border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <FaChevronLeft className='w-4 h-4' />
          <span>Previous</span>
        </Button>

        <div className='flex items-center space-x-2'>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1
            const isCurrentPage = pageNumber === currentPage
            const isNearCurrentPage =
              Math.abs(pageNumber - currentPage) <= 1 ||
              pageNumber === 1 ||
              pageNumber === totalPages

            if (!isNearCurrentPage) {
              if (pageNumber === 2 || pageNumber === totalPages - 1) {
                return (
                  <span key={pageNumber} className='text-gray-500'>
                    ...
                  </span>
                )
              }
              return null
            }

            return (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={isLoading}
                variant={isCurrentPage ? 'primary' : 'ghost'}
                className={`w-10 h-10 rounded-full transition-colors duration-200 ${
                  isCurrentPage
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          variant='outline'
          className='flex items-center space-x-2 px-4 py-2 border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <span>Next</span>
          <FaChevronRight className='w-4 h-4' />
        </Button>
      </div>

      <div className='text-sm text-gray-500 dark:text-gray-400'>
        {isLoading
          ? 'Loading...'
          : `Showing page ${currentPage} of ${totalPages}`}
      </div>
    </div>
  )
}
