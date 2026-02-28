import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'

const AdminLayout = () => {
  const [isSidebarOpen,setIsSidebarOpen]=useState(<i class="fas fa-less-than    "></i>)
  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
      {/* mobile toggle button */}
      <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
        <button
        onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
        <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
      </div>
      {/* overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className='fixed inset-0 z-50 bg-black/50 md:hidden'
        onClick={toggleSidebar}>
        </div>
      )}
      <div
      className={`bg-gray-900 min-h-screen w-64 text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0":"-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20 `}></div>
    </div>
  )
}

export default AdminLayout