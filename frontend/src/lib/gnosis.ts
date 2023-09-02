import SafeApiKit from '@safe-global/api-kit'
import {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory
} from '@safe-global/protocol-kit'
import Safe from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { provider } from './wagmi'

const getEthAdapter = async () => {
  if (!provider) {
    throw new Error('No provider')
  }

  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer
  })

  return ethAdapter
}

export const getGnosis = async () => {
  const ethAdapter = await getEthAdapter()

  const txServiceUrl = 'https://safe-transaction-celo.safe.global/'
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter })
  const safeFactory = await SafeFactory.create({ ethAdapter })

  return { safeFactory, safeService }
}

export const getSafe = async (safeAddress: string) => {
  const ethAdapter = await getEthAdapter()

  return await Safe.create({
    ethAdapter,
    safeAddress
  })
}

export const deploySafe = async (safeAccountConfig: SafeAccountConfig) => {
  const { safeFactory } = await getGnosis()

  const safe = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce: Date.now().toString(),
    options: { gasLimit: 400_000 }
  })

  return safe
}
