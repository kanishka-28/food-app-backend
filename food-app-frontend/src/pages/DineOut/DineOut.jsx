import React from 'react'
import AllCards from '../../components/Card/Card';
import DineInCarousel from '../../components/Carousel/DineInCarousel'


const DiningOut = () => {
    return (
        <>
           <DineInCarousel/>
           <h1 className="text-2xl font-semibold m-2" >Dine-Out Restaurants</h1>
            <AllCards/>
        </>
    )
}

export default DiningOut;
