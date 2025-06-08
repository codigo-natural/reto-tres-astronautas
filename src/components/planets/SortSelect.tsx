'use client'

import { useCallback, useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Select } from '../ui/Select'

export const SortSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort') || 'name_asc'
  )

  useEffect(() => {
    setSortOrder(searchParams.get('sort') || 'name_asc')
  }, [searchParams])

  const handleSortChange = useCallback(
    (newSortOrder: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', newSortOrder)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return (
    <Select
      value={sortOrder}
      onChange={(e) => {
        setSortOrder(e.target.value)
        handleSortChange(e.target.value)
      }}
      className='p-2 border rounded'
    >
      <option value='name_asc'>Name (A-Z)</option>
      <option value='name_desc'>Name (Z-A)</option>
    </Select>
  )
}
