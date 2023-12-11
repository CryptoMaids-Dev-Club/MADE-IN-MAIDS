import { useCallback, useState } from 'react'
import { MaidProfile } from '@prisma/client'
import { useAccount, useSignMessage } from 'wagmi'
import updateMaidProfile from '@/app/api/maidsProfile/updateMaidProfile'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/lib/signature'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

const useUpdateProfile = (profile: MaidProfile, asset: AssetInfo, owner: string) => {
  const [editing, setEditing] = useState(false)
  const [maidsProfile, setMaidsProfile] = useState<MaidProfile>(profile)

  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({
    message: 'Update Profile',
  })

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev)
  }, [])

  const changeProfile = useCallback((profile: MaidProfile) => {
    setMaidsProfile(profile)
  }, [])

  const updateProfile = useCallback(
    async (profile: MaidProfile) => {
      if (address === undefined) return

      const signature = getSignatureFromLocalStorage(address)

      if (signature) {
        await updateMaidProfile({ ...profile, imageUrl: asset.image, address, signature })
        changeProfile(profile)
        setEditing(false)
      } else {
        signMessageAsync()
          .then(async (data) => {
            await updateMaidProfile({ ...profile, imageUrl: asset.image, address, signature: data })
            saveSignatureToLocalStorage(address, data)
            changeProfile(profile)
            setEditing(false)
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
    [address, asset.image, changeProfile, signMessageAsync]
  )

  const isOwner = address === owner

  return { editing, isOwner, maidsProfile, toggleEditing, changeProfile, updateProfile }
}

export default useUpdateProfile
