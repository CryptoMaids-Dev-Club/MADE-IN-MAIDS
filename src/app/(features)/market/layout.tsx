import { Header } from '@/app/_components/Header'

// eslint-disable-next-line react/function-component-definition
export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
