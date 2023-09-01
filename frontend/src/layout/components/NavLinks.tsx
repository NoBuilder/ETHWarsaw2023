import { InternalLink } from '@/config'
import { NavLink } from './NavLink'

type NavLinksProps = {
  onNavLinkClick: VoidFunction
}

const NAV_LINKS = [
  {
    href: InternalLink.home,
    text: 'Home'
  }
]

export const NavLinks: React.FC<NavLinksProps> = ({ onNavLinkClick }) => (
  <ul className="flex items-center gap-8 max-lg:gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
    {NAV_LINKS.map(({ href, text }) => (
      <NavLink
        key={text}
        href={href}
        text={text}
        onClick={onNavLinkClick}
      />
    ))}
  </ul>
)
