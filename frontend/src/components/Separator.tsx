import { WithClassName } from '@/types'
import { cn } from '@/utils'

type Orientation = 'horizontal' | 'vertical'

type SeparatorProps = {
  decorative?: boolean
  orientation?: Orientation
}

export const Separator: React.FC<WithClassName<SeparatorProps>> = ({
  decorative = true,
  orientation = 'horizontal',
  className
}) => (
  <div
    className={cn(
      'bg-gray shrink-0',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...(decorative
      ? { role: 'none' }
      : { 'aria-orientation': orientation, role: 'separator' })}
  />
)
