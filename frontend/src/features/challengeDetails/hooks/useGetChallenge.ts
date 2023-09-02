import { Contract } from 'ethers'
import { contractDetails } from '@/config/contract'
import { provider } from '@/lib/wagmi'

export const useGetChallenge = async (challengeId: number) => {
  const contract = new Contract(
    contractDetails.address,
    contractDetails.abi,
    provider
  )
  const challenge = await contract.challengeById(challengeId)

  return { challenge }
}
