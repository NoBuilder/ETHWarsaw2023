import { Contract, ethers } from 'ethers'
import { contractDetails } from '@/config'
import { request } from '@/lib/axios'
import { getGnosis, getSafe } from '@/lib/gnosis'
import { provider } from '@/lib/wagmi'
import { Challenge } from '@/models'
import { GetChallengeDetailsRequest, GetChallengeRequest } from '../types'

export const getJudges = async ({ safeAddress }: { safeAddress: string }) => {
  const gnosis = await getGnosis()
  const safeInfo = await gnosis.safeService.getSafeInfo(safeAddress)
  console.warn('safeInfo', safeInfo)

  return safeInfo
}

export const signTransaction = async ({
  safeAddress,
  transactionHash
}: {
  safeAddress: string
  transactionHash: string
}) => {
  console.warn(`clicked sign transaction ${safeAddress}, ${transactionHash}`)
  const safe = await getSafe(safeAddress)
  await safe.signTransactionHash(transactionHash)
}

export const getChallenge = async (req: GetChallengeRequest) => {
  const contract = new Contract(
    contractDetails.address,
    contractDetails.abi,
    provider
  )
  const challenge = await contract.challengeById(ethers.BigNumber.from(req.id))
  console.warn('challenge', challenge)

  return challenge
}

export const getChallengeDetails = async (
  req: GetChallengeDetailsRequest
): Promise<Challenge> =>
  request<GetChallengeDetailsRequest, Challenge>(
    {
      method: 'get',
      url: '/challenge/1',
      req
    },
    {
      mockData: {
        deadline: 1696202578,
        beneficiary: {
          name: 'Grameen Foundation',
          address: '0x5f44f59d327a4de08c80b23891bfb945583ab42a',
          description: 'Beneficiary description',
          logo: 'https://grameenfoundation.org/images/favicon-32x32.png',
          url: 'https://google.com'
        },
        description:
          'I want to run marathon finally after many many years of trying! :(',
        id: 1,
        jury: [
          {
            name: 'Alice',
            address: '0x16D6dF27993D0aEcE005F0a94107229f3843Bcf6',
            avatar: 'https://flxt.tmsimg.com/assets/218027_v9_bb.jpg'
          },
          {
            name: 'Bob',
            address: '0x1234567890123456789012345678901234567890'
          },
          {
            name: 'Eve',
            address: '0x1234567890123456789012345678901234567890',
            avatar:
              'https://m.natemat.pl/50e1affd34032b133eecd08ad4ec6a20,922,0,0,0.jpg'
          }
        ],
        owner: {
          address: '0x5f44f59d327a4de08c80b23891bfb945583ab42a',
          avatar:
            'https://cdn.vectorstock.com/i/1000x1000/66/18/runner-avatar-design-vector-7956618.webp',
          name: 'Radek'
        },
        stake: 100,
        title: 'Challenge title'
      },
      shouldReject: false
    }
  )
