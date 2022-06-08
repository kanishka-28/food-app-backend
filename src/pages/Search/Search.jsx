import React from 'react'
import AllCards from '../../components/Card/Card'
import Navbar from '../../components/Navbar/Navbar'

const Search = () => {
  return (
    <>
        <Navbar/>
        <div className="w-full lg:container  mx-auto px-20">
        <h1 className="font-semibold text-2xl" >Search Results :</h1>
            <AllCards search={true} />

        </div>
    </>
  )
}

export default Search