import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
         <div className="container bg-red-500 mx-auto lg:px-20">
        
          {/* <Navbar /> */}
        
      </div>
     
      <div className="container mx-auto lg:px-20">
        <Outlet/>
      </div>
    </>
  )
}

export default Home