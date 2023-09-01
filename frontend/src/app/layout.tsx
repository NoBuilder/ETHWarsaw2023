import clsx from 'clsx'
import { Providers } from '@/components'
import { Layout } from '@/layout'
import { MainFont, SecondaryFont } from '@/styles'
import '@/styles/globals.css'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <link
        rel="preload"
        as="image/svg+xml"
        href="sprite.svg"
      />
    </head>
    <body className={clsx(MainFont.variable, SecondaryFont.variable)}>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
)

export default RootLayout
