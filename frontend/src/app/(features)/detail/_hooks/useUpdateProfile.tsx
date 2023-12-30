import { useCallback, useState } from 'react'
import { MaidProfile } from '@prisma/client'
import { useAccount, useSignMessage } from 'wagmi'
import { updateMaidProfile } from '@/server/maidsProfile/action'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/utils/signature'
import type { AssetInfo } from '@/server/asset'

const useUpdateProfile = (profile: MaidProfile, asset: AssetInfo, owner: string) => {
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [maidsProfile, setMaidsProfile] = useState<MaidProfile>(profile)

  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({
    message: 'Update Profile',
  })

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev)
  }, [])

  const toggleUpdating = useCallback(() => {
    setUpdating((prev) => !prev)
  }, [])

  const changeProfile = useCallback((profile: MaidProfile) => {
    setMaidsProfile(profile)
  }, [])

  const updateProfile = useCallback(
    async (profile: MaidProfile) => {
      if (address === undefined) return

      toggleUpdating()

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
      toggleUpdating()
    },
    [address, asset.image, changeProfile, signMessageAsync, toggleUpdating]
  )

  const isOwner = address === owner

  return { editing, updating, isOwner, maidsProfile, toggleEditing, toggleUpdating, changeProfile, updateProfile }
}

export default useUpdateProfile
