import { Suspense } from 'react'
import { CenteringCircularProgress } from '@/app/[lang]/_components/Elements/CenteringCircularProgress'
import { Divider } from '@/components/ui/divider'
import { Typography } from '@/components/ui/typography'
import { Top5 } from './Top5'
import { VotingTransitionForm } from './VotingTransitionForm'

const Voting = () => (
  <div className='container mx-auto my-8 max-w-6xl pb-12'>
    <Typography variant='h1' className='my-2 text-center text-pink-500'>
      CryptoMaids VOTING
    </Typography>
    <Suspense fallback={<CenteringCircularProgress />}>
      <Top5 />
    </Suspense>

    <Divider className='my-4' />

    <Typography variant='h1' className='text-center text-pink-500'>
      VOTING
    </Typography>

    <div className='flex justify-center'>
      <VotingTransitionForm />
    </div>

    <Divider className='my-4' />
  </div>
)

export default Voting
