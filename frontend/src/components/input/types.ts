import { VariantProps } from 'class-variance-authority'
import { inputWithIconVariants } from './InputWithIcon'

export type InputRawProps = Pick<
  React.ComponentProps<'input'>,
  | 'className'
  | 'type'
  | 'placeholder'
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'required'
  | 'autoComplete'
  | 'formNoValidate'
  | 'id'
  | 'name'
  | 'onBlur'
>

export type InputWithIconProps = {
  icon?: React.ReactNode
} & InputRawProps &
  VariantProps<typeof inputWithIconVariants>
