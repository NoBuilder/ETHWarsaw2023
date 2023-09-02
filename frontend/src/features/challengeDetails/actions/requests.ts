import { Contract, ethers } from 'ethers'
import { contractDetails } from '@/config'
import { request } from '@/lib/axios'
import { provider } from '@/lib/wagmi'
import { Challenge } from '@/models'
import { GetChallengeDetailsRequest, GetChallengeRequest } from '../types'

export const getChallenge = async (req: GetChallengeRequest) => {
  const contract = new Contract(
    contractDetails.address,
    contractDetails.abi,
    provider
  )
  const challenge = await contract.challengeById(ethers.BigNumber.from(req.id))

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
          name: 'Beneficiary name',
          address: '0x1234567890123456789012345678901234567890',
          description: 'Beneficiary description',
          logo: 'https://picsum.photos/200/300',
          url: 'https://google.com'
        },
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, dolores? Eligendi aliquid voluptatum reiciendis perspiciatis exercitationem esse quae porro iure.',
        id: 1,
        jury: [
          {
            name: 'Jury member 1',
            address: '0x16D6dF27993D0aEcE005F0a94107229f3843Bcf6'
          },
          {
            name: 'Jury member 2',
            address: '0x1234567890123456789012345678901234567890'
          },
          {
            name: 'Jury member 3',
            address: '0x1234567890123456789012345678901234567890',
            avatar: 'https://picsum.photos/200/300'
          }
        ],
        owner: {
          address: '0x1234567890123456789012345678901234567890',
          avatar: 'https://picsum.photos/200/300',
          name: 'Owner name'
        },
        stake: 100,
        title: 'Challenge title'
      },
      shouldReject: false
    }
  )
