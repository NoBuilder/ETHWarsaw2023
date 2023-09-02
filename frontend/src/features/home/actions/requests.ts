import { request } from '@/lib/axios'
import { Challenge } from '@/models'

export const getChallengesList = async (): Promise<Array<Challenge>> =>
  request<undefined, Array<Challenge>>(
    {
      method: 'get',
      url: '/challenge/1',
      req: undefined
    },
    {
      mockData: [
        {
          deadline: 1697609989,
          beneficiary: {
            name: 'Beneficiary name',
            address: '0x12312',
            description: 'Beneficiary description',
            logo: 'https://picsum.photos/200/300',
            url: 'https://google.com'
          },
          description:
            'DoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod',
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
        {
          deadline: 1697609989,
          beneficiary: {
            name: 'Beneficiary name',
            address: '0x12312',
            description: 'Beneficiary description',
            logo: 'https://picsum.photos/200/300',
            url: 'https://google.com'
          },
          description: 'Challenge description',
          id: 2,
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
        {
          deadline: 1697609989,
          beneficiary: {
            name: 'Beneficiary name',
            address: '0x12312',
            description: 'Beneficiary description',
            logo: 'https://picsum.photos/200/300',
            url: 'https://google.com'
          },
          description: 'Challenge description',
          id: 3,
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
        {
          deadline: 1697609989,
          beneficiary: {
            name: 'Beneficiary name',
            address: '0x12312',
            description: 'Beneficiary description',
            logo: 'https://picsum.photos/200/300',
            url: 'https://google.com'
          },
          description: 'Challenge description',
          id: 4,
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
        }
      ],
      shouldReject: false
    }
  )
