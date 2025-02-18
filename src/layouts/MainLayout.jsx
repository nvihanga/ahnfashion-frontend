import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/HeaderComponent/Header'
import Sidebar from '../components/SidebarComponent/Sidebar'
import { AppContext } from '../context/AppProvider'
import { AuthContext } from '../context/AuthProvider'
import ErrorBoundary from '../components/UI/ErrorBoundary'

const MainLayout = () => {
  const { isSidebarOpen } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  return (
    <section className='main'>
      <Header />
      <div className='mainContent flex'>

        <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen === true ? 'w-[200px] md:w-[240px] lg:w-[260px]' : 'w-0 opacity-0'} transition-all duration-300`}>

          <Sidebar role={user?.role} />

        </div>
        <div className="contentRight flex-1 min-w-0 pt-10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 w-full">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainLayout