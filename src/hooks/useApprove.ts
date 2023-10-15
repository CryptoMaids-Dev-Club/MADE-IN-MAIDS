import { useDebounce } from 'usehooks-ts'
import { Address, erc20ABI, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

export const useApprove = (address: Address, owner: Address, spender: Address) => {
  const enabled = useDebounce(!!address && !!owner && !!spender)

  const prepare = usePrepareContractWrite({
    address: address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffff')],
    enabled: enabled,
  })
  const approve = useContractWrite({
    ...prepare.config,
  })

  const approveTx = useWaitForTransaction({
    hash: approve.data?.hash,
  })

  return { prepare, approve, approveTx }
}
