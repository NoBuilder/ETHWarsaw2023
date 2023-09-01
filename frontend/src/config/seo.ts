import { type Metadata } from 'next'
import { AppName } from './app'

export const FaviconURL =
  'https://cdn.gameswift.io/gameswift/shared/images/favicon.png'
export const OGImageUrl =
  'https://cdn.gameswift.io/gameswift/shared/images/og-gameswift.png'
export const GameSwiftTwitterHandle = 'GameSwift_io'

export const Description =
  'A starter for Next.js using app router with TypeScript and Tailwind CSS.'

export const DefaultSEOTags: Metadata = {
  description: Description,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    siteName: AppName,
    images: [
      {
        url: OGImageUrl,
        width: 1200,
        height: 630,
        alt: AppName,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: GameSwiftTwitterHandle
  },
  themeColor: '#1F2128',
  icons: FaviconURL
}
