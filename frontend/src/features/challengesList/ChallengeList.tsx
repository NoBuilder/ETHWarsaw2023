import { Challenge } from '@/models'
import { ChallengeCard } from './ChallnegeCard'

type ChallengeListProps = {
  challenges: Array<Challenge>
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => (
  <div className="flex w-full flex-wrap justify-center gap-5 overflow-auto border">
    {challenges?.map(challenge => (
      <ChallengeCard
        key={challenge.id}
        {...challenge}
      />
    ))}
  </div>
)
