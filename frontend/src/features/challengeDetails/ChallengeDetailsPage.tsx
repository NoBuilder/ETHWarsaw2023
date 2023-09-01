import { Challenge } from '@/models'

type ChallengeDetailsPageProps = {
  challenge: Challenge
}

export const ChallengeDetailsPage: React.FC<ChallengeDetailsPageProps> = ({
  challenge
}) => (
  <section className="layout-section flex-1 justify-center">
    <h1>{challenge.title}</h1>
    <p>{challenge.description}</p>
  </section>
)
