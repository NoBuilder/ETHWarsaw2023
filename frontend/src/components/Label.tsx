import { cn } from '@/utils'

type LabelProps = Pick<
  React.ComponentProps<'label'>,
  'htmlFor' | 'className' | 'children'
>

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => (
  <label
    className={cn('text-sm', className)}
    {...props}
  >
    {children}
  </label>
)
