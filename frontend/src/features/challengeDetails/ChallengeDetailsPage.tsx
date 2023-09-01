import { Challenge } from '@/models'
import { DetailsCard } from './components'

type ChallengeDetailsPageProps = {
  challenge: Challenge
}

export const ChallengeDetailsPage: React.FC<ChallengeDetailsPageProps> = ({
  challenge
}) => (
  <section className="layout-section flex-1 items-center justify-center">
    <DetailsCard
      title={challenge.title}
      description={challenge.description}
      stake={challenge.stake}
      ownerName={challenge.owner.name}
      ownerAddress={challenge.owner.address}
      ownerAvatar={challenge.owner.avatar}
    />
  </section>
)
