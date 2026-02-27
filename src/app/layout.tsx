import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import type { Metadata } from 'next'

import '@/assets/scss/app.scss'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'

export const metadata: Metadata = {
  title: {
    template: '%s | Highdmin NextJs - Responsive Bootstrap 5 Admin Dashboard',
    default: DEFAULT_PAGE_TITLE,
  },
  description: 'A fully featured admin theme which can be used to build CRM, CMS, etc.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <AppProvidersWrapper>{children}</AppProvidersWrapper>
      </body>
    </html>
  )
}
