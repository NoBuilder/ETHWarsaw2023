import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/utils'

export type ButtonProps = {
  asChild?: boolean
} & Pick<
  React.ComponentProps<'button'>,
  'children' | 'className' | 'onClick' | 'disabled' | 'type' | 'id'
> &
  VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = 'button',
      disabled,
      onClick,
      children,
      id
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        id={id}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export const buttonVariants = cva(
  'inline-flex items-center py-3 text-base leading-4 justify-center gap-1 uppercase font-main ring-offset-white/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-black hover:bg-primary-600 disabled:bg-primary-400',
        destructive:
          'bg-error text-white hover:bg-error-600 disabled:bg-error-400',
        outline:
          'border border-primary hover:border-primary-600 hover:text-primary-600 text-primary disabled:border-primary-400 disabled:text-primary-400',
        ghost: 'text-white hover:bg-gray/10 disabled:text-gray',
        link: 'text-primary underline-offset-4 hover:underline disabled:text-primary-400'
      },
      size: {
        default: 'px-6',
        sm: 'px-3',
        lg: 'px-8',
        icon: 'w-10 h-10 rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
