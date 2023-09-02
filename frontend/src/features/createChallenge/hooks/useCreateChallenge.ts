import { useAccount, useConnect } from 'wagmi'

export const useCreateChallenge = () => {
  const { isConnected, isConnecting } = useAccount()
  const { connect, connectors } = useConnect()

  return {
    isConnected,
    isConnecting,
    connect: () =>
      connect({
        connector: connectors[0]
      })
  }
}
