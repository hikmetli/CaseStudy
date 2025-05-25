import { Outlet } from 'react-router'
import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from './Navbar'


function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme" >
      <Navbar />
      <div className='min-h-[calc(100vh-9rem)] py-12'>
        {/* <main className="container mx-auto px-4 py-8 max-w-7xl min-h-[calc(100vh-4rem)]"> */}
        <div className="container flex  p-6 justify-center items-center">
          <Outlet />
        </div>
        {/* </main> */}
      </div>
    </ThemeProvider>
  )
}

export default App
