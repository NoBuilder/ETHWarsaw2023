import { notFound } from 'next/navigation'
import {
  ChallengeDetailsPage,
  getChallengeDetails
} from '@/features/challengeDetails'
import { getMetadata } from '@/utils'

type PageProps = {
  params: {
    challengeId: string
  }
}

const Page: React.FC<PageProps> = async ({ params: { challengeId } }) => {
  const data = await getChallengeDetails({ id: challengeId })

  if (!data) {
    return notFound()
  }

  return (
    <ChallengeDetailsPage
      challenge={data}
      challengeId={challengeId}
    />
  )
}

export const generateMetadata = async ({
  params: { challengeId }
}: PageProps) => {
  const data = await getChallengeDetails({ id: challengeId })

  return getMetadata({
    title: data?.title || undefined
  })
}

export default Page
