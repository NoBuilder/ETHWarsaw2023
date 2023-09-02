'use client'

import { useAccount } from 'wagmi'
import { Image } from '@/components'
import { JuryMember } from '@/models'
import AvatarPlaceholder from '@/public/images/judge-avatar.webp'
import { JuryButtons } from './JuryButtons'

type JuryProps = {
  jury: Array<JuryMember>
  safeAddress: string
}

export const Jury: React.FC<JuryProps> = ({ jury, safeAddress }) => {
  const { address } = useAccount()
  const isJudge = jury.some(member => member.address === address)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6">
        {jury.map(member => (
          <div
            key={member.name}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={member.avatar || AvatarPlaceholder}
                fill
                alt={member.name}
              />
            </div>
            <p
              className={`text-xs text-gray-500 ${
                address === member.address && 'text-primary'
              }`}
            >
              {member.name}
            </p>
          </div>
        ))}
      </div>
      {isJudge && <JuryButtons safeAddress={safeAddress} />}
    </div>
  )
}
