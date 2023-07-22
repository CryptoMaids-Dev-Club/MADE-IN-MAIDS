import Container from '@mui/material/Container'
import { Footer } from '@/app/_components/Footer'
import { Metadata } from 'next'
import getTopVotes from '@/app/api/voting/[slug]/getTopVotes'
import getAsset from '@/app/api/asset/[id]/getAsset'
import { Top5 } from './Top5'
import { Voting } from './Voting'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

export default async function VotingTop() {
  const top5 = await getTopVotes({ slug: 5 })
  const assets = [] as AssetInfo[]
  // eslint-disable-next-line no-restricted-syntax
  for (const vote of top5) {
    // eslint-disable-next-line no-await-in-loop
    const asset = await getAsset({ id: String(vote.id) })
    assets.push(asset)
  }

  return (
    <>
      <Container>
        <Top5 votes={top5} assets={assets} />
        <Voting />
      </Container>
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Voting',
}
