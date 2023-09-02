import { useMutation } from '@tanstack/react-query'
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction
} from '@wagmi/core'
import { ContractFunctionExecutionError, parseEther } from 'viem'
import { useAccount, useConnect } from 'wagmi'
import abi from '@/config/ChallengeFactoryABI.json'
import { QueryKey } from '@/lib/reactQuery'
import { Address } from '@/types'

type CreateChallengeProps = {
  title: string
  endDate: number
  beneficiary: string
  address: Address
  value: number
}
const onCreateChallenge = async ({
  address,
  beneficiary,
  endDate,
  title,
  value
}: CreateChallengeProps) => {
  // TODO: get gnosis safe address from gnosis SDK
  const gnosisSafe = address

  const config = await prepareWriteContract({
    address,
    abi: abi,
    functionName: 'create',
    args: [title, endDate, beneficiary, gnosisSafe],
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
    onCreateChallenge
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
