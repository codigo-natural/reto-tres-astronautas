'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { Input } from '@/components/ui/Input'

export const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchTerm) {
        params.set('q', searchTerm)
      } else {
        params.delete('q')
      }
      router.push(`/?${params.toString()}`)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, router, searchParams])

  return (
    <div className='relative w-full max-w-md'>
      <div className='relative'>
        <Input
          type='text'
          placeholder='Search planets...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder:text-gray-400 hover:bg-gray-700/70 transition-colors duration-200'
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <FaSearch className='h-4 w-4 text-gray-400' />
        </div>
      </div>
    </div>
  )
}
