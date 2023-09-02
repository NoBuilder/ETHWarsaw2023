import { ChainType, chainNames } from '@/types'

export const shortenAddress = (address: string | undefined) =>
  `${address?.slice(0, 4)}...${address?.slice(-4)}`

export const explorerUrl = (txHash: string) =>
  `https://explorer.celo.org/alfajores/tx/${txHash}`

export const celoAlfajoresId = 44787

export const isceloAlfajoresChain = (chain: ChainType) =>
  chain?.id === celoAlfajoresId

export const chainName = (chain: ChainType) => chainNames[chain?.id as number]
