import { AppName } from '@/config'
import { ChallengeList } from '../challengesList'
import { getChallengesList } from './actions'

export const HomePage = async () => {
  const list = await getChallengesList({})
  console.log(list)

  return (
    <section className="layout-section items-start gap-8">
      <h1 className="font-main text-4xl font-extrabold text-primary max-sm:text-3xl">
        {AppName}!
      </h1>
      <ChallengeList challenges={list} />
    </section>
  )
}
