import type { ImageProps } from 'next/image'
import nextConfig from '../../next.config.mjs'
import { withHttpsProtocol } from './url'

export const shouldOptimizeImage = (imageSrc: ImageProps['src']) =>
  Boolean(
    typeof imageSrc === 'string' &&
      nextConfig?.images?.remotePatterns?.some(({ hostname }) =>
        imageSrc.startsWith(withHttpsProtocol(hostname))
      )
  )
