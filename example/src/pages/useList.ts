import { useMutation, useQuery } from '@mpxjs/mpx-query'
import { getList } from '../api/index'
import { Ref } from '@mpxjs/core'

export const useList = (page: Ref<number>) => {
  return useQuery({
    queryKey: ['getData', page] as const,
    queryFn: ({ queryKey }) => getList(queryKey[1] as unknown as number),
    networkMode: 'offlineFirst'
  })
}

export const useMutationList = () => {
  return useMutation({
    mutationFn: async () => {
      return true
    }
  })
}
