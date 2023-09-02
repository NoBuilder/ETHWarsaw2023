import { ChainType, chainNames } from '@/types'

export const shortenAddress = (address: string | undefined) =>
  `${address?.slice(0, 4)}...${address?.slice(-4)}`

export const explorerUrl = (txHash: string) =>
  `https://explorer.celo.org/tx/${txHash}`

export const celoId = 42220

export const isCeloChain = (chain: ChainType) => chain?.id === celoId

export const chainName = (chain: ChainType) => chainNames[chain?.id as number]
