import React, { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import Navigation from './Navigation'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Navigation />

      <main className='grow px-4 container max-w-full mx-auto'>{props.children}</main>

      <Footer />
    </div>
  )
}
