import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import './index.css'
import router from './routes/router'
import { ThemeProvider } from './theme/ThemeProvider'

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 60 * 2,          // Fresh for 2 min
  //     gcTime: 1000 * 60 * 10,            // Cache kept for 10 min
  //     retry: 2,                          // Retry twice if fails
  //     retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10000),
  //     refetchOnMount: true,              // Only refetch if stale
  //     refetchOnWindowFocus: false,       // Don't spam refetch on tab switch
  //     refetchOnReconnect: true,          // Refetch after reconnect
  //     refetchInterval: false,            // No auto-polling
  //     structuralSharing: true,           // Smart reference reuse
  //     enabled: true,  						       // default
  //     suspense: false					           // default [Leave false unless you use Suspense.]
  //   },
  // },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <ToastContainer
          autoClose={2500}
          theme="light"
          closeOnClick
          pauseOnFocusLoss
          draggable
          position="top-right"
          newestOnTop={true}
          rtl={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
