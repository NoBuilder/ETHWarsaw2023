'use client'

import { useQueries, useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/lib/reactQuery'
import { Challenge } from '@/models'
import { getChallenge } from '../challengeDetails/actions/'
import { ChallengeCard } from './ChallnegeCard'
import { getLastId } from './actions'

type ChallengeListProps = {
  challenges: Array<Challenge>
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  const { data: lastChallengeId } = useQuery([QueryKey.getLastId], () =>
    getLastId()
  )

  const arr = lastChallengeId
    ? Array.from({ length: lastChallengeId }, (_, index) => index + 1)
    : []

  const results = useQueries({
    queries: arr.map(id => ({
      queryKey: [QueryKey.getChallenge, id],
      queryFn: () => getChallenge({ id })
    }))
  })

  const dataResults = results.map(result => result.data)

  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {dataResults?.map((challenge, index) => (
        <ChallengeCard
          key={index}
          id={index}
        />
      ))}
    </div>
  )
}
