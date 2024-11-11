import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { CookiesProvider } from 'react-cookie'

import { routes } from './routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <RouterProvider router={routes} />
    </CookiesProvider>
  </StrictMode>,
)
