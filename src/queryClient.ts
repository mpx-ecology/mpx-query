import { ref } from '@mpxjs/core'
import { QueryClient as QC } from '@tanstack/query-core'
import { cloneDeepUnref } from './utils'
import { QueryCache } from './queryCache'
import { MutationCache } from './mutationCache'
import type { Ref } from '@mpxjs/core'
import type { MaybeRefDeep, NoUnknown } from './types'
import type {
  CancelOptions,
  DataTag,
  DefaultError,
  DefaultOptions,
  EnsureQueryDataOptions,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InfiniteData,
  InvalidateOptions,
  InvalidateQueryFilters,
  MutationFilters,
  MutationKey,
  MutationObserverOptions,
  NoInfer,
  OmitKeyof,
  QueryClientConfig,
  QueryFilters,
  QueryKey,
  QueryObserverOptions,
  QueryState,
  RefetchOptions,
  RefetchQueryFilters,
  ResetOptions,
  SetDataOptions,
  Updater
} from '@tanstack/query-core'

export class QueryClient extends QC {
  constructor(config: QueryClientConfig = {}) {
    const mpxQueryConfig = {
      defaultOptions: config.defaultOptions,
      queryCache: config.queryCache || new QueryCache(),
      mutationCache: config.mutationCache || new MutationCache()
    }
    super(mpxQueryConfig)
  }

  isRestoring: Ref<boolean> = ref(false)

  override isFetching(filters: MaybeRefDeep<QueryFilters> = {}): number {
    return super.isFetching(cloneDeepUnref(filters))
  }

  override isMutating(filters: MaybeRefDeep<MutationFilters> = {}): number {
    return super.isMutating(cloneDeepUnref(filters))
  }

  override getQueryData<TData = unknown, TTaggedQueryKey extends QueryKey = QueryKey>(
    queryKey: TTaggedQueryKey,
  ):
    | (TTaggedQueryKey extends DataTag<unknown, infer TaggedValue>
        ? TaggedValue
        : TData)
    | undefined
  override getQueryData<TData = unknown>(
    queryKey: MaybeRefDeep<QueryKey>,
  ): TData | undefined
  override getQueryData<TData = unknown>(
    queryKey: MaybeRefDeep<QueryKey>
  ): TData | undefined {
    return super.getQueryData(cloneDeepUnref(queryKey))
  }

