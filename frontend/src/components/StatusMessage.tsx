import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils'

type StatusMessageProps = Pick<
  React.ComponentProps<'p'>,
  'children' | 'className'
> &
  VariantProps<typeof statusMessageVariants>

export const StatusMessage: React.FC<StatusMessageProps> = ({
  className,
  children,
  variant = 'info'
}) => (
  <p className={cn(statusMessageVariants({ variant }), className)}>
    {children}
  </p>
)

const statusMessageVariants = cva('text-sm', {
  variants: {
    variant: {
      info: 'text-gray-500',
      success: 'text-green-500',
      error: 'text-red-500'
    }
  }
})
