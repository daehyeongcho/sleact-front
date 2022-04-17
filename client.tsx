import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './layouts/App'

const container = document.querySelector('#app')
const root = createRoot(container!)
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Suspense>,
)
