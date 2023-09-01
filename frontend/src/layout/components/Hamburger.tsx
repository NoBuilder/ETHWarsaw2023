import { cx } from 'class-variance-authority'

type HamburgerProps = {
  isOpen: boolean
  onToggle: VoidFunction
}

export const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="relative z-[1001] hidden h-5 w-6 max-md:block"
  >
    <div
      className={cx(
        'absolute h-[2px] bg-white transition-all',
        isOpen ? 'left-1/2 top-[10px] w-0' : 'left-0 top-0 w-1/2'
      )}
    />
    <div
      className={cx(
        'absolute top-[10px] h-[2px] w-full bg-white transition-all',
        isOpen ? 'rotate-45 transform' : 'rotate-0 transform'
      )}
    />
    <div
      className={cx(
        'absolute top-[10px] h-[2px] w-full bg-white transition-all',
        isOpen ? '-rotate-45 transform' : 'rotate-0 transform'
      )}
    />
    <div
      className={cx(
        'absolute left-1/2 h-[2px] bg-white transition-all',
        isOpen ? 'top-[10px] w-0' : 'top-[20px] w-1/2'
      )}
    />
  </button>
)
