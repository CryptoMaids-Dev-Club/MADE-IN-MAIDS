import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { getRecentlyUpdateProfiles } from '@/server/maidsProfile/query'

const RecentlyUpdatedProfiles = async ({ lang }: { lang: string }) => {
  noStore()
  const profiles = await getRecentlyUpdateProfiles()

  return (
    <div className='box-border rounded-2xl border-2 border-white p-2'>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-5'>
        {profiles.map((profile) => (
          <div key={profile.imageUrl}>
            <Link href={`/${lang}/detail/${profile.id}`}>
              <div className='hover:opacity-50'>
                <Image
                  height={600}
                  width={600}
                  src={profile.imageUrl}
                  alt={profile.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </Link>
            <div className='w-full bg-gray-800 px-4 py-2'>
              <Typography variant='h3' className='truncate text-white'>
                {profile.name}
              </Typography>
              <Typography variant='h6' className='truncate text-sm text-gray-300'>
                {profile.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const RecentlyUpdatedProfilesSkeleton = () => (
  <div className='box-border rounded-2xl border-2 border-white p-2'>
    <div className='grid grid-cols-1 gap-2 md:grid-cols-5'>
      <div>
        <div className='w-full bg-gray-800 px-4 py-2'>
          <Skeleton className='h-80 w-full' />
        </div>
      </div>
      <div>
        <div className='w-full bg-gray-800 px-4 py-2'>
          <Skeleton className='h-80 w-full' />
        </div>
      </div>
      <div>
        <div className='w-full bg-gray-800 px-4 py-2'>
          <Skeleton className='h-80 w-full' />
        </div>
      </div>
      <div>
        <div className='w-full bg-gray-800 px-4 py-2'>
          <Skeleton className='h-80 w-full' />
        </div>
      </div>
      <div>
        <div className='w-full bg-gray-800 px-4 py-2'>
          <Skeleton className='h-80 w-full' />
        </div>
      </div>
    </div>
  </div>
)

export default RecentlyUpdatedProfiles
