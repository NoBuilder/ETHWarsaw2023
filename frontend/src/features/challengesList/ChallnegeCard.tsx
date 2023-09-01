import { Challenge } from '@/models/challenge'

type ChallengeCardProps = Challenge

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  stake,
  deadline
}) => (
  <div className="flex h-[150px] w-[300px] flex-col border">
    <h2 className="font-bold">{title}</h2>
    <p className="text-xs font-light">{description}</p>
    <h3>{`Bounty: ${stake} $`}</h3>
    <h3>{`Deadline: ${deadline}`}</h3>
  </div>
)
