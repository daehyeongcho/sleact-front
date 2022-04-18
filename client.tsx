import React, { Suspense } from 'react'

import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import App from './layouts/App'

const queryClient = new QueryClient() // react-query client
const container = document.querySelector('#app')
const root = createRoot(container!)
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    </Suspense>,
)
