import { AppName } from '@/config'
import { getSocialMediaInfo } from '@/utils/airstack'
import { ChallengeList } from '../challengesList'

export const HomePage = async () => {
  const addressees = [
    '0xeB1c22baACAFac7836f20f684C946228401FF01C',
    '0x6f73ea756bd57d3adcafb73a4f5fcd750ec1c387',
    '0x16D6dF27993D0aEcE005F0a94107229f3843Bcf6'
  ]

  const socialMedia = await getSocialMediaInfo(addressees)
  console.log('socialMedia', socialMedia)

  return (
    <section className="layout-section items-start gap-8">
      <h1 className="font-main text-4xl font-extrabold text-primary max-sm:text-3xl">
        {AppName}!
      </h1>
      <ChallengeList />
    </section>
  )
}
