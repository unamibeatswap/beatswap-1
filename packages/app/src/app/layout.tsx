import type { Metadata, Viewport } from 'next'
import { PropsWithChildren } from 'react'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_INFO, SITE_NAME, SITE_URL, SOCIAL_TWITTER, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN } from '@/utils/site'
import { Layout } from '@/components/Layout'
import { AuthProvider } from '@/context/AuthContext'
import { Web3Provider } from '@/context/Web3Provider'
import { NotificationProvider } from '@/context/Notifications'
import '../assets/globals.css'

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} · ${SITE_INFO}`,
    template: `${SITE_NAME} · %s`,
  },
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    title: `${SITE_NAME} - ${SITE_INFO}`,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Blockchain Beat Marketplace`,
      },
    ],
    locale: 'en_US',
  },
  other: {
    'instagram:site': `@${SOCIAL_INSTAGRAM}`,
    'linkedin:site': SOCIAL_LINKEDIN,
    'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${SOCIAL_TWITTER}`,
    creator: `@${SOCIAL_TWITTER}`,
    title: `${SITE_NAME} - ${SITE_INFO}`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout(props: PropsWithChildren) {

  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${SITE_EMOJI}</text></svg>`}
        />
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
        <Web3Provider>
          <AuthProvider>
            <NotificationProvider>
              <Layout>{props.children}</Layout>
            </NotificationProvider>
          </AuthProvider>
        </Web3Provider>
        
        {/* Google Tag Manager - Will be controlled by admin settings */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // GTM will be initialized by admin settings
            `,
          }}
        />
      </body>
    </html>
  )
}
