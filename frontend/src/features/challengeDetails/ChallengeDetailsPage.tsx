'use client'

import { Challenge } from '@/models'
import { DetailsCard } from './components'

type ChallengeDetailsPageProps = {
  challenge: Challenge
  challengeId: string
}

export const ChallengeDetailsPage: React.FC<ChallengeDetailsPageProps> = ({
  challenge,
  challengeId
}) => (
  <section className="layout-section flex-1 items-center justify-center">
    <DetailsCard
      title={challenge.title}
      description={challenge.description}
      stake={challenge.stake}
      ownerName={challenge.owner.name}
      ownerAddress={challenge.owner.address}
      ownerAvatar={challenge.owner.avatar}
      deadline={challenge.deadline}
      beneficiary={challenge.beneficiary}
      jury={challenge.jury}
      challengeId={challengeId}
    />
  </section>
)
