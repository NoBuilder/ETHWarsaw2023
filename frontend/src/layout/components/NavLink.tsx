import clsx from 'clsx'
import { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Link } from '@/components'

type NavLinkProps = {
  href: LinkProps['href']
  text: string
  onClick: VoidFunction
}

export const NavLink: React.FC<NavLinkProps> = ({ href, text, onClick }) => {
  const pathname = usePathname()
  const isDisabled = !Boolean(href)

  return (
    <li>
      <Link
        onClick={isDisabled ? undefined : onClick}
        href={href}
      >
        <p
          className={clsx(
            'relative font-secondary text-sm transition-colors duration-150 before:absolute before:inset-x-0 before:-bottom-[27px] before:h-[1px] before:scale-x-0 before:bg-primary max-md:border-b max-md:border-white/10 max-md:py-6 max-md:text-xl max-md:before:hidden',
            isDisabled && 'cursor-not-allowed',
            pathname === href
              ? 'font-bold before:scale-x-100'
              : 'text-gray font-normal before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:text-current hover:before:scale-x-100'
          )}
        >
          {text}
        </p>
      </Link>
    </li>
  )
}
