import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { RouterProvider } from 'react-router'
import { router } from './app/routes/Router.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
