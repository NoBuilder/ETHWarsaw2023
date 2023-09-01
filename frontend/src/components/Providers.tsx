'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/reactQuery'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
