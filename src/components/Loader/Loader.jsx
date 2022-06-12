import React from 'react'
import img from "../../assets/loader/Loader.svg";
const Loader = () => {
  return (
    <div className='w-3/4 h-fit' >
        <img src={img} className="w-full h-screen" alt="loading" />
    </div>
  )
}

export default Loader