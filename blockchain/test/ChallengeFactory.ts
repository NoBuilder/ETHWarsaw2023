import { expect } from 'chai'
import { ethers } from 'hardhat'
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { getChallengeId, setETHBalance, unit } from './utils'
import type { ChallengeFactory } from '../typechain-types'

const TEST_TITLE = 'Test Challenge'
const TEST_END_DATE = Math.ceil(Date.now() / 1000) + (60 * 60 * 24 * 3)

describe('ChallengeFactory', async () => {
  let deployer: SignerWithAddress
  let alice: SignerWithAddress
  let bob: SignerWithAddress
  let carol: SignerWithAddress
  let safe: SignerWithAddress

  let factory: ChallengeFactory

  before(async () => ([deployer, alice, bob, carol, safe] = await ethers.getSigners()))

  beforeEach(async () => {
    const ChallengeFactory = await ethers.getContractFactory('ChallengeFactory')
    factory = await ChallengeFactory.deploy()
    await factory.deployed()

    await setETHBalance(deployer.address, unit(1))
    await setETHBalance(alice.address, unit(1))
    await setETHBalance(bob.address, unit(1))
    await setETHBalance(safe.address, unit(1))
  })

  it('Should be able to create a challenge', async () => {
    const tx = await factory.create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)
    expect(challengeId).to.equal(1)

    const challenge = await factory.challengeById(challengeId)
    expect(challenge.id).to.equal(challengeId)
    expect(challenge.owner).to.equal(deployer.address)
    expect(challenge.title).to.equal(TEST_TITLE)
    expect(challenge.endDate).to.equal(TEST_END_DATE)
    expect(challenge.beneficiary).to.equal(alice.address)
    expect(challenge.totalAmount).to.equal(123)
    expect(challenge.outcome).to.equal(false)

    const participantsLength = await factory.getParticipantsLength(challengeId)
    expect(participantsLength).to.equal(0)
  })

  it('The safe should be able to conclude the challenge and return funds to the owner', async () => {
    const tx = await factory.connect(bob).create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)

    const beforeBalance = await ethers.provider.getBalance(bob.address)
    await factory.connect(safe).conclude(challengeId, true)
    const afterBalance = await ethers.provider.getBalance(bob.address)
    expect(afterBalance).to.equal(beforeBalance.add(123))
  })

  it('The safe should be able to conclude the challenge with false sending funds to beneficiary', async () => {
    const tx = await factory.connect(bob).create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)

    const beforeBalance = await ethers.provider.getBalance(alice.address)
    await factory.connect(safe).conclude(challengeId, false)
    const afterBalance = await ethers.provider.getBalance(alice.address)
    expect(afterBalance).to.equal(beforeBalance.add(123))
  })

  it('The owner should be able to cancel the challenge sending the funds to beneficiary', async () => {
    const factoryBalanceBefore = await ethers.provider.getBalance(factory.address)
    const tx = await factory.connect(bob).create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const factoryBalanceAfter = await ethers.provider.getBalance(factory.address)
    expect(factoryBalanceAfter).to.equal(factoryBalanceBefore.add(123))

    const challengeId = await getChallengeId(factory, tx)
    const beforeBalance = await ethers.provider.getBalance(alice.address)
    await factory.connect(bob).cancel(challengeId)
    const afterBalance = await ethers.provider.getBalance(alice.address)
    expect(afterBalance).to.equal(beforeBalance.add(123))

    const challenge = await factory.challengeById(challengeId)
    expect(challenge.id).to.equal(challengeId)
    expect(challenge.outcome).to.equal(false)
    expect(challenge.beneficiary).to.equal(alice.address)
  })

  it('The non-safe should not be able to conclude the challenge', async () => {
    const tx = await factory.create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)
    expect(factory.connect(bob).conclude(challengeId, true)).to.revertedWithCustomError(factory, 'NotASafe')
  })

  it('The safe should not be able to conclude the challenge again', async () => {
    const tx = await factory.connect(bob).create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)

    await factory.connect(safe).conclude(challengeId, true)
    expect(factory.connect(safe).conclude(challengeId, true)).to.revertedWithCustomError(factory, 'AlreadyConcluded')
  })

  it('The non-owner should not be able to cancel the challenge', async () => {
    const tx = await factory.connect(bob).create(
      TEST_TITLE,
      TEST_END_DATE,
      alice.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)
    expect(factory.connect(alice).cancel(challengeId)).to.revertedWithCustomError(factory, 'NotAnOwner')
  })

  it('People should be able to join a challenge', async () => {
    const factoryBalanceBefore = await ethers.provider.getBalance(factory.address)
    const tx = await factory.create(
      TEST_TITLE,
      TEST_END_DATE,
      carol.address,
      safe.address,
      {
        value: 123,
      }
    )
    const challengeId = await getChallengeId(factory, tx)

    await factory.connect(alice).join(challengeId, { value: 234 })
    await factory.connect(bob).join(challengeId, { value: 345 })

    const factoryBalanceAfter = await ethers.provider.getBalance(factory.address)
    expect(factoryBalanceAfter).to.equal(factoryBalanceBefore.add(123 + 234 + 345))
  })
})
