import { focusManager } from '@tanstack/query-core'
import mpx from '@mpxjs/core'

import { QueryClient } from './queryClient'
import { getClientKey } from './utils'
import type { QueryClientConfig } from '@tanstack/query-core'

type ClientPersister = (client: QueryClient) => [() => void, Promise<void>]

interface CommonOptions {
  enableDevtoolsV6Plugin?: boolean
  queryClientKey?: string
  clientPersister?: ClientPersister
  clientPersisterOnSuccess?: (client: QueryClient) => void
}

interface ConfigOptions extends CommonOptions {
  queryClientConfig?: QueryClientConfig
}

interface ClientOptions extends CommonOptions {
  queryClient?: QueryClient
}

export type MpxQueryPluginOptions = ConfigOptions | ClientOptions

export const MpxQueryPlugin = {
  install: (app: any, options: MpxQueryPluginOptions = {}) => {
    focusManager.setEventListener((handleFocus) => {
      const onShow = () => {
        console.log(1111, 'show')
        handleFocus(true)
      }
      const onHide = () => {
        console.log(2222, 'hide')

        handleFocus(false)
      }
      mpx.onAppShow(onShow)
      mpx.onAppHide(onHide)
      return () => {
        // Be sure to unsubscribe if a new handler is set
        mpx.offAppShow(onShow)
        mpx.offAppHide(onHide)
      }
    })

    const clientkeyMap = new Map()
    const clientKey = getClientKey(options.queryClientKey)
    let client: QueryClient

    if ('queryClient' in options && options.queryClient) {
      client = options.queryClient
    } else {
      const clientConfig =
        'queryClientConfig' in options ? options.queryClientConfig : undefined
      client = new QueryClient(clientConfig)
    }

    client.mount()

    let persisterUnmount = () => {
      // noop
    }

    if (options.clientPersister) {
      client.isRestoring.value = true
      const [unmount, promise] = options.clientPersister(client)
      persisterUnmount = unmount
      promise.then(() => {
        client.isRestoring.value = false
        options.clientPersisterOnSuccess?.(client)
      })
    }

    const cleanup = () => {
      client.unmount()
      persisterUnmount()
    }

    if (app.onUnmount) {
      app.onUnmount(cleanup)
    } else {
      const originalUnmount = app.unmount
      app.unmount = function vueQueryUnmount() {
        cleanup()
        originalUnmount()
      }
    }

    clientkeyMap.set(clientKey, client)

    app.getClientKey = (clientKey: any) => {
      return clientkeyMap.get(clientKey)
    }
  }
}
