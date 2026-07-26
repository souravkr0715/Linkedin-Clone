import Navbar from '@/Components/Navbar'
import React from 'react'

export default function UserLayout({children}) {
  return (
    <div>
        <Navbar></Navbar>
     
    {children}</div>
  )
}
