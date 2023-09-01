import { cn } from '@/utils'
import { Label } from '../Label'
import { StatusMessage } from '../StatusMessage'
import { InputWithIcon } from './InputWithIcon'
import type { InputWithIconProps } from './types'

type InputProps = {
  label?: React.ReactNode
  errorMessage?: React.ReactNode
} & InputWithIconProps

export const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  ...props
}) => (
  <div className="flex flex-col gap-1">
    {label && <Label htmlFor={props.id}>{label}</Label>}
    <InputWithIcon
      {...props}
      className={cn(
        Boolean(
          Array.isArray(errorMessage) ? errorMessage.length : errorMessage
        ) && 'border-error'
      )}
    />
    {Array.isArray(errorMessage)
      ? errorMessage.map((error, index) => (
          <StatusMessage
            key={index}
            variant="error"
          >
            {error}
          </StatusMessage>
        ))
      : errorMessage && (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        )}
  </div>
)
