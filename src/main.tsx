import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from "react-hot-toast"

const queryClientProvider = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientProvider}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
    </QueryClientProvider>
    
  </StrictMode>,
)
