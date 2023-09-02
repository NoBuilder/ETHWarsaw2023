import { Chain } from 'viem'

export const chainNames: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Ethereum Goerli',
  10: 'OP Mainnet',
  25: 'Cronos Mainnet',
  56: 'BSC Mainnet',
  137: 'Polygon Mainnet',
  42161: 'Arbitrum One',
  43114: 'Avalanche C-Chain',
  80001: 'Polygon Testnet',
  421613: 'Arbitrum Testnet',
  280: 'zkSync Era Testnet',
  324: 'zkSync Era Mainnet',
  84531: 'Base Goerli',
  8453: 'Base Mainnet',
  42220: 'Celo',
  17323: 'Celo Cannoli',
  44787: 'Celo Alfajores'
}

export type ChainType =
  | (Chain & {
      unsupported?: boolean | undefined
    })
  | undefined
