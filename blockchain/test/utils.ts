import { BigNumber, Contract, ContractReceipt, ContractTransaction } from 'ethers'
import { ethers, network } from 'hardhat'

export const calculateReceiptETHPaid = async (tx: ContractTransaction) => {
  const receipt = await tx.wait()
  return receipt.gasUsed.mul(receipt.effectiveGasPrice)
}

export const getEvents = (contract: Contract, receipt: ContractReceipt, eventName: string) => {
  const eventFragment = contract.interface.getEvent(eventName)
  const topic = contract.interface.getEventTopic(eventFragment)
  const decodedLogs = receipt.events
    ?.filter((event) => event.address === contract.address && event.topics.includes(topic))
    .map(event => contract.interface.decodeEventLog(eventName, event.data)) || []
  return decodedLogs
}

export const getChallengeId = async (contract: Contract, tx: ContractTransaction) => {
  const receipt = await tx.wait()
  const [event] = getEvents(contract, receipt, 'ChallengeCreated')
  return event.id.toNumber()
}

export const setETHBalance = async (address: string, newBalance: BigNumber) => {
  await network.provider.send('hardhat_setBalance', [address, newBalance.toHexString().replace('0x0', '0x')])
}

export const unit = (num: number) => ethers.utils.parseEther(num.toString())
