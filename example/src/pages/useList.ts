import { useQuery } from '@mpxjs/mpx-query'
import { getList } from '../api/index'
import { Ref } from '@mpxjs/core'

export const useList = (id: Ref<number>) => {
  return useQuery({
    queryKey: ['getData', id] as const,
    queryFn: ({ queryKey }) => getList(queryKey[1] as unknown as number),
    networkMode: 'offlineFirst'
  })
}
