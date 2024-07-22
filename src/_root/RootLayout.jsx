import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function RootLayout() {
  return (
    <div className="h-full">
      <Nav />
      <section className="h-full">
        <Outlet className="h-full" />
      </section>
    </div>
  )
}

export default RootLayout