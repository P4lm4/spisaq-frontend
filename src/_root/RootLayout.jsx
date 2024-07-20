import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function RootLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-yellow-200">
      <Nav />
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout