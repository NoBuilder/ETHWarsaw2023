import { Button, Icon, Link } from '@/components'
import { InternalLink } from '@/config'
import { getMetadata } from '@/utils'

export const metadata = getMetadata({
  title: 'Not Found'
})

const Custom404Page = () => (
  <div className="layout-section flex-1 items-center justify-center gap-6">
    <div className="bg-background-secondary flex w-full max-w-xl flex-col gap-6 border border-white/10 p-8 backdrop-blur-lg max-md:items-center max-md:border-none max-md:bg-transparent max-md:p-0 max-md:backdrop-blur-none">
      <div className="-mb-4 flex items-center justify-between gap-4 max-md:flex-col-reverse">
        <h2 className="font-main text-2xl max-md:text-xl">
          Page not found | 404
        </h2>
        <Button
          asChild
          size="icon"
          className="bg-white/10 p-0 text-xl text-white hover:bg-white/10"
        >
          <div>
            <Icon
              id="warning"
              className="h-4 w-[5px] fill-current"
            />
          </div>
        </Button>
      </div>
      <p className="text-sm text-white/75">
        Sorry, the page you are looking for doesn&apos;t exist.
        <br />
        Click below to go to homepage.
      </p>
      <Button asChild>
        <Link href={InternalLink.home}>back to home</Link>
      </Button>
    </div>
  </div>
)

export default Custom404Page
