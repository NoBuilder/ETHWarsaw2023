import { CreateChallengePage } from '@/features/createChallenge'
import { DEFAULT_JURY_ADDRESSES } from '@/features/createChallenge/constants'
import { getMetadata } from '@/utils'
import { getSocialMediaInfo } from '@/utils/airstack'

export const metadata = getMetadata({
  title: 'Create Challenge'
})

const Page = async () => {
  const jury = await getSocialMediaInfo(DEFAULT_JURY_ADDRESSES)

  return (
    <CreateChallengePage
      jury={jury.map(member => ({
        address: member.profileInfo.userAddress,
        name: member.name,
        avatar: member.avatar || undefined
      }))}
    />
  )
}

export default Page
