import React from 'react'
import NextImage, { type ImageProps } from 'next/image'
import { shouldOptimizeImage } from '@/utils'

export const Image: React.FC<ImageProps> = props => (
  <NextImage
    {...props}
    unoptimized={!shouldOptimizeImage(props.src)}
  />
)
