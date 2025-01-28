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

        <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen === true ? 'w-[22%]' : 'w-[0px] opacity-0'} transition-all`}>

          <Sidebar role={user?.role} />

        </div>
        <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[78%]'} transition-all`}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>

        </div>
      </div>
    </section>
  )
}

export default MainLayout