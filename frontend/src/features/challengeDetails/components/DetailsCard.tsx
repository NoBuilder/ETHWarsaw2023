import { Image } from '@/components'

type DetailsCardProps = {
  title: string
  description: string
  stake: number
  ownerName: string
  ownerAddress?: string
  ownerAvatar?: string
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  description,
  title,
  stake,
  ownerName,
  ownerAddress,
  ownerAvatar
}) => (
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
      <div className="flex flex-col items-center gap-2">
        {ownerAddress && (
          <p className="text-sm font-semibold text-gray-500">{ownerAddress}</p>
        )}
        <h3 className="mb-2 text-3xl font-bold text-gray-800">{ownerName}</h3>
        <h4 className="text-xl font-semibold text-gray-500">{description}</h4>
      </div>
    </div>
  </article>
)
