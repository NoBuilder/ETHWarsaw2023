import { useAccount, useMutation } from 'wagmi'
import { Button, LoaderCircle } from '@/components'
import { QueryKey } from '@/lib/reactQuery'
import { signTransaction } from '../actions/requests'

type JuryButtonsProps = {
  safeAddress: string
  // judgeAddress:string
}

export const JuryButtons: React.FC<JuryButtonsProps> = ({ safeAddress }) => {
  const txHash =
    '0x404b9716fbc6cae65d1d9d15805c20b6f6941a1973164d1fc7055320c0203ae1'
  const { mutate, isLoading, isSuccess } = useMutation(
    [QueryKey.signTransaction],
    () => signTransaction({ safeAddress, transactionHash: txHash })
  )
  return (
    <div className="flex w-full justify-center gap-4 pt-4">
      {isSuccess ? (
        <span className="text-green-500">Approved! :)</span>
      ) : (
        <>
          {isLoading ? (
            <LoaderCircle />
          ) : (
            <>
              <Button onClick={() => mutate()}>Accept</Button>
              <Button variant="outline">Reject</Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
