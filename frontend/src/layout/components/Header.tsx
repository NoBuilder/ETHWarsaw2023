import { Link } from '@/components'
import { InternalLink } from '@/config'
import { ConnectionLabel } from './ConnectionLabel'
import { WalletButton } from './WalletButton'

export const Header = () => (
  <header className="layout-container sticky top-0 z-[1] border-b border-b-white/10 bg-black/5 backdrop-blur-xl">
    <div className="layout-section flex-row justify-between py-5">
      <nav className="flex items-center gap-4">
        <Link
          className="z-[1001] text-4xl"
          href={InternalLink.home}
        >
          👋
        </Link>
      </nav>
      <div className="flex gap-2">
        <ConnectionLabel />
        <WalletButton />
      </div>
    </div>
  </header>
)