  override ensureQueryData<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: EnsureQueryDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): Promise<TData>
  override ensureQueryData<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefDeep<
      EnsureQueryDataOptions<TQueryFnData, TError, TData, TQueryKey>
    >,
  ): Promise<TData>
  override ensureQueryData<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefDeep<
      EnsureQueryDataOptions<TQueryFnData, TError, TData, TQueryKey>
    >
  ): Promise<TData> {
    return super.ensureQueryData(cloneDeepUnref(options))
  }

  override getQueriesData<TData = unknown>(
    filters: MaybeRefDeep<QueryFilters>
  ): Array<[QueryKey, TData | undefined]> {
    return super.getQueriesData(cloneDeepUnref(filters))
  }

  override setQueryData<
    TQueryFnData,
    TTaggedQueryKey extends QueryKey,
    TData = TTaggedQueryKey extends DataTag<unknown, infer TaggedValue>
      ? TaggedValue
      : TQueryFnData,
  >(
    queryKey: TTaggedQueryKey,
    updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>,
    options?: MaybeRefDeep<SetDataOptions>,
  ): TData | undefined
  override setQueryData<TQueryFnData, TData = NoUnknown<TQueryFnData>>(
    queryKey: MaybeRefDeep<QueryKey>,
    updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>,
    options?: MaybeRefDeep<SetDataOptions>,
  ): TData | undefined
  override setQueryData<TData>(
    queryKey: MaybeRefDeep<QueryKey>,
    updater: Updater<TData | undefined, TData | undefined>,
    options: MaybeRefDeep<SetDataOptions> = {}
  ): TData | undefined {
    return super.setQueryData(
      cloneDeepUnref(queryKey),
      updater,
      cloneDeepUnref(options)
    )
  }

  override setQueriesData<TData>(
    filters: MaybeRefDeep<QueryFilters>,
    updater: Updater<TData | undefined, TData | undefined>,
    options: MaybeRefDeep<SetDataOptions> = {}
  ): Array<[QueryKey, TData | undefined]> {
    return super.setQueriesData(
      cloneDeepUnref(filters),
      updater,
      cloneDeepUnref(options)
    )
  }

  override getQueryState<TData = unknown, TError = DefaultError>(
    queryKey: MaybeRefDeep<QueryKey>
  ): QueryState<TData, TError> | undefined {
    return super.getQueryState(cloneDeepUnref(queryKey))
  }

  override removeQueries(filters: MaybeRefDeep<QueryFilters> = {}): void {
    return super.removeQueries(cloneDeepUnref(filters))
  }

  override resetQueries(
    filters: MaybeRefDeep<QueryFilters> = {},
    options: MaybeRefDeep<ResetOptions> = {}
  ): Promise<void> {
    return super.resetQueries(cloneDeepUnref(filters), cloneDeepUnref(options))
  }

  override cancelQueries(
    filters: MaybeRefDeep<QueryFilters> = {},
    options: MaybeRefDeep<CancelOptions> = {}
  ): Promise<void> {
    return super.cancelQueries(cloneDeepUnref(filters), cloneDeepUnref(options))
  }

  override invalidateQueries(
    filters: MaybeRefDeep<InvalidateQueryFilters> = {},
    options: MaybeRefDeep<InvalidateOptions> = {}
  ): Promise<void> {
    // (dosipiuk): We need to delay `invalidate` execution to next macro task for all reactive values to be updated.
    // This ensures that `context` in `queryFn` while `invalidating` along reactive variable change has correct value.
    return new Promise((resolve) => {
      setTimeout(async () => {
        await super.invalidateQueries(
          cloneDeepUnref(filters),
          cloneDeepUnref(options)
        )
        resolve()
      }, 0)
    })
  }

  override refetchQueries(
    filters: MaybeRefDeep<RefetchQueryFilters> = {},
    options: MaybeRefDeep<RefetchOptions> = {}
  ): Promise<void> {
    return super.refetchQueries(
      cloneDeepUnref(filters),
      cloneDeepUnref(options)
    )
  }

  override fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options: FetchQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
  ): Promise<TData>
  override fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options: MaybeRefDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
    >,
  ): Promise<TData>
  override fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options: MaybeRefDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
    >
  ): Promise<TData> {
    return super.fetchQuery(cloneDeepUnref(options))
  }

  override prefetchQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): Promise<void>
  override prefetchQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    >,
  ): Promise<void>
  override prefetchQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    >
  ): Promise<void> {
    return super.prefetchQuery(cloneDeepUnref(options))
  }

  override fetchInfiniteQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: FetchInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
  ): Promise<InfiniteData<TData, TPageParam>>
  override fetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >,
  ): Promise<InfiniteData<TData, TPageParam>>
  override fetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >
  ): Promise<InfiniteData<TData, TPageParam>> {
    return super.fetchInfiniteQuery(cloneDeepUnref(options))
  }

  override prefetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: FetchInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
  ): Promise<void>
  override prefetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >,
  ): Promise<void>
  override prefetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >
  ): Promise<void> {
    return super.prefetchInfiniteQuery(cloneDeepUnref(options))
  }

  override setDefaultOptions(options: MaybeRefDeep<DefaultOptions>): void {
    super.setDefaultOptions(cloneDeepUnref(options))
  }

  override setQueryDefaults(
    queryKey: MaybeRefDeep<QueryKey>,
    options: MaybeRefDeep<
      OmitKeyof<QueryObserverOptions<unknown, any, any, any>, 'queryKey'>
    >
  ): void {
    super.setQueryDefaults(cloneDeepUnref(queryKey), cloneDeepUnref(options))
  }

  override getQueryDefaults(
    queryKey: MaybeRefDeep<QueryKey>
  ): OmitKeyof<QueryObserverOptions<any, any, any, any, any>, 'queryKey'> {
    return super.getQueryDefaults(cloneDeepUnref(queryKey))
  }

  override setMutationDefaults(
    mutationKey: MaybeRefDeep<MutationKey>,
    options: MaybeRefDeep<MutationObserverOptions<any, any, any, any>>
  ): void {
    super.setMutationDefaults(
      cloneDeepUnref(mutationKey),
      cloneDeepUnref(options)
    )
  }

  override getMutationDefaults(
    mutationKey: MaybeRefDeep<MutationKey>
  ): MutationObserverOptions<any, any, any, any> {
    return super.getMutationDefaults(cloneDeepUnref(mutationKey))
  }
}
