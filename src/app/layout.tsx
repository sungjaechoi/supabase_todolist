import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { UserProvider } from './_component/_contexts/userContext'
import { CategoryProvider } from './_component/_contexts/categoryCntext'
import QueryProviders from './_component/_queryProviders/QueryProviders'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <CategoryProvider>
          <QueryProviders>
            <body className={pretendard.className}>{children}</body>
          </QueryProviders>
        </CategoryProvider>
      </UserProvider>
    </html>
  )
}
