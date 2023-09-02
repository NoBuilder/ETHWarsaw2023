import { Challenge } from '@/models'
import { ChallengeCard } from './ChallnegeCard'

type ChallengeListProps = {
  challenges: Array<Challenge>
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => (
  <div className="flex w-full flex-wrap justify-center gap-4">
    {challenges?.map(challenge => (
      <ChallengeCard
        key={challenge.id}
        id={challenge.id}
        title={challenge.title}
        stake={challenge.stake}
        ownerName={challenge.owner.name}
        ownerAvatar={challenge.owner.avatar}
        deadline={challenge.deadline}
      />
    ))}
  </div>
)
