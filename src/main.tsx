import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ThemeProvider } from './provider/theme-provider.tsx'
import router from './routes/Route.tsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Provider store={store}  >
    <RouterProvider router={router} />
  </Provider>
    </ThemeProvider>
  </StrictMode >,
)
