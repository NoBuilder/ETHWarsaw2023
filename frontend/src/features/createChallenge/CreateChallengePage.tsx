import { JuryMember } from '@/models'
import { CreateChallengeForm } from './components'

type CreateChallengePageProps = {
  jury: Array<JuryMember>
}

export const CreateChallengePage: React.FC<CreateChallengePageProps> = ({
  jury
}) => (
  <section className="layout-section items-center gap-6">
    <h1 className="font-main text-4xl font-extrabold capitalize text-primary max-sm:text-3xl">
      Create your challenge
    </h1>
    <CreateChallengeForm jury={jury} />
  </section>
)
