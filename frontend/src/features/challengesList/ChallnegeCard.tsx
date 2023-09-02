'use client'

import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { Image, Link } from '@/components'
import { QueryKey } from '@/lib/reactQuery'
import AvatarPlaceholder from '@/public/images/judge-avatar.webp'
import { unixToDate } from '@/utils'
import { getChallenge } from '../challengeDetails/actions'

type ChallengeCardProps = {
  id: number
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ id }) => {
  const { data: challenge } = useQuery([QueryKey.getChallenge, id], () =>
    getChallenge({ id })
  )

  return (
    <>
      {challenge && (
        <Link
          href={`/${id}`}
          className="flex h-[200px] w-[350px] max-w-xl flex-col  overflow-hidden rounded-3xl shadow-xl"
        >
          <div className="flex h-[50px] flex-col items-center justify-center bg-primary/90 px-6 py-2">
            <h2 className="text-xl text-white">{challenge.title}</h2>
          </div>

          <div className="flex h-full flex-col items-center  text-center">
            <h3 className=" text-xl font-bold text-gray-800">ownerName</h3>

            <div className="relative -mb-16  h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={AvatarPlaceholder}
                fill
                alt="ownerName"
              />
            </div>

            <div className="flex h-full flex-col justify-end pb-4">
              <h2 className="text-lg text-black">
                {ethers.utils.formatEther(Number(challenge.totalAmount._hex))}{' '}
                CELO
              </h2>
              <h2 className="text-sm text-black">
                {`Deadline: ${unixToDate(Number(challenge.endDate._hex))}`}
              </h2>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}
