'use client'

import { useAccount, useNetwork } from 'wagmi'
import { shortenAddress, chainName } from '@/utils'
import { NetworkSwitch } from './NetworkSwitch'

export const ConnectionLabel: React.FC = () => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const text = `${shortenAddress(address)}, ${chainName(chain)}.`

  return (
    <>
      {address && chain && (
        <div className="sm:text-md flex flex-col items-end justify-center gap-1 text-xs">
          <p className="text-center font-main sm:whitespace-nowrap">{text}</p>
          <NetworkSwitch />
        </div>
      )}
    </>
  )
}
