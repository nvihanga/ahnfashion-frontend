import { useState,createContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import Dashboard from './pages/dashboard/index'

const MyContext = createContext();
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = createBrowserRouter([
    {
      path: '/',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='flex mainContent'>
              <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen === true ? 'w-[22%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[78%]'} transition-all`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),

    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  )
}

export default App
export {MyContext};