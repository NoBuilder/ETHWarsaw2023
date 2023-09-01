import { QueryClient } from '@tanstack/react-query'
import { REACT_QUERY_CACHE_TIME, REACT_QUERY_STALE_TIME } from '@/config'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_STALE_TIME,
      cacheTime: REACT_QUERY_CACHE_TIME,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

export const QueryKey = {
  test: 'test'
}
