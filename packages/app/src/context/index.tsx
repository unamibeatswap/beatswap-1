'use client'

import { PropsWithChildren } from 'react'
import { Web3Provider } from './Web3'
import { Web3DataProvider } from './Web3DataContext'
import { SIWEProvider } from './SIWEContext'
import { NotificationProvider } from './Notifications'

interface Props extends PropsWithChildren {
  cookies: string | null
}

export function Providers(props: Props) {
  return (
    <>
      <Web3Provider cookies={props.cookies}>
        <SIWEProvider>
          <Web3DataProvider>
            <NotificationProvider>{props.children}</NotificationProvider>
          </Web3DataProvider>
        </SIWEProvider>
      </Web3Provider>
    </>
  )
}
