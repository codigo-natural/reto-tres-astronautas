import { render, screen, fireEvent, act } from '@testing-library/react'
import { SearchBar } from '../SearchBar'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}))

describe('SearchBar', () => {
  const mockRouter = {
    push: jest.fn(),
  }
  const mockPathname = '/planets'
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(usePathname as jest.Mock).mockReturnValue(mockPathname)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  it('renders search input with placeholder', () => {
    render(<SearchBar />)
    expect(
      screen.getByPlaceholderText('Search planets...')
    ).toBeInTheDocument()
  })

  it('updates URL when search term changes', async () => {
    jest.useFakeTimers()
    render(<SearchBar />)

    const searchInput = screen.getByPlaceholderText('Search planets...')
    fireEvent.change(searchInput, { target: { value: 'Earth' } })

    // Fast-forward timers to trigger debounced search
    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/?q=Earth'
    )
    jest.useRealTimers()
  })

  it('clears search parameter when input is empty', async () => {
    jest.useFakeTimers()
    const paramsWithSearch = new URLSearchParams('q=Earth')
    ;(useSearchParams as jest.Mock).mockReturnValue(paramsWithSearch)

    render(<SearchBar />)

    const searchInput = screen.getByPlaceholderText('Search planets...')
    fireEvent.change(searchInput, { target: { value: '' } })

    // Fast-forward timers to trigger debounced search
    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/?'
    )
    jest.useRealTimers()
  })

  it('initializes with search param value', () => {
    const paramsWithSearch = new URLSearchParams('q=Earth')
    ;(useSearchParams as jest.Mock).mockReturnValue(paramsWithSearch)

    render(<SearchBar />)
    expect(screen.getByDisplayValue('Earth')).toBeInTheDocument()
  })
})
