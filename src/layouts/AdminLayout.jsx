import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../useHooks/useAuth'


export default function AdminLayout() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <div className="admin-layout">
      <main>
        {auth?.user
          ? <Outlet />
          : <Navigate to="/loginadmin" state={{ from: location }} replace />}
      </main>
    </div>

  )
}
