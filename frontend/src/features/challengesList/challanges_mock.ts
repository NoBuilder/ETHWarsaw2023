import { Beneficiary, Jury, ChallengeOwner, Challenge } from '@/models'

const BENEFICIARY: Beneficiary = {
  name: 'Zecobricks',
  description: "Organization making bricks from ocean's plastic",
  address: '0x1234'
}
const JURY: Jury = [
  {
    name: 'Jury 1',
    address: '0x1234',
    avatar: 'url...'
  }
]
const CHALLENGE_OWNER: ChallengeOwner = {
  name: 'Jury 1',
  address: '0x1234',
  avatar: 'url...'
}

export const CHALLENGES: Array<Challenge> = [
  {
    id: 1,
    title: 'Cleaning Nungwi beaches',
    description:
      'Ocean plastic is a huge problem. We need to clean the beaches of Nungwi',
    stake: 100,
    beneficiary: BENEFICIARY,
    deadline: 1694596142,
    jury: JURY,
    owner: CHALLENGE_OWNER
  },
  {
    id: 2,
    title: 'Cut, clean & dry plastic garbage in Kiwengwa',
    description: 'We need to cut, clean & dry plastic garbage to make bricks',
    stake: 200,
    beneficiary: BENEFICIARY,
    deadline: 1694596142,
    jury: JURY,
    owner: CHALLENGE_OWNER
  },
  {
    id: 3,
    title: 'Make 100 bricks',
    description:
      'We need to make 100 bricks from ocean plastic by the end of the month',
    stake: 300,
    beneficiary: BENEFICIARY,
    deadline: 1694596142,
    jury: JURY,
    owner: CHALLENGE_OWNER
  },
  {
    id: 4,
    title: 'Challenge 4',
    description: 'This is the fourth challenge',
    stake: 400,
    beneficiary: BENEFICIARY,
    deadline: 1694596142,
    jury: JURY,
    owner: CHALLENGE_OWNER
  }
]
