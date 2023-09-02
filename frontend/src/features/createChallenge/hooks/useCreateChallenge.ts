import { useMutation } from '@tanstack/react-query'
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction
} from '@wagmi/core'
import { ContractFunctionExecutionError, parseEther } from 'viem'
import { useAccount, useConnect } from 'wagmi'
import { redirect } from 'next/navigation'
import { InternalLink } from '@/config'
import { contractDetails } from '@/config/contract'
import { deploySafe } from '@/lib/gnosis'
import { QueryKey } from '@/lib/reactQuery'
import { Address } from '@/types'

type CreateChallengeProps = {
  title: string
  endDate: number
  beneficiary: string
  address: Address
  value: number
  juryAddress: Array<Address>
}
const onCreateChallenge = async ({
  beneficiary,
  endDate,
  title,
  value,
  juryAddress
}: CreateChallengeProps) => {
  const safe = await deploySafe({
    owners: juryAddress,
    threshold: 1
  })
  const gnosisSafeAddress = await safe.getAddress()

  const config = await prepareWriteContract({
    address: contractDetails.address,
    abi: contractDetails.abi,
    functionName: 'create',
    args: [title, endDate, beneficiary, gnosisSafeAddress],
    value: parseEther(value.toString())
  })

  const { hash } = await writeContract(config)

  const { transactionHash, status } = await waitForTransaction({
    hash
  })

  return {
    transactionHash,
    status
  }
}

export const useCreateChallenge = () => {
  const { isConnected, isConnecting, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { data, isLoading, error, mutate } = useMutation(
    [QueryKey.createChallenge],
    onCreateChallenge,
    {
      onSuccess: () => {
        setTimeout(() => {
          redirect(InternalLink.home as string)
        }, 2000)
      }
    }
  )

  return {
    isConnected,
    isConnecting,
    connect: () =>
      connect({
        connector: connectors[0]
      }),
    isLoading,
    error: (error as ContractFunctionExecutionError) || undefined,
    createChallenge: mutate,
    data,
    address
  }
}
