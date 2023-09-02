'use client'

import { useNetwork, useSwitchNetwork } from 'wagmi'
import { LoaderCircle } from '@/components'
import { chainNames } from '@/types'
import { celoAlfajoresId } from '@/utils'

export const NetworkSwitch = () => {
  const { chain } = useNetwork()
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const underlined = !isLoading && 'underline'
  const requiredChainId = celoAlfajoresId

  return (
    <>
      {requiredChainId !== chain?.id && (
        <button
          onClick={() => switchNetwork?.(celoAlfajoresId)}
          className={`font-main text-primary sm:whitespace-nowrap ${underlined} animate-color-change`}
          disabled={isLoading}
        >
          {isLoading && pendingChainId === requiredChainId ? (
            <>
              {'Switching... '}
              <LoaderCircle />
            </>
          ) : (
            `Switch to ${chainNames[requiredChainId]}`
          )}
        </button>
      )}
    </>
  )
}
