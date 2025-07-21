import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import EntryForm from './EntryForm'
import type { LotteryInfo } from '../_type'

// Mock all the dependencies
vi.mock('@/app/[lang]/(features)/lottery/_hooks/useLottery')
vi.mock('@/app/i18n/client')
vi.mock('@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3', () => ({
  default: ({ children, loading, onClick, disabled, className }: any) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      data-testid='loading-button'
      data-loading={loading}
    >
      {children}
    </button>
  ),
}))

// Mock UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid='select' data-value={value}>
      <select value={value} onChange={(e) => onValueChange(e.target.value)} data-testid='select-trigger'>
        <option value=''></option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={(i + 1).toString()}>
            {i + 1}
          </option>
        ))}
      </select>
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectGroup: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: () => <span>Select Value</span>,
}))

vi.mock('@/components/ui/typography', () => ({
  Typography: ({ children, variant }: any) => <p data-variant={variant}>{children}</p>,
}))

// Mock implementations
const mockUseLottery = vi.fn()
const mockUseLanguage = vi.fn()
const mockUseTranslation = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()

  // Setup default mocks
  mockUseLottery.mockReturnValue({
    share: 1,
    maxShare: 5,
    entryCounts: 3,
    isPending: false,
    buttonMessage: 'Entry',
    disabled: false,
    updateShare: vi.fn(),
    entryOrApprove: vi.fn(),
    returnTicket: vi.fn(),
  })

  mockUseLanguage.mockReturnValue({
    language: 'en',
  })

  mockUseTranslation.mockReturnValue({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'lottery:attention': 'Please read the attention carefully',
      }
      return translations[key] || key
    },
  })

  // Apply mocks to modules
  vi.mocked(require('@/app/[lang]/(features)/lottery/_hooks/useLottery')).default = mockUseLottery
  vi.mocked(require('@/app/i18n/client')).useLanguage = mockUseLanguage
  vi.mocked(require('@/app/i18n/client')).useTranslation = mockUseTranslation
})

const mockLotteryInfo: LotteryInfo = {
  id: 1,
  title: 'Test Lottery',
  description: 'Test Description',
  ended: false,
  prizes: [],
  image: '/test.png',
}

describe('EntryForm', () => {
  it('should render entry form correctly', () => {
    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    expect(screen.getByTestId('loading-button')).toBeInTheDocument()
    expect(screen.getByTestId('select')).toBeInTheDocument()
    expect(screen.getByText('Please read the attention carefully')).toBeInTheDocument()
  })

  it('should show entry button when lottery is ongoing', () => {
    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    expect(button).toHaveTextContent('Entry')
    expect(button).not.toBeDisabled()
  })

  it('should show return ticket button when lottery has ended', () => {
    const endedLotteryInfo = { ...mockLotteryInfo, ended: true }
    render(<EntryForm lotteryId={1} lotteryInfo={endedLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    expect(button).toHaveTextContent('Return Tickets')
  })

  it('should disable return ticket button when no entry counts', () => {
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 0, // no entries
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    const endedLotteryInfo = { ...mockLotteryInfo, ended: true }
    render(<EntryForm lotteryId={1} lotteryInfo={endedLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    expect(button).toBeDisabled()
  })

  it('should show loading state when pending', () => {
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 3,
      isPending: true, // pending
      buttonMessage: 'Loading...',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button).toHaveTextContent('Loading...')
  })

  it('should disable button when disabled from hook', () => {
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'You need at least 1 Medal and 1 Ticket',
      disabled: true, // disabled
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('You need at least 1 Medal and 1 Ticket')
  })

  it('should call entryOrApprove when entry button is clicked', async () => {
    const mockEntryOrApprove = vi.fn()
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: mockEntryOrApprove,
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    await userEvent.click(button)

    expect(mockEntryOrApprove).toHaveBeenCalled()
  })

  it('should call returnTicket when return ticket button is clicked', async () => {
    const mockReturnTicket = vi.fn()
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: mockReturnTicket,
    })

    const endedLotteryInfo = { ...mockLotteryInfo, ended: true }
    render(<EntryForm lotteryId={1} lotteryInfo={endedLotteryInfo} />)

    const button = screen.getByTestId('loading-button')
    await userEvent.click(button)

    expect(mockReturnTicket).toHaveBeenCalled()
  })

  it('should call updateShare when select value changes', async () => {
    const mockUpdateShare = vi.fn()
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 5,
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: mockUpdateShare,
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const select = screen.getByTestId('select-trigger')
    fireEvent.change(select, { target: { value: '3' } })

    expect(mockUpdateShare).toHaveBeenCalledWith(3)
  })

  it('should limit select range to maxShare or 10, whichever is smaller', () => {
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 15, // more than 10
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const select = screen.getByTestId('select-trigger')
    const options = select.querySelectorAll('option')

    // Should have 11 options (empty + 1-10)
    expect(options).toHaveLength(11)
    expect(options[options.length - 1]).toHaveValue('10')
  })

  it('should limit select range to maxShare when maxShare is less than 10', () => {
    mockUseLottery.mockReturnValue({
      share: 1,
      maxShare: 3, // less than 10
      entryCounts: 3,
      isPending: false,
      buttonMessage: 'Entry',
      disabled: false,
      updateShare: vi.fn(),
      entryOrApprove: vi.fn(),
      returnTicket: vi.fn(),
    })

    render(<EntryForm lotteryId={1} lotteryInfo={mockLotteryInfo} />)

    const select = screen.getByTestId('select-trigger')
    const options = select.querySelectorAll('option')

    // Should have 4 options (empty + 1-3)
    expect(options).toHaveLength(4)
    expect(options[options.length - 1]).toHaveValue('3')
  })

  it('should pass correct lotteryId to useLottery hook', () => {
    render(<EntryForm lotteryId={42} lotteryInfo={mockLotteryInfo} />)

    expect(mockUseLottery).toHaveBeenCalledWith({ lotteryId: 42 })
  })
})
