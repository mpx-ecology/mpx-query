import mpx from '@mpxjs/core'

import { getClientKey } from './utils'
import type { QueryClient } from './queryClient'

export function useQueryClient(id = ''): QueryClient {
  const key = getClientKey(id)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const queryClient = mpx.getClientKey<QueryClient>(key)

  if (!queryClient) {
    throw new Error(
      "No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library."
    )
  }

  return queryClient
}
