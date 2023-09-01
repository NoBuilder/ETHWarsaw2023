import NextLink, { LinkProps as InternalLinkProps } from 'next/link'
import { WithClassName } from '@/types'
import { regexes } from '@/utils'

type LinkProps = {
  disabled?: boolean
} & InternalLinkProps &
  Pick<React.ComponentProps<'a'>, 'aria-label'>

export const Link: React.FC<
  React.PropsWithChildren<WithClassName<LinkProps>>
> = ({
  children,
  href,
  onMouseEnter,
  onClick,
  onTouchStart,
  className,
  disabled,
  ...props
}) => {
  if (disabled || !href) {
    return (
      <span
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        onTouchStart={onTouchStart}
        className={className}
        aria-disabled="true"
        {...props}
      >
        {children}
      </span>
    )
  }
  if (typeof href === 'string' && regexes.isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        onTouchStart={onTouchStart}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onTouchStart={onTouchStart}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  )
}
