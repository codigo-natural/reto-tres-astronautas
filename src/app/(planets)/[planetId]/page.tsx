import { FaArrowLeft } from 'react-icons/fa'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { getPlanetById, getPlanets } from '@/services/api'
import { PlanetDetailView } from '@/components/planets/PlanetDetailView'

type PlanetDetailPageProps = {
  params: Promise<{
    planetId: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// metadatos dinamicos (SEO)
export async function generateMetadata({
  params,
}: PlanetDetailPageProps): Promise<Metadata> {
  const { planetId } = await params
  const planet = await getPlanetById(planetId)

  if (!planet) {
    return {
      title: 'Planet Not Found',
    }
  }
  return {
    title: planet.englishName,
    description: `Detailed information about ${planet.englishName}, a ${planet.bodyType} in our solar system.`,
  }
}

// rutas estaticas en buil time (SSG)
export async function generateStaticParams() {
  const planets = await getPlanets()
  return planets.map((planet) => ({
    planetId: planet.id,
  }))
}

export default async function PlanetDetailPage({
  params,
}: PlanetDetailPageProps) {
  const { planetId } = await params
  const planet = await getPlanetById(planetId)

  if (!planet) {
    notFound()
  }

  return (
    <section>
      <div className='py-4 bg-gray-100 dark:bg-gray-900'>
        <nav className='container mx-auto px-4'>
          <Link
            href='/'
            className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2'
            prefetch={true}
          >
            <FaArrowLeft />
            Back to Planet List
          </Link>
        </nav>
      </div>
      <PlanetDetailView key={planet.id} planet={planet} />
    </section>
  )
}
