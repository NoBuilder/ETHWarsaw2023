import { Button } from '@/components'

type JuryButtonsProps = {}

export const JuryButtons: React.FC<JuryButtonsProps> = ({}) => (
  <div className="flex w-full justify-center gap-4 pt-4">
    <Button>Accept</Button>
    <Button variant="outline">Reject</Button>
  </div>
)
