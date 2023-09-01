import { type Metadata } from 'next'
import { AppName } from './app'

export const Description =
  'Challenge accepted! A platform for people who want to challenge themselves and others to do better.'

export const DefaultSEOTags: Metadata = {
  description: Description,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    siteName: AppName
  },
  themeColor: '#1F2128'
}
