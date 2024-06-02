import './globals.css'

import { Providers } from './providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavigationBar } from '@/components/NavigationBar/navigation-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers enableSystem attribute='class' defaultTheme='dark' disableTransitionOnChange>

          <NavigationBar />

          {children}
        </Providers>
      </body>
    </html>
  )
}
