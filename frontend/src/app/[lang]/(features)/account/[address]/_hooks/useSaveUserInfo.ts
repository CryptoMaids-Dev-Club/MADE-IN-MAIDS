import { useToast } from '@/components/hooks/use-toast'
import { useUpdateUser } from '@/hooks/useUser'
import { getSignatureFromLocalStorage } from '@/utils/signature'
import type { Address } from 'viem'
import { useSignMessage } from 'wagmi'

export const useSaveUserInfo = (address: Address) => {
  const { toast } = useToast()
  const updateUserInfo = useUpdateUser(address)
  const { signMessageAsync } = useSignMessage()

  const saveUserInfo = async (newName: string, newIconUrl: string) => {
    if (address === undefined) return

    const signature = getSignatureFromLocalStorage(address)
    if (signature) {
      await updateUserInfo.mutateAsync({ name: newName, address, iconUrl: newIconUrl, signature })
      toast({
        title: 'Successfully updated!',
        duration: 3000,
      })
    } else {
      signMessageAsync({ message: 'Update Profile' }).then(async (data) => {
        try {
          await updateUserInfo.mutateAsync({ name: newName, address, iconUrl: newIconUrl, signature: data })
          localStorage.setItem(address, JSON.stringify({ signature: data, timestamp: new Date().getTime() }))
          toast({
            title: 'Successfully updated!',
            duration: 3000,
          })
        } catch (e) {
          toast({
            title: 'Failed to update profile',
            variant: 'destructive',
            duration: 3000,
          })
        }
      })
    }
  }

  return { saveUserInfo }
}
