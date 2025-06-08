import { render, screen } from '@testing-library/react'
import { Pagination } from '../Pagination'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('Pagination', () => {
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

  it('renders pagination controls', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        hasNextPage={true}
        hasPrevPage={false}
      />
    )

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        hasNextPage={true}
        hasPrevPage={false}
      />
    )

    const prevButton = screen.getByRole('button', { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        hasNextPage={false}
        hasPrevPage={true}
      />
    )

    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
  })

  it('shows current page indicator', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        hasNextPage={true}
        hasPrevPage={true}
      />
    )

    expect(screen.getByText('Showing page 3 of 5')).toBeInTheDocument()
  })
})
