'use client'

import { useToggle } from '@/hooks'
import { cn } from '@/utils'
import { Hamburger } from './Hamburger'
import { NavLinks } from './NavLinks'

export const HeaderMenu = () => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <div className="flex flex-1 items-center justify-end gap-6">
      <div
        className={cn(
          'flex flex-1 items-center justify-end gap-10 max-lg:gap-6',
          'max-md:fixed max-md:inset-0 max-md:z-[1000] max-md:h-screen max-md:flex-col max-md:items-stretch max-md:justify-start max-md:overflow-hidden max-md:bg-background max-md:bg-gradient-to-r max-md:from-black/30 max-md:to-background max-md:p-4 max-md:pt-16 max-md:transition-all max-md:duration-300 max-md:ease-in-out',
          isOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'
        )}
      >
        <NavLinks onNavLinkClick={toggleIsOpen} />
      </div>
      <Hamburger
        isOpen={isOpen}
        onToggle={toggleIsOpen}
      />
    </div>
  )
}
