import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import type { Metadata } from 'next'
import Script from 'next/script'

// Suppress missing type declarations for side-effect SCSS import
// @ts-ignore: Cannot find module or type declarations for SCSS
import '@/assets/scss/app.scss'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'

export const metadata: Metadata = {
  title: {
    template: '%s | US Degrees',
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
      <body>
        {/* Iconify Script */}
        <Script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          strategy="beforeInteractive"
        />

        <AppProvidersWrapper>
          {children}
        </AppProvidersWrapper>
      </body>
    </html>
  )
}