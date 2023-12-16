import { Skeleton } from '@/components/ui/skeleton'

const ProfileSkelton = () => (
  <div className='flex flex-col items-center'>
    <Skeleton className='h-40 w-40 rounded-full' />
    <Skeleton className='h-4 w-[210px]' />
    <Skeleton className='h-4 w-[210px]' />
  </div>
)

export default ProfileSkelton
