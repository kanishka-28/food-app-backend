import React, { useContext } from 'react'
// import { SignupContext } from '../../../context/signup';

export const Photo = ({details}) => {
  console.log(details);
  const Images = details.photos;
    return (
        <div className="bg-white rounded-md flex flex-wrap justify-evenly pb-6 w-full">
            {
              Images?.map((image) => (
                <div className='w-1/3 md:w-1/5 m-1 md:m-4 rounded-md shadow-md border border-gray-300'>
                  <img
                    src={image}
                    alt="Burger"
                    className="w-full h-full rounded-md"
                  />
                </div>
              ))
            }
        </div>
      )
}


const Photos = () => {
  
  // const {restaurant, setrestaurant} = useContext(SignupContext);
  const param= localStorage.getItem("id");
  // const requiredRestaurant= restaurant.filter((res)=>(res._id===param))[0];
  // console.log(requiredRestaurant);
    return (
        <div className="lg:px-32 hidden md:block">
            <Photo details={'requiredRestaurant'}/>
        </div>
    )
}

export default Photos