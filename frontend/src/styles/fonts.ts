import { Sintony, Poppins } from 'next/font/google'

export const MainFont = Sintony({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ['sans-serif'],
  display: 'swap',
  variable: '--font-main'
})

export const SecondaryFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '500'],
  fallback: ['sans-serif'],
  display: 'swap',
  variable: '--font-secondary'
})
