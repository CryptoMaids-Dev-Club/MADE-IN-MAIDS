import { Address, recoverMessageAddress } from 'viem'

const localStorageLimit = 60 * 60 * 24 * 7 * 1000 // 7 days

type SavedSignature = {
  signature: string
  timestamp: number
}

export function getSignatureFromLocalStorage(address: string) {
  const savedSignature = localStorage.getItem(address)

  if (!savedSignature) return null

  const { signature, timestamp } = JSON.parse(savedSignature) as SavedSignature
  if (Date.now() - timestamp > localStorageLimit) {
    localStorage.removeItem(address)

    return null
  }

  return signature
}

export function saveSignatureToLocalStorage(address: string, signature: string) {
  const savedSignature = JSON.stringify({ signature, timestamp: Date.now() })

  localStorage.setItem(address, savedSignature)
}

export async function verifySignature(address: Address, message: string, signature: Address) {
  const recoveredAddress = await recoverMessageAddress({
    message,
    signature,
  })

  return recoveredAddress.toLowerCase() === address.toLowerCase()
}
