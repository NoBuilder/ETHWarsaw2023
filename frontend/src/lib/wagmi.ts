import { providers } from 'ethers'
import { configureChains, createConfig } from 'wagmi'
import { celo } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const provider = new providers.Web3Provider(window.ethereum, 'any')

const { publicClient, webSocketPublicClient } = configureChains(
  [celo],
  [publicProvider()]
)

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient
})
