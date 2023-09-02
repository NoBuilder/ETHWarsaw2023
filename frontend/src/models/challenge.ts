import { Address } from '@/types'

export type JuryMember = {
  name: string
  address: string
  avatar?: string
}

export type ChallengeOwner = {
  name: string
  address: Address
  avatar?: string
}

export type Beneficiary = {
  name: string
  address: Address
  description: string
  logo?: string
  url?: string
}

export type Jury = Array<JuryMember>

export type Challenge = {
  id: number
  owner: ChallengeOwner
  title: string
  description: string
  stake: number
  jury: Jury
  deadline: number
  beneficiary: Beneficiary
}
