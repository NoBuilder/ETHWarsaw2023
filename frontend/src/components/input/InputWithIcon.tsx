import { cva } from 'class-variance-authority'
import { cn } from '@/utils'
import { InputRaw } from './InputRaw'
import type { InputWithIconProps } from './types'

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  className,
  iconSide = 'left',
  ...props
}) => (
  <div className={cn(inputWithIconVariants({ iconSide }), className)}>
    <InputRaw {...props} />
    {icon}
  </div>
)
export const inputWithIconVariants = cva(
  'rounded-md border border-input flex items-center px-3 py-2 gap-1 text-sm placeholder:text-muted-foreground focus-within:visible:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background ',
  {
    variants: {
      iconSide: {
        left: 'flex-row-reverse',
        right: 'flex-row'
      }
    }
  }
)
