'use client'

import { PropsWithChildren } from 'react'
import { Web3Provider } from './Web3'
import { DataProvider } from './Data'
import { NotificationProvider } from './Notifications'
import { MockAuthProvider as AuthProvider } from './MockAuthContext'

interface Props extends PropsWithChildren {
  cookies: string | null
}

export function Providers(props: Props) {
  return (
    <>
      <Web3Provider cookies={props.cookies}>
        <AuthProvider>
          <DataProvider>
            <NotificationProvider>{props.children}</NotificationProvider>
          </DataProvider>
        </AuthProvider>
      </Web3Provider>
    </>
  )
}
