import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'

const BookingInfo = () => {
  return (
    <div className=''>
      <Topbar/>
      <Outlet/>
    </div>
  )
}

export default BookingInfo