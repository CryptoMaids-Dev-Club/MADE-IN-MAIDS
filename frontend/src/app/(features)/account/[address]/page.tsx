import { Metadata } from 'next'
import { Address } from 'viem'
import MyPage from './_components/MyPage'

const Page = ({ params }: { params: { address: string } }) => (
	<MyPage address={params.address as Address} />
)

export default Page

export const metadata: Metadata = {
	title: 'MyPage',
}
