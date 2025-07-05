import '@/lib/polyfills'
import type { Metadata, Viewport } from 'next'
import { PropsWithChildren } from 'react'
import '@/lib/polyfills'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_INFO, SITE_NAME, SITE_URL, SOCIAL_TWITTER, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN } from '@/utils/site'
import { Layout } from '@/components/Layout'
import { AuthProvider } from '@/context/AuthContext'
import { Web3Provider } from '@/context/Web3Provider'
import { SIWEProvider } from '@/context/SIWEContext'
import { UnifiedAuthProvider } from '@/context/UnifiedAuthContext'
import { NotificationProvider } from '@/context/Notifications'
import { ClientOnly } from '@/components/ClientOnly'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import '../assets/globals.css'

export const metadata: Metadata = {
  applicationName: 'BeatsChain',
  title: {
    default: 'BeatsChain - Web3 Music Marketplace',
    template: 'BeatsChain - %s',
  },
  metadataBase: new URL('https://www.beatschain.app'),
  description: 'Premium marketplace for music producers and artists. Discover, purchase, and sell high-quality beats from talented South African producers.',
  keywords: ['beats', 'music', 'amapiano', 'afrobeats', 'producers', 'marketplace', 'south africa', 'hip hop', 'trap'],
  authors: [{ name: 'BeatsChain Team' }],
  creator: 'BeatsChain',
  publisher: 'BeatsChain',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'BeatsChain',
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    title: 'BeatsChain - Web3 Music Marketplace',
    siteName: 'BeatsChain',
    description: 'Decentralized marketplace for music producers and artists. Buy, sell, and trade beats using blockchain technology.',
    url: 'https://www.beatschain.app',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BeatsChain - Web3 Music Marketplace',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BeatsChain',
    creator: '@BeatsChain',
    title: 'BeatsChain - Web3 Music Marketplace',
    description: 'Decentralized marketplace for music producers and artists. Buy, sell, and trade beats using blockchain technology.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default async function RootLayout(props: PropsWithChildren) {
  let cookies = null
  
  try {
    const { headers } = await import('next/headers')
    const headersList = await headers()
    cookies = headersList.get('cookie')
  } catch (error) {
    console.warn('Could not get cookies:', error)
  }

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon.svg' />
        <link rel='icon' href='/favicon.ico' />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
          .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; transition: all 0.2s; border: none; cursor: pointer; }
          .btn-primary { background-color: #2563eb; color: white; }
          .btn-primary:hover { background-color: #1d4ed8; }
          .btn-secondary { background-color: #e5e7eb; color: #1f2937; }
          .btn-secondary:hover { background-color: #d1d5db; }
        `}</style>
      </head>

      <body>
        <ClientOnly>
          <Web3Provider cookies={cookies}>
            <AuthProvider>
              <SIWEProvider>
                <UnifiedAuthProvider>
                  <NotificationProvider>
                    <Layout>{props.children}</Layout>
                    <CookieConsentBanner />
                  </NotificationProvider>
                </UnifiedAuthProvider>
              </SIWEProvider>
            </AuthProvider>
          </Web3Provider>
        </ClientOnly>
        
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
