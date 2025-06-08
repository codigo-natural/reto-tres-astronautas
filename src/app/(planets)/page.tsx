import { Pagination } from '@/components/planets/Pagination'
import { PlanetCard } from '@/components/planets/PlanetCard'
import { SearchBar } from '@/components/planets/SearchBar'
import { SortSelect } from '@/components/planets/SortSelect'
import { getPlanets } from '@/services/api'

const ITEMS_PER_PAGE = 5

interface PlanetListPageProps {
  searchParams: Promise<{
    q?: string
    sort?: string
    page?: string
  }>
}

export default async function PlanetListPage({
  searchParams,
}: PlanetListPageProps) {
  const allPlanets = await getPlanets()
  const { q, sort, page } = await searchParams

  const searchTerm = q?.toLowerCase() || ''
  const sortOrder = sort || 'name_asc'
  const currentPage = parseInt(page || '1', 10)

  let filteredPlanets = allPlanets

  // Filtrar por búsqueda (q)
  if (searchTerm) {
    filteredPlanets = filteredPlanets.filter(
      (planet) =>
        planet.englishName.toLowerCase().includes(searchTerm) ||
        planet.name.toLowerCase().includes(searchTerm)
    )
  }

  // Ordenar (sort)
  filteredPlanets.sort((a, b) => {
    if (sortOrder === 'name_asc') {
      return a.englishName.localeCompare(b.englishName)
    } else if (sortOrder === 'name_desc') {
      return b.englishName.localeCompare(a.englishName)
    }
    return 0
  })

  // Paginar
  const totalPlanets = filteredPlanets.length
  const totalPages = Math.ceil(totalPlanets / ITEMS_PER_PAGE)
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPlanets = filteredPlanets.slice(
    offset,
    offset + ITEMS_PER_PAGE
  )

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
          Explore Our Solar System
        </h1>

        <section className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
          <div className='w-full md:w-1/2'>
            <SearchBar />
          </div>
          <div className='w-full md:w-1/4'>
            <SortSelect />
          </div>
        </section>

        {paginatedPlanets.length > 0 ? (
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {paginatedPlanets.map((planet) => (
              <PlanetCard key={planet.id} planet={planet} />
            ))}
          </section>
        ) : (
          <section className='text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              No planets were found that match your criteria.
            </p>
          </section>
        )}

        {totalPages > 1 && (
          <footer className='mt-12'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasNextPage={currentPage < totalPages}
              hasPrevPage={currentPage > 1}
            />
          </footer>
        )}
      </div>
    </main>
  )
}
