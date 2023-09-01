import { type Metadata } from 'next'
import { AppName, DefaultSEOTags } from '@/config'

export const getMetadata = ({ title, ...metadata }: Metadata): Metadata => {
  const metaTitle = title ? `${title} | ${AppName}` : AppName

  return {
    ...DefaultSEOTags,
    ...metadata,
    title: metaTitle
  }
}
