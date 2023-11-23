import { useCallback, useState } from 'react'
import { MaidProfile } from '@prisma/client'
import { useAccount, useSignMessage } from 'wagmi'
import updateMaidProfile from '@/app/api/maidsProfile/updateMaidProfile'
import { useDebounce } from '@/hooks/useDebounce'
import { getSignatureFromLocalStorage, saveSignatureToLocalStorage } from '@/lib/signature'
import type { AssetInfo } from '@/app/api/asset/[id]/asset'

const useUpdateProfile = (profile: MaidProfile, asset: AssetInfo, owner: string) => {
  const [editing, setEditing] = useState(false)
  const [maidsProfile, setMaidsProfile] = useState<MaidProfile>(profile)
  const debounceProfile = useDebounce(maidsProfile, 500)

  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    message: 'Update Profile',
    async onSuccess(data) {
      if (address === undefined) return
      try {
        await updateMaidProfile({ ...debounceProfile, imageUrl: asset.image, address, signature: data })
        saveSignatureToLocalStorage(address, data)
        setEditing(false)
      } catch (e) {
        console.error(e)
      }
    },
  })

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev)
  }, [])

  const changeProfile = useCallback((profile: MaidProfile) => {
    setMaidsProfile(profile)
  }, [])

  const updateProfile = useCallback(async () => {
    if (address === undefined) return

    const signature = getSignatureFromLocalStorage(address)

    if (signature) {
      await updateMaidProfile({ ...debounceProfile, imageUrl: asset.image, address, signature })
      setEditing(false)
    } else {
      signMessage()
    }
  }, [address, asset.image, debounceProfile, signMessage])

  const isOwner = address === owner

  return { editing, isOwner, maidsProfile, toggleEditing, changeProfile, updateProfile }
}

export default useUpdateProfile
