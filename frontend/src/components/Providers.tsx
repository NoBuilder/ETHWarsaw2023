'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig } from 'wagmi'
import { queryClient } from '@/lib/reactQuery'
import { wagmiConfig } from '@/lib/wagmi'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
  </QueryClientProvider>
)
