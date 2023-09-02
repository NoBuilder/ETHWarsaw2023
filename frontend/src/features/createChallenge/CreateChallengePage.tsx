import { CreateChallengeForm } from './components'

export const CreateChallengePage = () => (
  <section className="layout-section items-center gap-6">
    <h1 className="font-main text-4xl font-extrabold capitalize text-primary max-sm:text-3xl">
      Create your challenge
    </h1>
    <CreateChallengeForm />
  </section>
)
