'use client'

import { Button, Link, StatusMessage, Icon } from '@/components'
import { InternalLink } from '@/config'

type ErrorProps = {
  reset: VoidFunction
  error: Error
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => (
  <div className="layout-section flex-1 items-center justify-center gap-6">
    <div className="bg-background-secondary flex w-full max-w-xl flex-col gap-6 border border-white/10 p-8 backdrop-blur-lg max-md:items-center max-md:border-none max-md:bg-transparent max-md:p-0 max-md:backdrop-blur-none">
      <div className="-mb-4 flex items-center justify-between gap-4 max-md:flex-col-reverse">
        <h2 className="font-main text-2xl max-md:text-xl">
          Opss... Something went wrong
        </h2>
        <Button
          asChild
          size="icon"
          className="bg-white/10 p-0 text-xl hover:bg-white/10"
        >
          <div>
            <Icon
              id="warning"
              className="h-4 w-[5px] fill-current"
            />
          </div>
        </Button>
      </div>
      <p className="text-sm">
        This was probably our fault.
        <br />
        Please try again in a few minutes.
      </p>
      <div className="flex flex-1 flex-wrap gap-6">
        <Button
          onClick={reset}
          variant="outline"
          className="flex-1 whitespace-nowrap max-md:min-w-[150px]"
        >
          Reset
        </Button>
        <Button
          asChild
          className="flex-1 whitespace-nowrap max-md:min-w-[150px]"
        >
          <Link href={InternalLink.home}>back to home</Link>
        </Button>
      </div>
    </div>
    <StatusMessage
      className="max-w-lg text-center"
      variant="error"
    >
      {error.message}
    </StatusMessage>
  </div>
)

export default Error
