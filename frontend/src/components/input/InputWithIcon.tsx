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
  'border border-white/50 flex items-center px-3 py-2 gap-1 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-white focus-within:ring-offset-0',
  {
    variants: {
      iconSide: {
        left: 'flex-row-reverse',
        right: 'flex-row'
      }
    }
  }
)
