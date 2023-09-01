import { configureChains, createConfig } from 'wagmi'
import { celoAlfajores } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores],
  [publicProvider()]
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
})
