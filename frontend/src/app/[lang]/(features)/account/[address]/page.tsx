import type { Metadata } from 'next'
import type { Address } from 'viem'
import MyPage from './_components/MyPage'

const Page = async ({ params }: { params: { address: string } }) => {
  const { address } = params
  return <MyPage address={address as Address} />
}

export default Page

export const metadata: Metadata = {
  title: 'MyPage',
}
