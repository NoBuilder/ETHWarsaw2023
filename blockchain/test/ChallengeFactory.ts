import { expect } from 'chai'
import { constants } from 'ethers'
import { ethers } from 'hardhat'
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { calculateReceiptETHPaid, getChallengeId, setETHBalance, unit } from './utils'
import type { ChallengeFactory } from '../typechain-types'

const TEST_CHALLENGE = {
  title: 'Test Challenge',
  endDate: Math.ceil(Date.now() / 1000) + (60 * 60 * 24 * 3),
  beneficiary: constants.AddressZero,
}

describe('ChallengeFactory', async () => {
  let deployer: SignerWithAddress
  let alice: SignerWithAddress
  let bob: SignerWithAddress

  let factory: ChallengeFactory

  before(async () => ([deployer, alice, bob] = await ethers.getSigners()))

  beforeEach(async () => {
    const ChallengeFactory = await ethers.getContractFactory('ChallengeFactory')
    factory = await ChallengeFactory.deploy()
    await factory.deployed()

    await setETHBalance(deployer.address, unit(10))
    await setETHBalance(alice.address, unit(10))
    await setETHBalance(bob.address, unit(10))
  })

  it('Should be able to create a challenge', async () => {
    const tx = await factory.create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, TEST_CHALLENGE.beneficiary, {
      value: 123,
    })
    const challengeId = await getChallengeId(factory, tx)
    expect(challengeId).to.equal(1)

    const challenge = await factory.challengeById(challengeId)
    expect(challenge.id).to.equal(challengeId)
    expect(challenge.owner).to.equal(deployer.address)
    expect(challenge.title).to.equal(TEST_CHALLENGE.title)
    expect(challenge.endDate).to.equal(TEST_CHALLENGE.endDate)
    expect(challenge.beneficiary).to.equal(TEST_CHALLENGE.beneficiary)
    expect(challenge.totalAmount).to.equal(123)
    expect(challenge.outcome).to.equal(false)

    const participantsLength = await factory.getParticipantsLength(challengeId)
    expect(participantsLength).to.equal(0)
  })

  it('The beneficiary should be able to conclude the challenge', async () => {
    const tx = await factory.connect(bob).create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, alice.address, {
      value: 123,
    })
    const challengeId = await getChallengeId(factory, tx)

    const beforeBalance = await ethers.provider.getBalance(bob.address)
    await factory.connect(alice).conclude(challengeId)
    const afterBalance = await ethers.provider.getBalance(bob.address)
    expect(afterBalance).to.equal(beforeBalance.add(123))
  })

  it('The owner should be able to cancel the challenge', async () => {
    const factoryBalanceBefore = await ethers.provider.getBalance(factory.address)
    const tx = await factory.create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, alice.address, {
      value: 123,
    })
    const factoryBalanceAfter = await ethers.provider.getBalance(factory.address)
    expect(factoryBalanceAfter).to.equal(factoryBalanceBefore.add(123))

    const challengeId = await getChallengeId(factory, tx)
    const beforeBalance = await ethers.provider.getBalance(alice.address)
    await factory.connect(deployer).cancel(challengeId)
    const afterBalance = await ethers.provider.getBalance(alice.address)
    expect(afterBalance).to.equal(beforeBalance.add(123))

    const challenge = await factory.challengeById(challengeId)
    expect(challenge.id).to.equal(challengeId)
    expect(challenge.outcome).to.equal(false)
    expect(challenge.beneficiary).to.equal(alice.address)
  })

  it('The non-beneficiary should not be able to conclude the challenge', async () => {
    const tx = await factory.create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, alice.address, {
      value: 123,
    })
    const challengeId = await getChallengeId(factory, tx)
    expect(factory.connect(bob).conclude(challengeId)).to.revertedWithCustomError(factory, 'NotABeneficiary')
  })

  it('The beneficiary should not be able to conclude the challenge again', async () => {
    const tx = await factory.connect(bob).create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, alice.address, {
      value: 123,
    })
    const challengeId = await getChallengeId(factory, tx)

    await factory.connect(alice).conclude(challengeId)
    expect(factory.connect(alice).conclude(challengeId)).to.revertedWithCustomError(factory, 'AlreadyConcluded')
  })

  it('The non-owner should not be able to cancel the challenge', async () => {
    const tx = await factory.connect(bob).create(TEST_CHALLENGE.title, TEST_CHALLENGE.endDate, alice.address, {
      value: 123,
    })
    const challengeId = await getChallengeId(factory, tx)
    expect(factory.connect(alice).cancel(challengeId)).to.revertedWithCustomError(factory, 'NotAnOwner')
  })
})
