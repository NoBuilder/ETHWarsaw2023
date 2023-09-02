'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button, LoaderCircle } from '@/components'
import { cn } from '@/utils'

export const WalletButton = () => {
  const { disconnect } = useDisconnect()

  const { isConnected, isConnecting } = useAccount()
  const { connectors, isLoading, pendingConnector, connect } = useConnect()

  const metamaskConnector = connectors.find(
    connector => connector.name === 'MetaMask' && connector.ready
  )

  const manageConnection = () =>
    isConnected ? disconnect() : connect({ connector: metamaskConnector })

  return (
    <Button
      className={cn('whitespace-nowrap sm:mr-2')}
      onClick={manageConnection}
    >
      {isConnected
        ? 'disconnect'
        : isConnecting
        ? 'connecting'
        : 'connect wallet'}
      {isLoading && metamaskConnector?.id === pendingConnector?.id && (
        <LoaderCircle />
      )}
    </Button>
  )
}
