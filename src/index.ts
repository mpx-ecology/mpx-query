export * from './polyfill'

export * from '@tanstack/query-core'

export { MpxQueryPlugin } from './mpxQueryPlugin'
export { useQueryClient } from './useQueryClient'

export { infiniteQueryOptions } from './infiniteQueryOptions'
export type {
  DefinedInitialDataInfiniteOptions,
  UndefinedInitialDataInfiniteOptions
} from './infiniteQueryOptions'
export { MutationCache } from './mutationCache'
export { QueryCache } from './queryCache'
export { QueryClient } from './queryClient'
export { queryOptions } from './queryOptions'
export { useInfiniteQuery } from './useInfiniteQuery'
export { useIsFetching } from './useIsFetching'
export { useMutation } from './useMutation'
export { useIsMutating, useMutationState } from './useMutationState'
export { useQueries } from './useQueries'
export { useQuery } from './useQuery'
export { VUE_QUERY_CLIENT } from './utils'

export type { MpxQueryPluginOptions } from './mpxQueryPlugin'
export type {
  UseInfiniteQueryOptions,
  UseInfiniteQueryReturnType
} from './useInfiniteQuery'
export type { QueryFilters } from './useIsFetching'
export type { UseMutationOptions, UseMutationReturnType } from './useMutation'
export type { MutationFilters, MutationStateOptions } from './useMutationState'
export type { UseQueriesOptions, UseQueriesResults } from './useQueries'
export type {
  UseQueryDefinedReturnType,
  UseQueryOptions,
  UseQueryReturnType
} from './useQuery'
