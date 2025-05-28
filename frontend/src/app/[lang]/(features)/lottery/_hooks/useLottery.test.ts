import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useLottery from './useLottery'
import useMedalAndTicket from './useMedalAndTicket'
import * as wagmi from 'wagmi'
import * as generated from '@/lib/generated'

// Mock the useMedalAndTicket hook specifically
vi.mock('./useMedalAndTicket')

describe('useLottery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock useMedalAndTicket
    vi.mocked(useMedalAndTicket).mockReturnValue({
      medalBalance: 10,
      ticketBalance: 5,
      isPending: false,
      approve: vi.fn(),
      approved: true,
      refetch: vi.fn(),
    })

    // Mock wagmi hooks
    vi.mocked(wagmi.useReadContracts).mockReturnValue({
      data: [5n, true, 3n], // [entryCounts, isOngoing, entryCountsOld]
      refetch: vi.fn(),
    } as any)

    vi.mocked(wagmi.useWaitForTransactionReceipt).mockReturnValue({
      isLoading: false,
      status: 'idle',
    } as any)

    // Mock generated hooks
    vi.mocked(generated.useWriteMaidsLotteryEntry).mockReturnValue({
      data: '0xhash123',
      isPending: false,
      writeContract: vi.fn(),
    } as any)

    vi.mocked(generated.useWriteMaidsLotteryReturnTicket).mockReturnValue({
      data: '0xreturnhash',
      isPending: false,
      writeContract: vi.fn(),
    } as any)

    vi.mocked(generated.useWriteMaidsLotteryOldReturnTicket).mockReturnValue({
      data: '0xoldhash',
      isPending: false,
      writeContract: vi.fn(),
    } as any)
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    expect(result.current.share).toBe(1)
    expect(result.current.maxShare).toBe(5) // min(medalBalance: 10, ticketBalance: 5)
    expect(result.current.entryCounts).toBe(5) // from mock data
    expect(result.current.buttonMessage).toBe('Entry')
    expect(result.current.disabled).toBe(false)
  })

  it('should update share correctly', () => {
    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    act(() => {
      result.current.updateShare(3)
    })

    expect(result.current.share).toBe(3)
  })

  it('should show approve button when not approved', () => {
    vi.mocked(useMedalAndTicket).mockReturnValue({
      medalBalance: 10,
      ticketBalance: 5,
      isPending: false,
      approve: vi.fn(),
      approved: false, // not approved
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    expect(result.current.buttonMessage).toBe('Approve')
  })

  it('should show loading state when pending', () => {
    vi.mocked(generated.useWriteMaidsLotteryEntry).mockReturnValue({
      data: '0xhash123',
      isPending: true, // pending
      writeContract: vi.fn(),
    } as any)

    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    expect(result.current.buttonMessage).toBe('Loading...')
    expect(result.current.isPending).toBe(true)
  })

  it('should disable when insufficient tokens', () => {
    vi.mocked(useMedalAndTicket).mockReturnValue({
      medalBalance: 0, // no medals
      ticketBalance: 0, // no tickets
      isPending: false,
      approve: vi.fn(),
      approved: true,
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    expect(result.current.buttonMessage).toBe('You need at least 1 Medal and 1 Ticket')
    expect(result.current.disabled).toBe(true)
  })

  it('should handle old lottery correctly (lotteryId: 0)', () => {
    const { result } = renderHook(() => useLottery({ lotteryId: 0 }))

    expect(result.current.entryCounts).toBe(3n) // entryCountsOld from mock (not converted)
  })

  it('should call writeContract with correct share when entry is called', () => {
    const mockWriteContract = vi.fn()
    vi.mocked(generated.useWriteMaidsLotteryEntry).mockReturnValue({
      data: '0xhash123',
      isPending: false,
      writeContract: mockWriteContract,
    } as any)

    const { result } = renderHook(() => useLottery({ lotteryId: 1 }))

    act(() => {
      result.current.updateShare(3)
    })

    act(() => {
      result.current.entryOrApprove()
    })

    expect(mockWriteContract).toHaveBeenCalledWith({
      args: [BigInt(3)],
    })
  })
})