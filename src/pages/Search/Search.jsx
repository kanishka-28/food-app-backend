import React from 'react'
import { useNavigate} from 'react-router-dom'
import AllCards from '../../components/Card/Card'
import Navbar from '../../components/Navbar/Navbar'

const Search = () => {

  const navigate= useNavigate();
  return (
    <>
        <Navbar/>
        <div className="w-full lg:container  mx-auto px-10 lg:px-20">
        <h1 className="font-semibold text-2xl mt-4" >Search Results :</h1>
            <AllCards search={true} />
        <button
              onClick={()=>{navigate(-1)}}
              className=" w-28 h-10 text-center m-1 rounded border-gray-400 border py-1 bg-zomato-400 hover:bg-zomato-500 text-white "
            >
             Go Back
            </button>
        </div>
    </>
  )
}

export default Search