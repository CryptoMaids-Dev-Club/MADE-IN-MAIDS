import { getRecentlyUpdateProfiles } from '@/app/api/maidsProfile/getRecentlyUpdateProfiles'
import RecentlyUpdatedProfiles from './RecentlyUpdatedProfiles'

const RecentlyUpdatedProfilesWrapper = async () => {
  const profiles = await getRecentlyUpdateProfiles()

  return <RecentlyUpdatedProfiles profiles={profiles} />
}

export default RecentlyUpdatedProfilesWrapper
