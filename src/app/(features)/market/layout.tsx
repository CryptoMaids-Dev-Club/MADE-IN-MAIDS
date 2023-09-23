import { Header } from '@/app/_components/Header'

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
