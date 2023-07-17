import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../useHooks/useAuth'
import Sidebar from '../components/Sidebar'


export default function AdminLayout() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <div className="admin-layout">
      <main>
        <Sidebar/>
        {auth?.user
          ? <Outlet />
          : <Navigate to="/loginadmin" state={{ from: location }} replace />}
      </main>
    </div>

  )
}
