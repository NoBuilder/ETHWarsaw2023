import { useQuery } from '@tanstack/react-query'
import { Image } from '@/components'
import { QueryKey } from '@/lib/reactQuery'
import { Beneficiary, JuryMember } from '@/models'
import { getChallenge } from '../actions'
import { Countdown } from './Countdown'
import { Jury } from './Jury'

type DetailsCardProps = {
  title: string
  description: string
  stake: number
  ownerName: string
  ownerAddress?: string
  ownerAvatar?: string
  deadline: number
  beneficiary: Beneficiary
  jury: Array<JuryMember>
  challengeId: string
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  description,
  title,
  stake,
  ownerName,
  ownerAddress,
  ownerAvatar,
  deadline,
  beneficiary,
  jury,
  challengeId
}) => {
  const id = Number(challengeId)
  const { data: challenge } = useQuery([QueryKey.getChallenge, id], () =>
    getChallenge({ id })
  )

  const safeAddress = challenge?.safe

  // const { data: judges } = useQuery([], () => getJudges({ safeAddress }))

  return (
    <article className="flex w-full max-w-xl flex-col  overflow-hidden rounded-3xl shadow-xl">
      <div className="flex flex-col items-center gap-6 bg-primary/90 px-6 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl text-white">{title}</h2>
          <h2 className="text-2xl text-white">${stake}</h2>
        </div>
        <div className="relative -mb-24 h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={
              ownerAvatar ||
              'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010'
            }
            fill
            alt={ownerName}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-20 text-center">
        <div className="flex flex-col items-center gap-4">
          {ownerAddress && (
            <p className="text-sm font-semibold text-gray-500">
              {ownerAddress}
            </p>
          )}
          <h3 className="mb-2 text-3xl font-bold text-gray-800">{ownerName}</h3>
          <p className="text-lg font-light text-gray-500">{description}</p>
          <Countdown timestamp={deadline} />
          <h4 className="mt-6 text-xl font-semibold text-gray-500">
            Beneficiary
          </h4>
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={
                beneficiary.logo ||
                'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010'
              }
              fill
              alt={beneficiary.name}
            />
          </div>
          <p className="text-sm font-semibold ">{beneficiary.name}</p>
          <span className="mt-10 text-2xl font-semibold ">Jury members</span>
          <Jury
            safeAddress={safeAddress}
            jury={jury}
          />
          <div className="mt-6 flex items-center gap-6">
            <span className="text-xs">Powered by:</span>
            <Image
              width={80}
              height={50}
              src="https://i.imgur.com/fyrJi0R.png"
              alt="powered by celo"
            />
            <Image
              width={80}
              height={50}
              src="https://www.forex.academy/wp-content/uploads/2020/10/1_DZopze1Xtir7mZHraVNZ_w.png"
              alt="powered by gnosis"
            />
            <Image
              width={80}
              height={50}
              src="https://pbs.twimg.com/media/FUuoMNKWAAIiZ0B?format=jpg&name=large"
              alt="powered by ethwarsaw"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
