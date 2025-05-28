import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import useMedalAndTicket from './useMedalAndTicket'

// Mock all the dependencies
vi.mock('@/components/hooks/use-toast')
vi.mock('@/config/client')
vi.mock('@/lib/generated')
vi.mock('@tanstack/react-query')
vi.mock('wagmi')

// Mock implementations
const mockUseToast = vi.fn()
const mockUseQueryClient = vi.fn()
const mockUseAccount = vi.fn()
const mockUseReadContracts = vi.fn()
const mockUseSimulateMedalNftSetApprovalForAll = vi.fn()
const mockUseSimulateTicketNftSetApprovalForAll = vi.fn()
const mockUseWriteContract = vi.fn()
const mockUseWaitForTransactionReceipt = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  
  // Setup default mocks
  mockUseToast.mockReturnValue({
    toast: vi.fn(),
  })

  mockUseQueryClient.mockReturnValue({
    invalidateQueries: vi.fn(),
  })

  mockUseAccount.mockReturnValue({
    address: '0x123',
  })

  mockUseReadContracts.mockReturnValue({
    data: [10n, 5n, true, true], // [medalBalance, ticketBalance, medalIsApproved, ticketIsApproved]
    refetch: vi.fn(),
  })

  mockUseSimulateMedalNftSetApprovalForAll.mockReturnValue({
    data: {
      request: { to: '0xmedal', data: '0xapprove' },
    },
  })

  mockUseSimulateTicketNftSetApprovalForAll.mockReturnValue({
    data: {
      request: { to: '0xticket', data: '0xapprove' },
    },
  })

  mockUseWriteContract.mockReturnValue({
    data: '0xhash123',
    isPending: false,
    writeContract: vi.fn(),
  })

  mockUseWaitForTransactionReceipt.mockReturnValue({
    isLoading: false,
    status: 'idle',
  })

  // Apply mocks to modules
  vi.mocked(require('@/components/hooks/use-toast')).useToast = mockUseToast
  vi.mocked(require('@tanstack/react-query')).useQueryClient = mockUseQueryClient
  vi.mocked(require('wagmi')).useAccount = mockUseAccount
  vi.mocked(require('wagmi')).useReadContracts = mockUseReadContracts
  vi.mocked(require('wagmi')).useWriteContract = mockUseWriteContract
  vi.mocked(require('wagmi')).useWaitForTransactionReceipt = mockUseWaitForTransactionReceipt
  vi.mocked(require('@/lib/generated')).useSimulateMedalNftSetApprovalForAll = mockUseSimulateMedalNftSetApprovalForAll
  vi.mocked(require('@/lib/generated')).useSimulateTicketNftSetApprovalForAll = mockUseSimulateTicketNftSetApprovalForAll
  vi.mocked(require('@/lib/generated')).medalNftConfig = {
    address: { 1: '0xmedal' },
    abi: [],
  }
  vi.mocked(require('@/lib/generated')).ticketNftConfig = {
    address: { 1: '0xticket' },
    abi: [],
  }
  vi.mocked(require('@/lib/generated')).maidsLotteryAddress = {
    1: '0xlottery',
  }
  vi.mocked(require('@/config/client')).NETWORK = { id: 1 }
})

describe('useMedalAndTicket', () => {
  it('should return correct balances and approval status', () => {
    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.medalBalance).toBe(10)
    expect(result.current.ticketBalance).toBe(5)
    expect(result.current.approved).toBe(true)
    expect(result.current.isPending).toBe(false)
  })

  it('should handle zero balances', () => {
    mockUseReadContracts.mockReturnValue({
      data: [0n, 0n, true, true],
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.medalBalance).toBe(0)
    expect(result.current.ticketBalance).toBe(0)
  })

  it('should handle undefined data', () => {
    mockUseReadContracts.mockReturnValue({
      data: undefined,
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.medalBalance).toBe(0)
    expect(result.current.ticketBalance).toBe(0)
    expect(result.current.approved).toBe(false)
  })

  it('should show not approved when either medal or ticket is not approved', () => {
    mockUseReadContracts.mockReturnValue({
      data: [10n, 5n, false, true], // medal not approved
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.approved).toBe(false)
  })

  it('should show pending state when writing contract', () => {
    mockUseWriteContract.mockReturnValue({
      data: '0xhash123',
      isPending: true, // pending
      writeContract: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.isPending).toBe(true)
  })

  it('should show pending state when transaction is loading', () => {
    mockUseWaitForTransactionReceipt.mockReturnValue({
      isLoading: true, // loading
      status: 'pending',
    })

    const { result } = renderHook(() => useMedalAndTicket())

    expect(result.current.isPending).toBe(true)
  })

  it('should call writeContract for medal approval when medal is not approved', () => {
    const mockWriteContract = vi.fn()
    mockUseWriteContract.mockReturnValue({
      data: '0xhash123',
      isPending: false,
      writeContract: mockWriteContract,
    })

    mockUseReadContracts.mockReturnValue({
      data: [10n, 5n, false, true], // medal not approved, ticket approved
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    act(() => {
      result.current.approve()
    })

    expect(mockWriteContract).toHaveBeenCalledWith({
      to: '0xmedal',
      data: '0xapprove',
    })
  })

  it('should call writeContract for ticket approval when ticket is not approved', () => {
    const mockWriteContract = vi.fn()
    mockUseWriteContract.mockReturnValue({
      data: '0xhash123',
      isPending: false,
      writeContract: mockWriteContract,
    })

    mockUseReadContracts.mockReturnValue({
      data: [10n, 5n, true, false], // medal approved, ticket not approved
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    act(() => {
      result.current.approve()
    })

    expect(mockWriteContract).toHaveBeenCalledWith({
      to: '0xticket',
      data: '0xapprove',
    })
  })

  it('should not call writeContract when both are already approved', () => {
    const mockWriteContract = vi.fn()
    mockUseWriteContract.mockReturnValue({
      data: '0xhash123',
      isPending: false,
      writeContract: mockWriteContract,
    })

    mockUseReadContracts.mockReturnValue({
      data: [10n, 5n, true, true], // both approved
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useMedalAndTicket())

    act(() => {
      result.current.approve()
    })

    expect(mockWriteContract).not.toHaveBeenCalled()
  })

  it('should show toast and refetch on successful transaction', () => {
    const mockToast = vi.fn()
    const mockRefetch = vi.fn()

    mockUseToast.mockReturnValue({
      toast: mockToast,
    })

    mockUseReadContracts.mockReturnValue({
      data: [10n, 5n, true, true],
      refetch: mockRefetch,
    })

    mockUseWaitForTransactionReceipt.mockReturnValue({
      isLoading: false,
      status: 'success', // success status
    })

    renderHook(() => useMedalAndTicket())

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Transaction Completed!',
      duration: 3000,
    })
    expect(mockRefetch).toHaveBeenCalled()
  })
})