import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="">
    <section className="h-dvh bg-yellow-200">
      <Outlet />
    </section>
  </div>
  )
}

export default AuthLayout