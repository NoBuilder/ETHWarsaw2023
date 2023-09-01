import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.info('Deployer address is:', deployer.address)

  const ChallengeFactory = await ethers.getContractFactory('ChallengeFactory')
  const factory = await ChallengeFactory.deploy()
  await factory.deployed()
  console.info('Factory deployed to:', factory.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
