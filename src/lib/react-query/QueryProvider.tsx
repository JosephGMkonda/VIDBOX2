
import { ReactNode  } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { client } from '../appwrite/config'

const queryClient = new QueryClient();

export const QueryProvider = ({ children} : { children : ReactNode }) => {
  return (

    <QueryClientProvider client={queryClient}>
    
      {children}
    </QueryClientProvider>
  )
}

