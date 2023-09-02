import { Contract } from 'ethers/lib/ethers'
import { contractDetails } from '@/config'
import { provider } from '@/lib/wagmi'

export const getLastId = async () => {
  const contract = new Contract(
    contractDetails.address,
    contractDetails.abi,
    provider
  )
  const lastId = await contract.lastId()

  return Number(lastId._hex)
}
