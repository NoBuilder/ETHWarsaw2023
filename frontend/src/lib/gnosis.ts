import SafeApiKit from '@safe-global/api-kit'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { provider } from './wagmi'

export const deploySafe = async (safeAccountConfig: SafeAccountConfig) => {
  if (!provider) {
    throw new Error('No provider')
  }

  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer
  })
  const txServiceUrl = 'https://safe-transaction-celo.safe.global/'
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter })
  const safeFactory = await SafeFactory.create({ ethAdapter })
  const safe = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce: Date.now().toString(),
    options: { gasLimit: 400_000 }
  })

  return safe
}
