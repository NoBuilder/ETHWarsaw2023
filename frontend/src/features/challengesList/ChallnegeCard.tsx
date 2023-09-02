import { format, fromUnixTime } from 'date-fns'
import { Image } from '@/components'

type ChallengeCardProps = {
  title: string
  stake: number
  deadline: number
  ownerName: string
  ownerAvatar?: string
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  stake,
  ownerName,
  ownerAvatar,
  deadline
}) => (
  <div className="flex h-[200px] w-[350px] max-w-xl flex-col  overflow-hidden rounded-3xl shadow-xl">
    <div className="flex h-[50px] flex-col items-center justify-center bg-primary/90 px-6 py-2">
      <h2 className="text-xl text-white">{title}</h2>
    </div>

    <div className="flex h-full flex-col items-center  text-center">
      <h3 className=" text-xl font-bold text-gray-800">{ownerName}</h3>

      <div className="relative -mb-16  h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={
            ownerAvatar ||
            'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010'
          }
          fill
          alt={ownerName}
        />
      </div>

      <div className="flex flex-col h-full pb-4 justify-end">
        <h2 className="text-lg text-black">${stake}</h2>
        <h2 className="text-sm text-black">{`Deadline: ${format(
          fromUnixTime(deadline),
          'dd.MM.yyyy'
        )}`}</h2>
      </div>
    </div>
  </div>
)
