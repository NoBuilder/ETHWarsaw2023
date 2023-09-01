import * as React from 'react'
import { cn } from '@/utils'
import { InputRawProps } from './types'

const InputRaw = React.forwardRef<HTMLInputElement, InputRawProps>(
  (
    {
      className,
      type = 'text',
      autoComplete = 'off',
      formNoValidate = true,
      id,
      name,
      ...props
    },
    ref
  ) => (
    <input
      type={type}
      className={cn(
        'w-full bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      autoComplete={autoComplete}
      formNoValidate={formNoValidate}
      id={id}
      name={name || id}
      {...props}
    />
  )
)
InputRaw.displayName = 'Input'

export { InputRaw }
