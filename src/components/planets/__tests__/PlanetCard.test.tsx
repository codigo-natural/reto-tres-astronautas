import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PlanetCard } from '../PlanetCard'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock Zustand store
jest.mock('@/store/favoritesStore', () => ({
  useFavoritesStore: jest.fn(),
}))

const mockPlanet = {
  id: '1',
  name: 'Earth',
  englishName: 'Earth',
  isPlanet: true,
  mass: { massValue: 5.97, massExponent: 24 },
  meanRadius: 6371,
  sideralOrbit: 365.256,
  sideralRotation: 23.934,
  moons: [{ moon: 'Luna', rel: 'moon' }],
  imageUrl: '/earth.jpg',
  semimajorAxis: 149.6,
  perihelion: 147.1,
  aphelion: 152.1,
  eccentricity: 0.0167,
  inclination: 0,
  density: 5.51,
  gravity: 9.8,
  escape: 11.2,
  equaRadius: 6378,
  polarRadius: 6357,
  flattening: 0.0034,
  dimenseion: '',
  aroundPlanet: null,
  discoveredBy: '',
  discoveryDate: '',
  alternativeName: '',
  axialTilt: 23.4,
  avgTemp: 288,
  mainAnomaly: 0,
  argPeriapsis: 0,
  longAscNode: 0,
  bodyType: 'Planet',
  rel: '',
  diameter: 12742,
}

describe('PlanetCard', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useFavoritesStore as unknown as jest.Mock).mockImplementation(() => ({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn(),
    }))
  })

  it('renders planet information correctly', () => {
    render(<PlanetCard planet={mockPlanet} />)

    expect(screen.getByText('Earth')).toBeInTheDocument()
    expect(screen.getByText(/5\.97 × 10.*24.*kg/)).toBeInTheDocument()
    expect(screen.getByText('6371.00 km')).toBeInTheDocument()
    expect(screen.getByText('365.26 days')).toBeInTheDocument()
    expect(screen.getByText('23.93 hours')).toBeInTheDocument()
    expect(screen.getByText('1 moon')).toBeInTheDocument()
  })

  it('calls toggleFavorite when favorite button is clicked', () => {
    const mockToggleFavorite = jest.fn()
    ;(useFavoritesStore as unknown as jest.Mock).mockImplementation(() => ({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: mockToggleFavorite,
    }))

    render(<PlanetCard planet={mockPlanet} />)

    const favoriteButton = screen.getByRole('button', {
      name: /Add to favorites/i,
    })
    fireEvent.click(favoriteButton)

    expect(mockToggleFavorite).toHaveBeenCalledWith('1')
  })

  it('shows filled star icon when planet is favorite', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockImplementation(() => ({
      isFavorite: jest.fn().mockReturnValue(true),
      toggleFavorite: jest.fn(),
    }))

    render(<PlanetCard planet={mockPlanet} />)

    const favoriteButton = screen.getByRole('button', {
      name: /Remove from favorites/i,
    })
    const starIcon = favoriteButton.querySelector('svg')
    expect(starIcon).toHaveClass('text-yellow-400')
  })
})
