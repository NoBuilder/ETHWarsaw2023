import { request } from '@/lib/axios'
import { Challenge } from '@/models'
import { GetChallengeDetailsRequest } from '../types'

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
        deadline: 214124512512,
        beneficiary: {
          name: 'Beneficiary name',
          address: '0x12312',
          description: 'Beneficiary description',
          logo: 'https://picsum.photos/200/300',
          url: 'https://google.com'
        },
        description: 'Challenge description',
        id: 1,
        jury: [
          {
            name: 'Jury member 1',
            address: '0x12312',
            avatar: 'https://picsum.photos/200/300'
          }
        ],
        owner: {
          address: '0x12312',
          avatar: 'https://picsum.photos/200/300',
          name: 'Owner name'
        },
        stake: 100,
        title: 'Challenge title'
      },
      shouldReject: false
    }
  )
