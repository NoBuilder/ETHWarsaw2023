import { IconId } from '@/types'
import { getIconHref } from '@/utils'

type IconProps = {
  id: IconId
} & React.ComponentProps<'svg'>

export const Icon: React.FC<IconProps> = ({ id, ...props }) => (
  <svg {...props}>
    <use href={getIconHref(id)} />
  </svg>
)
