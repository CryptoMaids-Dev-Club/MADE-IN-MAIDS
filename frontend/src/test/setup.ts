import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock environment modules
vi.mock('@/config/client', () => ({
  NETWORK: { id: 11155111 },
}))

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: vi.fn(() => ({ address: '0x123' })),
  useReadContracts: vi.fn(() => ({ data: [], refetch: vi.fn() })),
  useWriteContract: vi.fn(() => ({ writeContract: vi.fn(), isPending: false })),
  useWaitForTransactionReceipt: vi.fn(() => ({ isLoading: false, status: 'idle' })),
}))

// Mock generated contract hooks
vi.mock('@/lib/generated', () => ({
  maidsLotteryConfig: { address: { 11155111: '0xcontract1' }, abi: [] },
  maidsLotteryOldConfig: { address: { 11155111: '0xcontract2' }, abi: [] },
  maidsLotteryAddress: { 11155111: '0xlottery' },
  medalNftConfig: { address: { 11155111: '0xmedal' }, abi: [] },
  ticketNftConfig: { address: { 11155111: '0xticket' }, abi: [] },
  useWriteMaidsLotteryEntry: vi.fn(() => ({ writeContract: vi.fn(), isPending: false })),
  useWriteMaidsLotteryReturnTicket: vi.fn(() => ({ writeContract: vi.fn(), isPending: false })),
  useWriteMaidsLotteryOldReturnTicket: vi.fn(() => ({ writeContract: vi.fn(), isPending: false })),
  useSimulateMedalNftSetApprovalForAll: vi.fn(() => ({ data: { request: {} } })),
  useSimulateTicketNftSetApprovalForAll: vi.fn(() => ({ data: { request: {} } })),
}))

// Mock toast
vi.mock('@/components/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({ toast: vi.fn() })),
}))

// Mock i18n
vi.mock('@/app/i18n/client', () => ({
  useLanguage: vi.fn(() => ({ language: 'en' })),
  useTranslation: vi.fn(() => ({ t: (key: string) => key })),
}))

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })),
}))