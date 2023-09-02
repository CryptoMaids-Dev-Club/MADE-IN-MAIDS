import { Metadata } from 'next'
import MyPage from './_components/MyPage'

const Page = ({ params }: { params: { address: string } }) => <MyPage address={params.address} />

export default Page

export const metadata: Metadata = {
  title: 'MyPage',
}
